import styles from "../styles/index.module.css"
import React, {useState} from "react";
import Link from 'next/link';
import Sidebar from "../components/LoggedInPage/Chat/Sidebar";
import Chat from "../components/LoggedInPage/Chat/Chat";
import Layout from "../components/LoggedInPage/Layout";


// Sidebar and Chat and all components inside them have been
// inspired by https://github.com/safak/youtube2022/tree/react-chat
export default function ChatPage() {
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