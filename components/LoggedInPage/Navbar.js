import Image from 'next/image'
import Link from 'next/link';
import HelpPopup from "./HelpPopup";
import React, {useEffect, useState} from "react";
import YourProfilePopup from "../LoggedInPage/YourProfilePopup";
import {useAuth} from "../Context/userAuthContext";

export function Navbar() {

    const [profileButtonPopup, setProfileButtonPopup] = useState(false);
    const [helpButtonPopup, setHelpButtonPopup] = useState(false);
    const [profilePicture, setProfilePicture] = useState("/images/profile.png")
    const [isLoading, setIsLoading] = useState(true)

    const {user, getDisplayPicture} = useAuth()

    const getProfilePicture = () => {
        if(isLoading){
            setProfilePicture("/images/loadingProfilePicture.gif")
        }
        getDisplayPicture(user.profilePictureURL).then((r) => {
            setProfilePicture(r)
        })
        setIsLoading(false)
    }

    useEffect(() => {
        if (user) {
            if(user.profilePictureURL === undefined || user.profilePictureURL === ""){
                console.log("No profile picture found")
            }else{
                getProfilePicture()
                console.log("Profile picture updated")
            }
        }
    },[getProfilePicture])


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
                        <button id="Map" className="button"
                        >Map
                        </button>
                    </Link>
                </li>
                <li className="list-item">
                    <Link href="ChatPage">
                        <button id="Chat" className="button"
                        >Chat
                        </button>
                    </Link>
                </li>
                <li className="list-item">
                    <button onClick={showHelp} className="button">Help</button>
                </li>
                <li className="list-item profile">
                    <button onClick={showProfile} className="button">Profile</button>
                </li>
            </ul>
            <div className="profile-container"
                 onClick={showProfile}>
                <Image src={profilePicture}
                       alt="profile"
                       width={60}
                       height={60}
                        className="frame"/>
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
            <YourProfilePopup trigger={profileButtonPopup} setTrigger={setProfileButtonPopup} update={getProfilePicture}/>
            <HelpPopup trigger={helpButtonPopup} setTrigger={setHelpButtonPopup}/>
        </nav>)
}