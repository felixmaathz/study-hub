import styles from "../styles/index.module.css"
import React, {useState} from "react";
import Link from 'next/link';
import Sidebar from "../components/LoggedInPage/Chat/Sidebar";
import Chat from "../components/LoggedInPage/Chat/Chat";
import Layout from "../components/LoggedInPage/Layout";


// Sidebar and Chat and all components inside them have been
// inspired by https://github.com/safak/youtube2022/tree/react-chat
export default function ChatPage() {
    const sidebar = document.getElementsByClassName('sidebar')[0];
    const chat = document.getElementsByClassName('chat')[0];

    React.useEffect(() => {
        function handleResize() {
            console.log('Hello handleResize is happening!')
            if (window.innerWidth <= 800 && sidebar.style.display === 'flex' && chat.style.display === 'block') {
                chat.style.display = 'none';
            }
            if(window.innerWidth >= 800 && sidebar.style.display === 'flex' && chat.style.display === 'none'){
                chat.style.display = 'block';
            }
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [innerWidth]);

    return(
        <div>
            <main>
                <div className='pageContainer'>

                        <div className='chatContainer'>
                            < Sidebar />
                            < Chat />
                        </div>

                </div>
            </main>
        </div>
    )
}