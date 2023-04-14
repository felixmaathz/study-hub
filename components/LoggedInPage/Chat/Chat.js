import React from 'react';
import Messages from './Messages';
import ChatInputField from './ChatInputField';
import Image from 'next/image';
const Chat = () => {
    return (
        <div className='chat'>
            <Messages />
            <ChatInputField />
        </div>
    )
}

export default Chat;