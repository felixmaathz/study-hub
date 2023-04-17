import Image from 'next/image'
import Link from 'next/link';
import ProfilePopup from "./ProfilePopup";
import HelpPopup from "./HelpPopup";
import React, {useEffect, useState} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {app, db} from "../../config/firebaseConfig";
import { useAuth } from "components/Context/userAuthContext.js"
import {useRouter} from "next/router";

export function Navbar() {



    const [profileButtonPopup, setProfileButtonPopup] = useState(false);
    const [helpButtonPopup, setHelpButtonPopup] = useState(false);

    const showProfile = () => {
        setProfileButtonPopup(true);
    }

    const showHelp = () => {
        setHelpButtonPopup(true);
    }

    const showMenu = () => {
        const list = document.getElementById('list');
        list.classList.toggle("active");
    }


    return (
        <nav className="navbar">
            <div className="icon-container">
                <Link href="MapPage">
                    <Image src="/images/favicon.png"
                           className="icon"
                           alt="icon"
                           width={60}
                           height={60}/>
                </Link>
            </div>
            <ul className="list"
                id="list">
                <li className="list-item">
                    <Link href="/MapPage">
                        <button id="Map"
                        >Map
                        </button>
                    </Link>
                </li>
                <li className="list-item">
                    <Link href="ChatPage">
                        <button id="Chat"
                        >Chat
                        </button>
                    </Link>
                </li>
                <li className="list-item">
                    <button onClick={showHelp}>Help</button>
                </li>
                <li className="list-item profile">
                    <button>Profile</button>
                </li>
            </ul>
            <div className="profile-container"
                 onClick={showProfile}>
                <Image src="/images/profile.png"
                       alt="profile"
                       width={60}
                       height={60}/>
            </div>
            <div className="menu">
                <div className="menu-container"
                     onClick={showMenu}>
                    <Image src="/images/menu.png"
                           alt="menu"
                           width={60}
                           height={60}/>
                </div>
            </div>
            <ProfilePopup trigger={profileButtonPopup} setTrigger={setProfileButtonPopup} />
            <HelpPopup trigger={helpButtonPopup} setTrigger={setHelpButtonPopup}/>
        </nav>)
}