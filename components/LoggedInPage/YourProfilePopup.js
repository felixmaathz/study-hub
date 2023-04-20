import {useAuth} from "../Context/userAuthContext";
import {getAuth, signOut} from "firebase/auth";
import {app, db} from "../../config/firebaseConfig";
import {doc, updateDoc} from "firebase/firestore";
import styles from "../../styles/popup.module.css";
import EditProfilePopup from "./EditProfilePopup";
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

    const saveProfile = async (username, email, major, competencies) => {
        setUsername(username)
        setEmail(email)
        setMajor(major)
        setCompetencies(competencies)
        console.log(username, email, major)

        const docRef = await updateDoc(doc(db, "users", user.uid), {
            username: username,
            email: email,
            major: major,
            competencies: competencies
        }).then(() => {
            console.log("Profile updated")
        })
    }

    const displayMajor = (major) => {
        switch (major) {
            case "E":
                return "Electrical Engineering"
            case "ES":
                return "Energy Systems Engineering"
            case "I":
                return "Industrial Engineering and Management"
            case "IT":
                return "Computer and Information Engineering"
            case "K":
                return "Chemical Engineering"
            case "W":
                return "Environmental and Water Engineering"
            case "X":
                return "Molecular Biotechnology Engineering"
            case "STS":
                return "Sociotechnical Systems Engineering"
            case "F":
                return "Engineering Physics"
            case "Q":
                return "Materials Engineering"
            case "Other":
                return "Other"
        }
    }




    return (props.trigger) ? (
            <div className={styles.popup}>
                <div className={styles.popupInner}>
                    <div onClick={() => props.setTrigger(false)} className={styles.closeBtn}>
                        <span
                            className="material-symbols-outlined">
                            close
                            </span>
                    </div>
                    <div className={styles.profileLayout}>
                        <div className={styles.userPictureContainer}>
                            <div className={styles.userProfilePicture}>
                                <Image
                                    src="/images/profile.png"
                                    alt="user"
                                    fill
                                    contain/>
                                <div className={styles.level}>
                                    <h4>LVL 4</h4>
                                </div>
                            </div>
                            <p>"I hate Mondays"</p>
                        </div>

                        <div className={styles.userInfo}>
                            <h1 className={styles.username}>{username}</h1>
                            <h4 className={styles.major}>{displayMajor(major)}</h4>

                            <div className={styles.profileCompetencies}>
                                {(competencies !== undefined) ? (
                                    <p>{competencies.map((c) => {
                                        return c + " "
                                    })}</p>
                                ) : (
                                    <p>No competencies added :(</p>
                                )}
                            </div>
                            <br/>
                            <div className={styles.buttonLayout}>
                                <button
                                    onClick={handleSignOut}
                                    className={styles.popupButtons}><h4>Sign Out</h4>
                                </button>
                                <button
                                    onClick={handleEdit}
                                    className={styles.popupButtons}><h4>Edit Profile</h4>
                                </button>
                            </div>
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