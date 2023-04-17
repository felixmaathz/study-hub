import React, {useState} from 'react'
import styles from '../../styles/popup.module.css'
import {getAuth, signOut} from "firebase/auth";
import {app, db} from "../../config/firebaseConfig";

import { useAuth } from "components/Context/userAuthContext.js"
import {doc, getDoc} from "firebase/firestore";

function ProfilePopup(props) {


    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [major, setMajor] = useState("");

    const { user, getUserData } = useAuth()

    const handleSignOut = () => {
        const auth = getAuth(app);
        signOut(auth).then(() => {
                alert("Signed out")
            }
        ).catch((error) => {
            alert(error.message)
        })

    }

    React.useEffect(() => {
        if (user) {
            getUserData(user.uid).then(r => {
                setUsername(r.username)
                setEmail(r.email)
                setMajor(r.major)
            })
        }
    })




    return (props.trigger) ? (
        <div className={styles.popup}>
            <div className={styles.popupInner}>
                <button className={styles.closeBtn} onClick={() => props.setTrigger(false)}>X</button>
                <div className={styles.container}>
                    <h3>Your Profile</h3>
                    <h1>{username}</h1>
                    <h1>{email}</h1>
                    <h1>{major}</h1>
                    <br/>
                    <button onClick={handleSignOut}>Sign Out</button>
                </div>
            </div>
        </div>

) :
    "";
}

export default ProfilePopup