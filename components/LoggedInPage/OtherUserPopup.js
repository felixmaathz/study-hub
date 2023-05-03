import React, {useRef, useState} from "react";
import styles from "../../styles/popup.module.css";
import {useAuth} from "../Context/userAuthContext";
import Image from "next/image";
import {
    collection,
    doc,
    getDocs,
    setDoc,
    Timestamp,
    arrayRemove,
    arrayUnion,
    increment,
    getDoc
} from "firebase/firestore";
import {db} from "../../config/firebaseConfig";


function OtherUserPopup(props) {
    const [userID, setUserID] = useState("")
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [major, setMajor] = useState("");
    const [competencies, setCompetencies] = useState([]);
    const [bio, setBio] = useState("");
    const [XP, setXP] = useState(0);
    const [level, setLevel] = useState(0)

    const [profilePictureURL, setProfilePictureURL] = useState("")
    const [profilePicture, setProfilePicture] = useState("")
    const [profileLikes, setProfileLikes] = useState([])
    const [likeMessage, setLikeMessage] = useState("")

    const {getDisplayPicture, displayMajor, user} = useAuth()

    React.useEffect(() => {
        if (props.data) {
            setUserID(props.data.otherUserID)
            setUsername(props.data.username)
            setEmail(props.data.email)
            setMajor(props.data.major)
            setCompetencies(props.data.competencies)
            setBio(props.data.bio)
            setXP(props.data.XP)
            setProfilePictureURL(props.data.profilePictureURL)
            getDisplayPicture(props.data.profilePictureURL).then((r) => {
                setProfilePicture(r)
            })
            calculateLevel()
        }
    }, [props.trigger])

    const calculateLevel = () => {
        setLevel(Math.floor(props.data.XP / 100))
    }

    const closePopup = () => {
        props.setTrigger(false)
        props.clearProfile()
    }

    const handleLike = async () => {
        const docRef = doc(db, "users", userID);
        await getDoc(docRef).then(async (doc) => {
            if (doc.exists()) {
                const profileLikes = doc.data().profileLikes
                const likeEntry = profileLikes.find((element) => element.userLikeID === user.uid)
                if (likeEntry) {
                    const timestamp = likeEntry.timestamp.toDate()
                    const diffMillis = Math.abs(Date.now() - timestamp);
                    const diffHours = Math.ceil(diffMillis / (1000 * 60 * 60));
                    if (diffHours > 24) {
                        await setDoc(docRef, {
                            profileLikes: arrayRemove(likeEntry),
                        }, {merge: true})
                        await setDoc(docRef, {
                            profileLikes: arrayUnion({
                                userLikeID: user.uid,
                                timestamp: Timestamp.now()
                            }),
                            XP: increment(10)
                        }, {merge: true})
                        setLikeMessage("You have liked this profile!")
                        setTimeout(() => {
                            setLikeMessage("")
                        }, 3000)
                    } else {
                        setLikeMessage("You have already liked this profile in the last 24 hours!")
                        setTimeout(() => {
                            setLikeMessage("")
                        }, 3000)
                    }
                }
                else {
                    await setDoc(docRef, {
                        profileLikes: arrayUnion({
                            userLikeID: user.uid,
                            timestamp: Timestamp.now()
                        }),
                        XP: increment(10)
                    }, {merge: true})
                    setLikeMessage("You have liked this profile!")
                    setTimeout(() => {
                        setLikeMessage("")
                    }, 3000)
                }
            }
        })
    }

    return (props.trigger) ? (
            <div className={styles.popup}>
                <div style={{width: "100vw", height: "100vh", position: "absolute"}} onClick={closePopup}></div>
                <div className={styles.popupInner}>
                    <div onClick={closePopup} className={styles.closeBtn}>
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
                                {(competencies.length > 0) ? (
                                    <p>{competencies.map((c) => {
                                        return c + " "
                                    })}</p>
                                ) : (
                                    <p>No competencies added :(</p>
                                )}
                            </div>
                            <br/>
                            <div className={styles.buttonLayout}>
                                <button className={styles.popupButtons}>Message</button>
                                <button onClick={handleLike}>Like</button>
                            </div>
                            {likeMessage && <span>{likeMessage}</span>}
                        </div>
                    </div>
                </div>
            </div>

        ) :
        "";

}

export default OtherUserPopup;