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
const chatInputField = () => {
    const [text, setText] = useState('');
    const [img, setImg] = useState(null);

    const { data } = useChatContext();
    const {user} = useAuth()


    const handleSend = async () =>{
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
            const username = userDocSnapshot.data().username;
            console.log("Username:", username);

            // if(img){
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
            });

            await updateDoc(doc(db, "userChats", data.user.uid), {
                [data.chatId + ".lastMessage"]: {
                    text
                },
                [data.chatId + ".date"]: serverTimestamp(),
                [data.chatId + ".userInfo"]: {
                    uid: user.uid,
                    username: username,
                }

            });
            // }
            setText('');
            setImg(null);
            console.log("datauser:", data);
            console.log("user:", user);
        }
    }
    return (
        <div className='chatInput'>
            <input type='text' placeholder='Type a message...' onChange={e=>setText(e.target.value)} value={text}/>
            <div className='send'>
                <input type='file' style={{display:'none'}} id='file' onChange={e=>setImg(e.target.files[0])}/>
                <label htmlFor='file'>
                    <div className='chatImageStyle'>
                        <Image src={AddImage} alt='addImage' />
                    </div>
                </label>
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    )
}

export default chatInputField;