import {useAuth} from "./Context/userAuthContext";
import {getAuth, signOut} from "firebase/auth";
import {app, db} from "../config/firebaseConfig";
import {doc, updateDoc} from "firebase/firestore";
import styles from "../styles/popup.module.css";
import EditProfilePopup from "./LoggedInPage/EditProfilePopup";
import React, {useRef, useState} from "react";
import Image from "next/image";

function YourProfilePopup(props) {


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
                    <button onClick={() => props.setTrigger(false)}>X</button>
                    <div className={styles.profileLayout}>
                        <div className={styles.userPictureContainer}>
                            <div className={styles.userProfilePicture}>
                                <Image
                                    src="/images/profile.png"
                                    alt="user"
                                    fill
                                    contain/>
                            </div>
                        </div>

                        <div className={styles.userInfo}>
                            <h3>Your Profile</h3>
                            <h1>{username}</h1>
                            <h1>{email}</h1>
                            <h1>{major}</h1>

                            {(competencies !== undefined) ? (
                                <p>{competencies.map((c) => {
                                    return c + " "
                                })}</p>
                            ) : (
                                <p>No competencies added :(</p>
                            )}
                            <br/>
                            <button
                                onClick={handleSignOut}
                                className={styles.popupButtons}>Sign Out</button>
                            <button
                                onClick={handleEdit}
                                className={styles.popupButtons}>Edit Profile</button>
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
            </div>

        ) :
        "";
}

export default YourProfilePopup