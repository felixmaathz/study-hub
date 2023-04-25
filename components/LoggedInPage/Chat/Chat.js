import React from 'react';
import Messages from './Messages';
import ChatInputField from './ChatInputField';
import Image from 'next/image';
import {useChatContext} from "../../Context/chatContext";

const Chat = () => {
    const { data } = useChatContext();
    return (
        <div className='chat'>
                <span>
                    You are chatting with: {data.user?.username}
                </span>

            <Messages />

            <ChatInputField />
        </div>
    )
}

export default Chat;