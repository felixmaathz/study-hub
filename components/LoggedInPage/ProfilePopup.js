import React, {useRef, useState} from 'react'
import styles from '../../styles/popup.module.css'
import {getAuth, signOut} from "firebase/auth";
import {app, db} from "../../config/firebaseConfig";

import {useAuth} from "components/Context/userAuthContext.js"
import {doc, getDoc, updateDoc} from "firebase/firestore";
import EditProfilePopup from "./EditProfilePopup";

function ProfilePopup(props) {


    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [major, setMajor] = useState("");
    const [competencies, setCompetencies] = useState([]);
    const [editTrigger, setEditTrigger] = useState(false)
    const dataFetchedRef = useRef(false);

    const {user, getUserData} = useAuth()

    const handleSignOut = () => {
        const auth = getAuth(app);
        signOut(auth).then(() => {
                alert("Signed out")
            }
        ).catch((error) => {
            alert(error.message)
        })

    }

    const handleEdit = () => {
        setEditTrigger(true)
        // props.setTrigger(false)
    }

    React.useEffect(() => {
            if (user && !dataFetchedRef.current) {
                dataFetchedRef.current = true;
                getUserData(user.uid).then(r => {
                    setUsername(r.username)
                    setEmail(r.email)
                    setMajor(r.major)
                    setCompetencies(r.competencies)
                    console.log("User data fetched")
                })
            }
    }, [])

    const saveProfile = async (username,email,major,competencies) => {
        setUsername(username)
        setEmail(email)
        setMajor(major)
        setCompetencies(competencies)
        console.log(username,email,major)

        const docRef = await updateDoc(doc(db, "users", user.uid), {
            username: username,
            email: email,
            major: major,
            competencies: competencies
        }).then(() => {
            console.log("Profile updated")
        })
    }


    return (props.trigger) ? (
            <div className={styles.popup}>
                <div className={styles.popupInner}>
                    <button className={styles.closeBtn} onClick={() => props.setTrigger(false)}>X</button>
                    <div className={styles.container}>
                        <h3>Your Profile</h3>
                        <h1>{username}</h1>
                        <h1>{email}</h1>
                        <h1>{major}</h1>

                        <p>{competencies.map((c)=>{
                            return c + " "
                        })}</p>
                        <p>{competencies.map((c)=>{
                            return c + " "
                        })}</p>
                        <br/>
                        <button onClick={handleSignOut}>Sign Out</button>
                        <button onClick={handleEdit}>Edit Profile</button>
                        <EditProfilePopup
                            data={{
                                username: username,
                                email: email,
                                major: major,
                                competencies: competencies
                             }}
                            editTrigger={editTrigger}
                            setEditTrigger={setEditTrigger}
                            saveProfile={saveProfile}
                        />
                    </div>
                </div>
            </div>

        ) :
        "";
}

export default ProfilePopup