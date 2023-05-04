import styles from "../../styles/popup.module.css";
import React, {useEffect, useRef, useState} from "react";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../../config/firebaseConfig";


export default function NotificationPopup(props) {

    const [usernames, setUsernames] = useState([])


    const dayList = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    useEffect(() => {
        if (props.notificationTrigger) {
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

    const closePopup = () => {
        setUsernames([])
        props.setNotificationTrigger(false)
    }


    return (props.notificationTrigger) ? (
        <>
            <div style={{width: "100vw", height: "100vh", position: "absolute"}}
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
                        <div className={styles.notificationText}>
                            <p>{user.username} has liked your profile!</p>
                            {((Date.now() - user.time.getTime()) < 604800000) ? (
                                <p>{dayList[user.time.getDay() - 1].substring(0, 3)}{user.time.toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}</p>
                            ) : (
                                <p>{user.time.toLocaleDateString() + " "}{user.time.toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}</p>
                            )
                            }

                        </div>
                    ))}
                </div>


            </div>
        </>
    ) : "";

}