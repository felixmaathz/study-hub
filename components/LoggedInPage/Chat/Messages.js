import React from 'react';
import SingleMessage from './SingleMessage';
import {useChatContext} from "../../Context/chatContext";
import {useState, useEffect, useContext} from "react";
import {doc, onSnapshot} from 'firebase/firestore';
import {db} from "../../../config/firebaseConfig";
const Messages = () => {

    const[messages, setMessages] = useState([]);
    const { data } = useChatContext();

    useEffect(() => {
        const getMessages = () => {
            const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
                setMessages(doc.data()?.messages);
            });

            return () => {
                unsub();
            }
        }
        data.chatId && getMessages();
    } , [data.chatId]);

    console.log(messages)
    return (
        <div className='messages'>
            {messages?.map(m=>(
                <SingleMessage message={m} key={m.id}/>
            ))}

        </div>
    );
};

export default Messages;