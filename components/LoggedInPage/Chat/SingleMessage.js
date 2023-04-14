import React from 'react';
import Image from 'next/image';
import profile from '../../../public/images/profile.png';
const singleMessage = () => {
    return (
        <div className='message owner'>
            <div className='messageInfo'>
                <div>
                    <Image className='imageSizeChat' src={profile} alt='profile'/>
                </div>
                <span>Just now</span>
            </div>
            <div className='messageContent'>
                <p>Hej</p>
            </div>
        </div>
    )
}

export default singleMessage;