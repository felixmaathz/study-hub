import styles from "../../styles/popup.module.css";
import React, {useEffect, useRef, useState} from "react";
import {collection, doc, getDoc, query, updateDoc, where} from "firebase/firestore";
import {db} from "../../config/firebaseConfig";
import {useAuth} from "../Context/userAuthContext";


export default function NotificationPopup(props) {

    const [usernames, setUsernames] = useState([])
    const {user} = useAuth()


    const dayList = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    useEffect(() => {
        if (props.notificationTrigger) {
            props.handleNotification(false)
            const fetchUsernames = async () => {
                props.data.profileLikes.map(async (like) => {
                    try {
                        await getDoc(doc(db, "users", like.userLikeID)).then(
                            (doc) => {
                                setUsernames((usernames) => [...usernames, {
                                    username: doc.data().username,
                                    time: like.timestamp.toDate()
                                }])
                            }
                        )
                    } catch (e) {
                        console.log(e)
                    }
                })
            }
            fetchUsernames()
        }
    }, [props.notificationTrigger])

    const closePopup = async () => {
        setUsernames([])
        props.setNotificationTrigger(false)
        const userDoc = await getDoc(doc(db, "users", user.uid))
        const profileLikes = userDoc.data().profileLikes
        const updatedProfileLikes = profileLikes.map((like) => {
            if (!like.read) {
                return {...like, read: true}
            }
            return like
        })
        await updateDoc(doc(db, "users", user.uid), {
            profileLikes: updatedProfileLikes
        })
    }


    return (props.notificationTrigger) ? (
        <>
            <div style={{width: "100%", height: "100%", position: "absolute", top: "0", left: "0"}}
                 onClick={closePopup}></div>
            <div className={styles.notificationPopupInner}>
                <div onClick={() => props.setNotificationTrigger(false)} className={styles.closeBtn}>
                        <span
                            className="material-symbols-outlined">
                            close
                            </span>
                </div>
                <div className={styles.notificationScroll}>
                    {usernames.map((user) => (
                        <div className={styles.notificationContainer}>
                            <div className={styles.notificationMessage}>{user.username} has liked your profile!</div>
                            {((Date.now() - user.time.getTime()) < 604800000) ? (
                                <div
                                    className={styles.notificationTime}>{" " + dayList[user.time.getDay() - 1].substring(0, 3) + " "}{user.time.toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}</div>
                            ) : (
                                <div>{" " + user.time.toLocaleDateString() + " "}{user.time.toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}</div>
                            )
                            }
                        </div>
                    ))}
                </div>


            </div>
        </>
    ) : "";

}