import React from 'react';
import Messages from './Messages';
import ChatInputField from './ChatInputField';
import Image from 'next/image';
import {useChatContext} from "../../Context/chatContext";

const Chat = () => {
    const { data } = useChatContext();
    return (
        <div className='chat'>
            <div className='chatInfo'>
                <span>{data.user?.username}</span>
            </div>
            <Messages />
            <ChatInputField />
        </div>
    )
}

export default Chat;