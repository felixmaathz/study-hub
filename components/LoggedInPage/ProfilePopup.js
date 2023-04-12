import React from 'react'
import styles from '../../styles/popup.module.css'
import {getAuth,signOut} from "firebase/auth";
import {app} from "../../config/firebaseConfig";

function ProfilePopup(props){

const handleSignOut = () => {
    const auth = getAuth(app);
    signOut(auth).then(() => {
        alert("Signed out")
    }
    ).catch((error) => {
        alert(error.message)
    })

}

    return (props.trigger) ? (
        <div className={styles.popup}>
            <div className={styles.popupInner}>
                <button className={styles.closeBtn} onClick = {() => props.setTrigger(false)}>X</button>

                <div className={styles.container}>
                    <h3>Your Profile</h3>
                    <br/>
                    <button onClick={handleSignOut}>Sign Out</button>
                </div>
            </div>
        </div>

    ):"";
}

export default ProfilePopup