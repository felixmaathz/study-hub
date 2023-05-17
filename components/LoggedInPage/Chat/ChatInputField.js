import React from 'react';
import Image from 'next/image';
import AddImage from '../../../public/images/addImage.png';
import {useChatContext} from "../../Context/chatContext";
import {useAuth} from "../../Context/userAuthContext";
import {useState, useEffect} from "react";
import {v4 as uuid} from 'uuid';
import {
    arrayUnion,
    doc,
    updateDoc,
    Timestamp,
    serverTimestamp,
    getDoc,
    query,
    collection,
    where, getDocs
} from "firebase/firestore";
import {db} from "../../../config/firebaseConfig";
const ChatInputField = ()=> {
    const [text, setText] = useState('');
    const [img, setImg] = useState(null);

    const { data } = useChatContext();
    const {user} = useAuth()


    const handlePress = (e) => {
        e.code === "Enter" && handleSend();
    }
    const handleSend = async () =>{
        if (text.trim() === "") return;
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
            const username = userDocSnapshot.data().username;
            console.log("Username:", username);

            // if(img){
            //
            //
            // }else{
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: user.uid,
                    senderName: username,
                    date: Timestamp.now(),
                }),
            })

            await updateDoc(doc(db, "userChats", user.uid), {
                [data.chatId + ".lastMessage"]: {
                    text
                },
                [data.chatId + ".date"]: serverTimestamp(),
                [data.chatId + ".read"]: true,
            });

            await updateDoc(doc(db, "userChats", data.user.uid), {
                [data.chatId + ".lastMessage"]: {
                    text
                },
                [data.chatId + ".date"]: serverTimestamp(),
                [data.chatId + ".userInfo"]: {
                    uid: user.uid,
                    username: username,
                },
                [data.chatId + ".read"]: false,

            });
            // }
            setText('');
            setImg(null);
            console.log("datauser:", data);
            console.log("user:", user);
        }
    }
    return (
        <div className='chatInputContainer'>
            <div className='chatInput'>
                <input type='text'
                       placeholder='Type a message...'
                       onKeyDown={handlePress}
                       onChange={e=>setText(e.target.value)}
                       value={text}
                       style={{marginLeft: '15px'}}/>
                <div className='send'>
                    <input type='file' style={{display:'none'}} id='file' onChange={e=>setImg(e.target.files[0])}/>
                    <label htmlFor='file'>
                        <div className='chatImageStyle'>
                            <span className="material-symbols-outlined"
                                  style={{fontSize: '35px', color: 'black', opacity: '100'}}>
                                photo_library
                            </span>
                        </div>
                    </label>
                    <div className='sendButtonContainer' onClick={handleSend}>
                        <span className="material-symbols-outlined"
                              style={{color: 'green', opacity:'100', fontSize: '35px'}}>
                            send
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatInputField;