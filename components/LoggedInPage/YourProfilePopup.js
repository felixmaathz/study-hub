import {useAuth} from "../Context/userAuthContext";
import {db} from "../../config/firebaseConfig";
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
    const [bio, setBio] = useState("");
    const [profilePictureURL, setProfilePictureURL] = useState("")
    const [profilePicture, setProfilePicture] = useState("/images/profile.png")

    const [editTrigger, setEditTrigger] = useState(false)
    const dataFetchedRef = useRef(false);

    const {user, getUserData, getDisplayPicture, displayMajor, logOut} = useAuth()

    const handleSignOut = () => {
        logOut().then(() => {
            console.log("Signed out")
        })

    }

    const handleEdit = () => {
        setEditTrigger(true)
    }

    React.useEffect(() => {
        if (user && !dataFetchedRef.current) {
            setUsername(user.username)
            setEmail(user.email)
            setMajor(user.major)
            setCompetencies(user.competencies)
            setBio(user.bio)
            setProfilePictureURL(user.profilePictureURL)
            getDisplayPicture(user.profilePictureURL).then((r) => {
                setProfilePicture(r)
                dataFetchedRef.current = true
            })
        }
    }, [props.trigger])


    const saveProfile = async (username, email, major, competencies, profilePictureURL, bio) => {
        setUsername(username)
        setEmail(email)
        setMajor(major)
        setCompetencies(competencies)
        setProfilePictureURL(profilePictureURL)
        setBio(bio)
        getDisplayPicture(profilePictureURL).then((r) => {
            setProfilePicture(r)
        })

        console.log(username, email, major, competencies, profilePictureURL)

        const docRef = await updateDoc(doc(db, "users", user.uid), {
            username: username,
            email: email,
            major: major,
            competencies: competencies,
            profilePictureURL: profilePictureURL,
            bio: bio
        }).then(() => {
            props.update()
            console.log("Profile updated")
        })
    }


    return (props.trigger) ? (
            <div className={styles.popup}>
                <div style={{width: "100vw", height: "100vh", position: "absolute"}}
                     onClick={() => props.setTrigger(false)}></div>
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
                                    src={profilePicture}
                                    alt="user"
                                    fill="true"
                                    className={styles.profileFrame}/>
                                <div className={styles.level}>
                                    <h4>LVL 4</h4>
                                </div>
                            </div>
                            <div className={styles.bio}>{(bio.length > 0) ? ('"' + bio + '"')
                                : ""}</div>
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
                                    competencies: competencies,
                                    profilePictureURL: profilePictureURL,
                                    bio: bio
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