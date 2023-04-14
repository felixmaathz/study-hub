import styles from "../styles/index.module.css"
import React, {useState} from "react";
import Link from 'next/link';
import Sidebar from "../components/LoggedInPage/Chat/Sidebar";
import Chat from "../components/LoggedInPage/Chat/Chat";
import Layout from "../components/LoggedInPage/Layout";

export default function MapPage() {
    return(
        <div>
            <main>
                <div className='pageContainer'>
                    < Layout >
                        <div className='chatContainer'>
                            < Sidebar />
                            < Chat />
                        </div>
                    </Layout>
                </div>
            </main>
        </div>
    )
}