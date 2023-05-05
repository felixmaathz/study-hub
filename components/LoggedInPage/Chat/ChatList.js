import React from 'react';
import Image from 'next/image';
import {useState, useEffect, useContext} from 'react';
import {doc, onSnapshot, collection, query, where, getDocs} from 'firebase/firestore';
import {db} from '../../../config/firebaseConfig';
import {useAuth} from "../../Context/userAuthContext";
import {useChatContext} from "../../Context/chatContext";
import {useRouter} from "next/router";
import Loading from 'components/Loading.js';


const ChatList = () => {

    const [chats, setChats] = useState([])
    const [loading, setLoading] = useState(true);
    const [displayPictures, setDisplayPictures] = useState({});

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

    useEffect(() => {

        const fetchDisplayPicture = async (url, chatId) => {
            const res = await getDisplayPicture(url);
            setDisplayPictures(prevState => ({...prevState, [chatId]: res}));
        }

        if (chats) {
            Object.entries(chats).forEach(([chatId, chat]) => {
                if (chat.userInfo && chat.userInfo.profilePictureURL) {
                    fetchDisplayPicture(chat.userInfo.profilePictureURL, chatId);
                }
            })
        }
    }, [chats]);

    const chatClass = document.getElementsByClassName('chat')[0];
    console.log(chatClass)
    const sidebar = document.getElementsByClassName('sidebar')[0];

    const handleSelect = (u, sidebar, chatClass) => {
        dispatch({type:"CHANGE_USER", payload:u});


        if (window.matchMedia("(min-width: 800px)").matches){
            chatClass.style.display = "block";
        }
        if (window.matchMedia("(max-width: 800px)").matches) {
            chatClass.style.display = "block";
            sidebar.style.display = "none"; // optional chaining used here
        }

    }

    console.log("chats: ", chats);

    if (loading) {
        return <Loading/>
    }



    return (
            <div className='containerUserChat'>
                {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
                <div className='userChat'
                     key={chat[0]}
                     onClick={() => handleSelect(chat[1].userInfo, sidebar, chatClass)}>

                    <div className='imageSize'>
                        {<Image className='imageSizeChatList'
                                src={displayPictures[chat[0]] || "/images/profile.png"}
                                alt="profile"
                                layout='fill' />}
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