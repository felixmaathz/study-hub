import React from 'react';
import {useState, useContext, useEffect} from 'react';
import { db, app } from '../../../config/firebaseConfig';
import {collection, getDocs, query, where, setDoc, updateDoc, serverTimestamp, getDoc, doc, getFirestore} from 'firebase/firestore';
import Image from "next/image";
import {useAuth} from "../../Context/userAuthContext";
import {handleInternalServerErrorResponse} from "next/dist/server/future/helpers/response-handlers";
import {useChatContext} from "../../Context/chatContext";
import {router} from "next/client";

// This component has been inspired by https://github.com/machadop1407/React-Search-Bar

const Search = () => {


    const [usernameSearch, setUsernameSearch] = useState('');
    const [userSearch, setUserSearch] = useState(null);
    const [error, setError] = useState(false);

    const [filteredData, setFilteredData] = useState([]);

    const {user} = useAuth();
    const {dispatch,data} = useChatContext();

    const [usernames, setUsernames] = useState([]);

    let userChatElement = document.querySelector('.containerUserChat');
    useEffect(() => {

        // console.log("USER SEARCH: ", userSearch);
        if (userSearch !== null) {
            handleSelect(userSearch);
            dispatch({type:"CHANGE_USER", payload:userSearch}); // Makes the person you are clicking on appear at the top of chatlist.
        }
        const getUsernames = async () => {
            // Get a reference to the "users" collection
            const usersCol = collection(db, "users");

            // Get all documents from the "users" collection
            const querySnapshot = await getDocs(usersCol);

            // Define an array to store the usernames
            const usernames = [];

            // Iterate over each document and get the username
            querySnapshot.forEach((doc) => {
                usernames.push(doc.data().username);
            });

            // Set the state variable to the array of usernames
            setUsernames(usernames);
        };

        // Call the getUsernames function to retrieve the usernames
        getUsernames();
    }, [userSearch]);

    useEffect(() => {
        const {otherUserID, otherUsername} = router.query;
        console.log(`userID skickat från otherprofilepopup: ${otherUserID}, username: ${otherUsername}`);
        handleSearch(otherUsername);

        // FRÅN MESSAGEKNAPPEN I OTHERPROFILEPOPUP
    }, []);

    const handleFilter = (e) => {

        if (e.target.value.length >= 0) {
        userChatElement.style.display = 'none';}

        const searchWord = e.target.value;
        const newFilter = usernames.filter((value) => {
            return value?.toLowerCase().includes(searchWord.toLowerCase());
        });
        setUsernameSearch(e.target.value);
        setFilteredData(newFilter);

        if (e.target.value.length === 0) {
            setFilteredData([]);
            userChatElement.style.display = 'flex'
        }
    };

    const handleSearch = async (clickedName) => {
        try {
            const q = query(collection(db, "users"), where('username', '==', clickedName));
            // console.log("Query:", q);
            const querySnapshot = await getDocs(q);
            // console.log("Query Snapshot:", querySnapshot);
            querySnapshot.forEach((doc) => {
                // console.log("Document:", doc.data());
                setUserSearch({
                    ...doc.data(),
                    uid: doc.id
                });
                // console.log("User Search:", userSearch);
            });
        } catch (error) {
            // console.error("Error:", error);
            setError(true);
        }
    };

    const handleKey = (e) => {
        // e.code === "Enter" && handleSearch();
    }

    const handleTest = async (username) => {
        await setFilteredData([username]);
        await setUsernameSearch(username);
        await handleSearch(username);

        // await console.log("username:", username)


    }




    const handleSelect = async () => {
        const combinedId = user.uid > userSearch.uid ? user.uid + userSearch.uid : userSearch.uid + user.uid;
        // console.log(combinedId);
        // console.log(userSearch);
        // console.log("usernameSearch:", usernameSearch);
        try {
            const res = await getDoc(doc(db, "chats", combinedId));
            // console.log("userSearchPIC!!!!:", userSearch.profilePictureURL);

            if(!res.exists()) {

                await setDoc(doc(db, "chats", combinedId), {messages: []});
            }

                await updateDoc(doc(db, "userChats", user.uid), {
                   [combinedId+".userInfo"]: {
                       uid: userSearch.uid,
                       username: userSearch.username,
                       profilePictureURL: userSearch.profilePictureURL
                   },
                    [combinedId+".date"]: serverTimestamp()
                });


                await updateDoc(doc(db, "userChats", userSearch.uid), {
                   [combinedId+".userInfo"]: {
                       uid:user.uid,
                       username: user.username,
                       profilePictureURL: user.profilePictureURL
                   },
                    [combinedId+".date"]: serverTimestamp()
                });

            }
        catch(error) {}
        // console.log("PLSPLSPLS", userSearch.profilePictureURL);
        setUserSearch(null);
        setUsernameSearch('');
        setFilteredData([]);
    };

    return (
        <div className='search'>
            <div className='searchForm'>
                <input type='text'
                       placeholder='Search for a user'
                       onKeyDown={handleKey}
                       onChange={handleFilter}
                       value={usernameSearch}/>
            </div>
            {filteredData.length > 0 && (
            <div className='resultList'>
                {filteredData.slice(0,10).map((username) => (
                    <div className='individualResult' onClick={() => handleTest(username)} >
                        {username}
                    </div>

                ))}
            </div>
            )}
        </div>
    )
}

export default Search;