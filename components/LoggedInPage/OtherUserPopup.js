import React, {useRef, useState} from "react";
import styles from "../../styles/popup.module.css";
import {useAuth} from "../Context/userAuthContext";
import Image from "next/image";


function OtherUserPopup(props) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [major, setMajor] = useState("");
    const [competencies, setCompetencies] = useState([]);
    const [bio, setBio] = useState("");
    const [profilePictureURL, setProfilePictureURL] = useState("")
    const [profilePicture, setProfilePicture] = useState("")

    const {user, getUserData, getDisplayPicture, displayMajor} = useAuth()

    React.useEffect(() => {
        if (props.data) {
            setProfilePicture("/images/profile.png")
            setUsername(props.data.username)
            setEmail(props.data.email)
            setMajor(props.data.major)
            setCompetencies(props.data.competencies)
            setBio(props.data.bio)
            if (props.data.profilePictureURL === undefined || props.data.profilePictureURL === "") {
            } else {
                setProfilePictureURL(props.data.profilePictureURL)
                getDisplayPicture(props.data.profilePictureURL).then((r) =>
                    setProfilePicture(r))
            }
        }
    }, [props.data])

    const closePopup = () => {
        props.setTrigger(false)
    }

    return (props.trigger) ? (
            <div className={styles.popup}>
                <div style={{width:"100vw", height:"100vh", position:"absolute"}} onClick={closePopup}></div>
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
                                    <h4>LVL 4</h4>
                                </div>

                            </div>
                            <div className={styles.bio}>{(bio.length>0) ? ('"'+bio+'"')
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
                                    <button className={styles.popupButtons}>Message</button>
                                </div>
                            </div>
                    </div>
                </div>
            </div>

        ) :
        "";

}

export default OtherUserPopup;