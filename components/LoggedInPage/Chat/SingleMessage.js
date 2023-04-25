import React from 'react';
import Image from 'next/image';
import profile from '../../../public/images/profile.png';
import {useChatContext} from "../../Context/chatContext";
import {useAuth} from "../../Context/userAuthContext";
import {useRef, useState, useEffect} from "react";

const singleMessage = ({message}) => {

    const [profilePicture, setProfilePicture] = useState(profile)
    const [sendersPicture, setSendersPicture] = useState(profile)

    const { data } = useChatContext();
    const {user, getDisplayPicture} = useAuth()

    const ref = useRef()

    const getProfilePicture = () => {
        getDisplayPicture(user.profilePictureURL).then((r) => {
            setProfilePicture(r)
        })
         getDisplayPicture("profilePictures/" + data.user.uid).then((s) => {
             setSendersPicture(s)
        })
    }

    useEffect(() => {
        ref.current.scrollIntoView({behavior: 'smooth'})
        getProfilePicture()
        console.log("Profile picture updated")

    }, [message, getProfilePicture])


    return (
        <div ref={ref}
            className={`message ${message.senderId === user.uid && 'owner'}`}>
            <div className='messageInfo'>
                <div className='avatarContainer'>
                    <Image className='imageSizeChat'
                           src={
                           message.senderId === user.uid
                                ? profilePicture
                                : sendersPicture}
                           alt='profile'
                           width={50}
                           height={50}/>
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