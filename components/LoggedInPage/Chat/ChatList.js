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
    const [displayPicture, setDisplayPicture] = useState(null);

    const {user, getDisplayPicture} = useAuth();
    const {dispatch,data} = useChatContext();


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

        if (window.matchMedia("(max-width: 800px)").matches) {
            const chat = document.getElementsByClassName('chat')[0];
            chat.style.display = "block";
            const sidebar = document.getElementsByClassName('sidebar')[0];
            sidebar.style.display = "none"; // optional chaining used here
        }
    }

    if (loading) {
        return <Loading/>
    }

    return (
            <div className='containerUserChat'>
                {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
                <div className='userChat'
                     key={chat[0]}
                     onClick={() => handleSelect(chat[1].userInfo)}>

                    <div className='imageSize'>
                        {chat[1].userInfo.profilePictureURL ? chat[1].userInfo.profilePictureURL : <Image src={"/images/profile.png"} alt="profile" layout='fill'/>}

                    </div>

                        <div className='userChatInfo'>
                            <span>
                                {chat[1].userInfo.username}
                            </span>
                            <p>
                                {chat[1].lastMessage?.text}
                            </p>
                        </div>
                </div>
                ))}
            </div>

    )
}

export default ChatList;