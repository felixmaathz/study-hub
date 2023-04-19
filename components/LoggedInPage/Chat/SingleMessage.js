import React from 'react';
import Image from 'next/image';
import profile from '../../../public/images/profile.png';
import {useChatContext} from "../../Context/chatContext";
import {useAuth} from "../../Context/userAuthContext";
import {useRef, useEffect} from "react";

const singleMessage = ({message}) => {

    const { data } = useChatContext();
    const {user} = useAuth()

    const ref = useRef()

    useEffect(() => {
        ref.current.scrollIntoView({behavior: 'smooth'})
    }, [message])

    return (
        <div ref={ref}
            className={`message ${message.senderId === user.uid && 'owner'}`}>
            <div className='messageInfo'>
                <div>
                    <Image className='imageSizeChat' src={profile} alt='profile'/>
                </div>
                <span>Just now</span>
            </div>
            <div className='messageContent'>
                <p>{message.text}</p>
            </div>
        </div>
    )
}

export default singleMessage;