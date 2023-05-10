import Image from 'next/image'
import Link from 'next/link';
import HelpPopup from "./HelpPopup";
import React, {useEffect, useState} from "react";
import YourProfilePopup from "../LoggedInPage/YourProfilePopup";
import {useAuth} from "../Context/userAuthContext";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../../config/firebaseConfig";

export function Navbar() {

    const [profileButtonPopup, setProfileButtonPopup] = useState(false);
    const [helpButtonPopup, setHelpButtonPopup] = useState(false);
    const [profilePicture, setProfilePicture] = useState("/images/profile.png")
    const [isLoading, setIsLoading] = useState(true)
    const [notification, setNotification] = useState(false)
    const [messageNotification, setMessageNotification] = useState(false)

    const {user, getDisplayPicture, checkMessages,clearMessageNotifications} = useAuth()


    const getProfilePicture = () => {
        if (isLoading) {
            setProfilePicture("/images/loadingProfilePicture.gif")
        }
        getDisplayPicture(user.profilePictureURL).then((r) => {
            setProfilePicture(r)
        })
        setIsLoading(false)
    }

    useEffect(() => {
        if (user) {
            console.log(user)
            getProfilePicture()
        }
    }, [getProfilePicture])

    useEffect(() => {
        if (user) {
            const checkNotifications = async () => {
                const userDoc = await getDoc(doc(db, "users", user.uid))
                const profileLikes = userDoc.data().profileLikes
                const messages = await checkMessages()
                if (messages===true) {
                    setMessageNotification(true)
                }

                profileLikes.map((like) => {
                    if (!like.read) {
                        setNotification(true)
                    }
                })
            }


            checkNotifications()

        }
    }, [user])


    const handleNotification = () => {
        setNotification(false)
    }

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

    const clearNotifications = () => {
        setMessageNotification(false)
        clearMessageNotifications()
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
                        <button id="Chat" className="button" onClick={clearNotifications}
                        >
                            {(messageNotification) ? <div className="notis"></div> : null}
                            Chat
                        </button>
                    </Link>
                </li>
                <li className="list-item">
                    <button onClick={showHelp} className="button">Help</button>
                </li>
                <li className="list-item profile">
                    {(notification) ? <div className="notis"></div> : null}
                    <button onClick={showProfile} className="button">Profile</button>
                </li>
            </ul>
            <div className="profile-container"
                 onClick={showProfile}>

                {(notification) ? <div className="notis"></div> : null}

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

            <YourProfilePopup
                notification={notification}
                handleNotification={handleNotification}
                trigger={profileButtonPopup}
                setTrigger={setProfileButtonPopup}
                update={getProfilePicture}/>
            <HelpPopup trigger={helpButtonPopup} setTrigger={setHelpButtonPopup}/>
        </nav>)
}