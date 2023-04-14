import React from 'react';
import Image from 'next/image';
const ChatList = () => {
    return (
        <div className='chatList'>
            <div className='userChat'>
                <div className='imageSize'>
                    <Image src="/images/profile.png" alt="profile" layout='fill'/>
                </div>
                <div className='userChatInfo'>
                    <span>Fogen</span>
                    <p>Nej, du kommer inte få någon semester</p>
                </div>
            </div>
        </div>
    )
}

export default ChatList;