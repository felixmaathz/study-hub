import React from 'react';
import Messages from './Messages';
import ChatInputField from './ChatInputField';
import Image from 'next/image';
import {useChatContext} from "../../Context/chatContext";


const Chat = () => {
    const sidebar = document.getElementsByClassName('sidebar')[0];
    const chat = document.getElementsByClassName('chat')[0];

    const { data, dispatch } = useChatContext();
    // if (window.matchMedia("(max-width: 800px)").matches) {
    //     const exitButton = document.getElementsByClassName('exitButton')[0];
    //     //exitButton.style.display = "block";
    // }


    const handleSwitchToSidebar = () => {
        dispatch({type:"RESET_USER"});
        sidebar.style.display = "flex";
        chat.style.display ='none';

    }
    return (
        <div className='chat'>
            <div className='positioningExit'>
                <button className='exitButton'
                        onClick = {handleSwitchToSidebar}>
                    BACK
                </button>
                <span style={{opacity: '1'}}>
                    {data.user?.username
                        ? `You are chatting with: ${data.user.username}`
                        : 'Choose a chat to start chatting!'}
                </span>

            </div>

            <Messages />

            <ChatInputField />
        </div>
    )
}

export default Chat;