import React from 'react';
import {useState, useContext, useEffect} from 'react';
import { db, app } from '../../../config/firebaseConfig';
import {collection, getDocs, query, where, setDoc, updateDoc, serverTimestamp, getDoc, doc, getFirestore} from 'firebase/firestore';
import Image from "next/image";
import {useAuth} from "../../Context/userAuthContext";

const Search = () => {
    const [usernameSearch, setUsernameSearch] = useState('');
    const [userSearch, setUserSearch] = useState(null);
    const [error, setError] = useState(false);

    const [filteredData, setFilteredData] = useState([]);

    const {user} = useAuth();

    const [usernames, setUsernames] = useState([]);

    useEffect(() => {
        // Define an async function to retrieve the usernames
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
    }, []);

    const handleFilter = (e) => {
        const searchWord = e.target.value
        const newFilter = usernames.filter((value) => {
            return value.toLowerCase().includes(searchWord.toLowerCase());
        });
        setUsernameSearch(e.target.value);
        setFilteredData(newFilter);
        if(e.target.value.length === 0) {
            setFilteredData([]);
        }

    }

    const handleSearch = async () => {
        const q = query(collection(db, "users"), where('username', '==', usernameSearch));

        console.log("usersearch:", userSearch)
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                console.log("docsQ:", querySnapshot);
                setUserSearch(doc.data()) ;
                setUserSearch(prevState => {
                    return {
                        ...prevState,
                        uid: doc.id
                    };
                });

            });
        }catch(error) {
            setError(true);
        }
    };
    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
    }

    const handleSelect = async () => {
        const combinedId = user.uid > userSearch.uid ? user.uid + userSearch.uid : userSearch.uid + user.uid;
        console.log(combinedId);
        console.log(userSearch);
        try {
            const res = await getDoc(doc(db, "chats", combinedId));

            if(!res.exists()){

                await setDoc(doc(db,"chats", combinedId), {messages: [] });

                await updateDoc(doc(db, "userChats", user.uid), {
                   [combinedId+".userInfo"]: {
                       uid: userSearch.uid,
                       username: userSearch.username,
                       //photoURL: userSearch.photoURL
                   },
                    [combinedId+".date"]: serverTimestamp()
                });

                await updateDoc(doc(db, "userChats", userSearch.uid), {
                   [combinedId+".userInfo"]: {
                       uid:user.uid,
                       username: user.username,
                       //photoURL: user.photoURL
                   },
                    [combinedId+".date"]: serverTimestamp()
                });

                }
            }
        catch(error) {}
        setUserSearch(null);
        setUsernameSearch('');
        setFilteredData([]);
    };

    return (
        <div className='search'>
            <div className='searchForm'>
                <input type='text' placeholder='Search for a user' onKeyDown={handleKey} onChange={handleFilter} value={usernameSearch}/>
            </div>
            {filteredData.length > 0 && (
            <div className='dataResult'>
                {filteredData.slice(0,15).map((username) => (
                    <div className='dataItem' key={username}>{username}</div>
                ))}
            </div>
            )};

            {error && <span>User Not Found</span>}
            {userSearch && <div className='userChat' onClick={handleSelect}>
                <div className='imageSize'>
                    <Image src="/images/profile.png" alt="profile" layout='fill'/>
                </div>
                <div className='userChatInfo'>
                    <span>{userSearch.username}</span>
                </div>
            </div>}
        </div>
    )
}

export default Search;