import React from 'react';
import Messages from './Messages';
import ChatInputField from './ChatInputField';
import Image from 'next/image';
import {useChatContext} from "../../Context/chatContext";

const Chat = () => {
    const { data } = useChatContext();
    // if (window.matchMedia("(max-width: 800px)").matches) {
    //     const exitButton = document.getElementsByClassName('exitButton')[0];
    //     //exitButton.style.display = "block";
    // }

    const handleSwitchToSidebar = () => {
        const chat = document.getElementsByClassName('chat')[0];
        chat.style.display = "none";
        const sidebar = document.getElementsByClassName('sidebar')[0];
        sidebar.style.display = "block";
    }
    return (
        <div className='chat'>
            <div className='positioningExit'>
                <span>
                    You are chatting with: {data.user?.username}
                </span>
                <button className='exitButton'
                        onClick = {handleSwitchToSidebar}>
                BACK
                </button>
            </div>

            <Messages />

            <ChatInputField />
        </div>
    )
}

export default Chat;