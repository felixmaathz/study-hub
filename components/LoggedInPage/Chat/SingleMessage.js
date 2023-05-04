import React from 'react';
import Image from 'next/image';
import profile from '../../../public/images/profile.png';
import {useChatContext} from "../../Context/chatContext";
import {useAuth} from "../../Context/userAuthContext";
import {useRef, useState, useEffect} from "react";
import messages from "./Messages";

const singleMessage = ({message, profilePicture, sendersPicture}) => {


    const { data } = useChatContext();
    const {user, getDisplayPicture} = useAuth()

    const ref = useRef()



    return (
        <div>
            <div style={{'marginBottom':'-15px'}}>
                <span>{message.date.toDate().toDateString()+" "+message.date.toDate().toLocaleTimeString()}</span>
            </div>
            <div ref={ref} className={`message ${message.senderId === user.uid && 'owner'}`}>

                <div className='messageInfo'>
                    <Image  className='imageSizeChat'
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