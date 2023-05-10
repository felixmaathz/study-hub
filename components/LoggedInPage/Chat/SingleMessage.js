import React from 'react';
import Image from 'next/image';
import profile from '../../../public/images/profile.png';
import {useChatContext} from "../../Context/chatContext";
import {useAuth} from "../../Context/userAuthContext";
import {useRef, useState, useEffect} from "react";
import messages from "./Messages";
import styles from "../../../styles/popup.module.css";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../../../config/firebaseConfig";

const singleMessage = ({message, profilePicture, sendersPicture}) => {


    const {data} = useChatContext();
    const {user, getDisplayPicture} = useAuth()

    const ref = useRef()

    const dayList = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    useEffect(() => {
        ref.current.scrollIntoView({behavior: 'smooth'})
        console.log("Profile picture updated")

    }, []) //message, getProfilePicture

    return (
        <div>
            <div style={{'marginBottom': '-15px'}}>
                {/*<span>{message.date.toDate().toDateString()+" "+message.date.toDate().toLocaleTimeString()}</span>*/}
                {
                    ((Date.now() - message.date.toDate().getTime()) < 604800000) ? (
                        <span>{" " + dayList[message.date.toDate().getDay() - 1].substring(0, 3) + " "}{message.date.toDate().toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                        })}</span>
                    ) : (
                        <span>{" " + message.date.toDate().toLocaleDateString() + " "}{message.date.toDate().toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                        })}</span>
                    )
                }
            </div>
            <div ref={ref} className={`message ${message.senderId === user.uid && 'owner'}`}>

                <div className='messageInfo'>
                    <Image className='imageSizeChat'
                           src={
                               message.senderId === user.uid
                                   ? profilePicture
                                   : sendersPicture
                           }

                           alt='profile'
                           width={50}
                           height={50}/>
                </div>

                <div className='messageContent'>
                    <p>{message.text}</p>
                </div>
            </div>


        </div>
    )
}

export default singleMessage;