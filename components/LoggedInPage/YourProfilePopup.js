import {useAuth} from "../Context/userAuthContext";
import {db} from "../../config/firebaseConfig";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import styles from "../../styles/popup.module.css";
import EditYourProfilePopup from "./EditProfilePopup";
import React, {useRef, useState} from "react";
import Image from "next/image";
import EditProfilePopup from "./EditProfilePopup";
import NotificationPopup from "./NotificationPopup";


function YourProfilePopup(props) {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [major, setMajor] = useState("");
    const [competencies, setCompetencies] = useState([]);
    const [bio, setBio] = useState("");
    const [XP, setXP] = useState(0);
    const [profileLikes, setProfileLikes] = useState([])
    const [level, setLevel] = useState(0)
    const [profilePictureURL, setProfilePictureURL] = useState("")
    const [profilePicture, setProfilePicture] = useState("/images/profile.png")
    const [notification,setNotification] = useState(props.notification)

    const [editTrigger, setEditTrigger] = useState(false)
    const [notificationTrigger, setNotificationTrigger] = useState(false)
    const dataFetchedRef = useRef(false);

    const {user, getDisplayPicture, displayMajor, logOut, getUserData} = useAuth()

    const handleSignOut = () => {
        logOut().then(() => {
            console.log("Signed out")
        })

    }

    const handleEdit = () => {
        setEditTrigger(true)
    }

    React.useEffect(() => {
        if(user){

            getUserData(user.uid).then((r) => {
                setUsername(r.username)
                setEmail(r.email)
                setMajor(r.major)
                setCompetencies(r.competencies)
                setBio(r.bio)
                setXP(r.XP)
                setProfileLikes(r.profileLikes)
                setProfilePictureURL(r.profilePictureURL)
                getDisplayPicture(r.profilePictureURL).then((r) => {
                    setProfilePicture(r)
                    dataFetchedRef.current = true
                })
                calculateLevel()
                }
            )
            }
        }, [props.trigger])

    const calculateLevel = () => {
        setLevel(Math.floor(user.XP / 100))

    }


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

        await updateDoc(doc(db, "users", user.uid), {
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

    function handleNotification(notification) {
        setNotification(notification);
        props.handleNotification(notification);
    }

    const closePopup = () => {
        props.setTrigger(false)
        setNotificationTrigger(false)
    }

    return (props.trigger) ? (
            <div className={styles.popupProfile}>
                <div style={{width: "100vw", height: "100vh", position: "absolute"}}
                     onClick={closePopup}></div>
                <div className={styles.popupInnerProfile}>
                    <div onClick={() => props.setTrigger(false)} className={styles.closeBtn}>
                        <span
                            className="material-symbols-outlined">
                            close
                            </span>
                    </div>
                    <div onClick={() => setNotificationTrigger(true)} className={styles.notification}>
                        {(props.notification) ? <div className={styles.notis}></div> : null}
                        <span className="material-symbols-outlined">
                            notifications
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
                                    <h4>LVL {level}</h4>
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
                                    bio: bio,
                                    level: level
                                }}
                                editTrigger={editTrigger}
                                setEditTrigger={setEditTrigger}
                                saveProfile={saveProfile}
                            />
                            <NotificationPopup
                                handleNotification={handleNotification}
                                notification={notification}
                                notificationTrigger={notificationTrigger}
                                setNotificationTrigger={setNotificationTrigger}
                                data={{
                                profileLikes: profileLikes
                            }}
                            />
                        </div>
                    </div>
                </div>
            </div>

        ) :
        "";
}

export default YourProfilePopup