import React from 'react';
import Image from 'next/image';
import {useState, useEffect} from 'react';
import {doc, onSnapshot} from 'firebase/firestore';
import {db} from '../../../config/firebaseConfig';
import {useAuth} from "../../Context/userAuthContext";
const ChatList = () => {

    const [chats, setChats] = useState([])

    const {user} = useAuth();

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", user.uid), (doc) => {
                setChats(doc.data())
            });

            return () => {
                unsub();
            }
        }
        user.uid && getChats();
    },[user.uid]);


    return (
        <div className='chatList'>
            <div className='userChat'>
                <div className='imageSize'>
                    <Image src="/images/profile.png" alt="profile" layout='fill'/>
                </div>
                <div className='userChatInfo'>
                    <span>Fogen</span>
                    <p>Nej, du kommer inte få någon semester</p>
                </div>
            </div>
        </div>
    )
}

export default ChatList;