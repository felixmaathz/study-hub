import React from 'react';
import {useState, useContext} from 'react';
import { db } from '../../../config/firebaseConfig';
import {collection, getDocs, query, where, setDoc, updateDoc, serverTimestamp, getDoc, doc, getFirestore} from 'firebase/firestore';
import Image from "next/image";
import {useAuth} from "../../Context/userAuthContext";
const Search = () => {
    const [usernameSearch, setUsernameSearch] = useState('');
    const [userSearch, setUserSearch] = useState(null);
    const [error, setError] = useState(false);

    const {user} = useAuth();

    const handleSearch = async () => {
        const q = query(collection(db, "users"), where('username', '==', usernameSearch));

        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUserSearch(doc.data()) ;
                setUserSearch(prevState => {
                    return {
                        ...prevState,
                        uid: doc.id
                    };
                });
                console.log(userSearch)
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
    };

    return (
        <div className='search'>
            <div className='searchForm'>
                <input type='text' placeholder='Search for a user' onKeyDown={handleKey} onChange={e=>setUsernameSearch(e.target.value)} value={usernameSearch} />
            </div>

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