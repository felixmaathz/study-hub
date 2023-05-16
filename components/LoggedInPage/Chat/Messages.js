import React from 'react';
import SingleMessage from './SingleMessage';
import {useChatContext} from "../../Context/chatContext";
import {useState, useEffect, useContext} from "react";
import {doc, onSnapshot} from 'firebase/firestore';
import {db} from "../../../config/firebaseConfig";
import {useAuth} from "../../Context/userAuthContext";
const Messages = () => {

    const[messages, setMessages] = useState([]);
    const [profilePicture, setProfilePicture] = useState('');
    const [sendersPicture, setSendersPicture] = useState('');
    const { data } = useChatContext();
    const { user, getDisplayPicture} = useAuth();

    useEffect(() => {
        const getMessages = () => {
            const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
                setMessages(doc.data()?.messages);
            });

            return () => {
                unsub();
            }
        }

        const getProfilePicture = async () => {
            const profilePictureUrl = await getDisplayPicture(user.profilePictureURL);
            setProfilePicture(profilePictureUrl);

            const sendersPictureUrl = await getDisplayPicture(`profilePictures/${data.user.uid}`);
            setSendersPicture(sendersPictureUrl);
        }

        user && getProfilePicture();
        data.chatId && getMessages();
    } , [data.chatId, user, getDisplayPicture]);

    console.log(messages)



    return (
        <div className='messages'>
            {messages?.map(m=>(
                <SingleMessage message={m} key={m.id} profilePicture={profilePicture} sendersPicture={sendersPicture}/>
            ))}

        </div>
    );
};

export default Messages;