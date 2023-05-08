import styles from "../styles/index.module.css"
import React, {useState} from "react";
import Link from 'next/link';
import Sidebar from "../components/LoggedInPage/Chat/Sidebar";
import Chat from "../components/LoggedInPage/Chat/Chat";
import Layout from "../components/LoggedInPage/Layout";


// Sidebar and Chat and a few components inside them have been
// inspired by https://github.com/safak/youtube2022/tree/react-chat
export default function ChatPage() {
    React.useEffect(() => {
        const sidebarCSS = document.getElementsByClassName('sidebar')[0];
        const chatCSS = document.getElementsByClassName('chat')[0];

        function handleResize() {
            if (window.matchMedia("(max-width: 800px)").matches) {
                chatCSS.style.display = 'none';
                sidebarCSS.style.display = 'flex';

            }
            else {
                chatCSS.style.display = 'block';
                sidebarCSS.style.display = 'block';
            }
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


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