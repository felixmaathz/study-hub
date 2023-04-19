import React from 'react';
import Image from 'next/image';
import {useState, useEffect, useContext} from 'react';
import {doc, onSnapshot} from 'firebase/firestore';
import {db} from '../../../config/firebaseConfig';
import {useAuth} from "../../Context/userAuthContext";
import {useChatContext} from "../../Context/chatContext";
import {useRouter} from "next/router";
import Loading from 'components/Loading.js';

const ChatList = () => {

    const [chats, setChats] = useState([])
    const [loading, setLoading] = useState(true);

    const {user} = useAuth();
    const {dispatch} = useChatContext();

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", user.uid), (doc) => {
                setChats(doc.data());
                setLoading(false);
            });

            return () => {
                unsub();
            }
        }
        user.uid && getChats();
    },[user.uid]);

    const handleSelect = (u) => {
        dispatch({type:"CHANGE_USER", payload:u});
    }

    if (loading) {
        return <Loading/>
    }

    return (
        <div className='chatList'>
            {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
            <div className='userChat' key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
                <div className='imageSize'>
                    <Image src="/images/profile.png" alt="profile" layout='fill'/>
                </div>
                <div className='userChatInfo'>
                    <span>{chat[1].username}</span>
                    <p>{chat[1].lastMessage?.text}</p>
                </div>
            </div>
            ))}
        </div>
    )
}

export default ChatList;