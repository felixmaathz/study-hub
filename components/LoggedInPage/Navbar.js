import Image from 'next/image'
import Link from 'next/link';
import ProfilePopup from "./ProfilePopup";
import HelpPopup from "./HelpPopup";
import React, {useEffect, useState} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {app, db} from "../../config/firebaseConfig";
import {collection, getDoc, doc, getDocs} from "firebase/firestore";

export function Navbar() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [major, setMajor] = useState("");

    const auth = getAuth(app);
    const user = auth.currentUser;
    console.log(user)
    let uid = ""

    onAuthStateChanged(auth, (user) => {
        if (user) {
            uid = user.uid;
            console.log("User is logged in " + uid)
            getUserData().then(r => {
                console.log("username: " + username+ " email: " + email + " major: " + major)
            })

        } else {
            console.log("User is not logged in")
        }
    });




    const getUserData = async () => {
        console.log(uid)
        const docRef = doc(db, "users", uid);
        try {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setUsername(docSnap.data().username)
                setEmail(docSnap.data().email)
                setMajor(docSnap.data().major)

            } else {
                console.log("Document does not exist")
            }

        } catch (error) {
            console.log(error)
        }
    }


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
            <ProfilePopup trigger={profileButtonPopup} setTrigger={setProfileButtonPopup} data={{
                username: username,
                email: email,
                major: major
            }}/>
            <HelpPopup trigger={helpButtonPopup} setTrigger={setHelpButtonPopup}/>
        </nav>)
}