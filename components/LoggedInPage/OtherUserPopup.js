import React, {useRef, useState} from "react";
import styles from "../../styles/popup.module.css";


function OtherUserPopup(props) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [major, setMajor] = useState("");

    React.useEffect(() => {
        if(props.data){
            console.log(props.data)
            setUsername(props.data.username)
            setEmail(props.data.email)
            setMajor(props.data.major)
        }
    }, [props.data])

    const closePopup = () => {
        props.setTrigger(false)
        setUsername("")
        setEmail("")
        setMajor("")
    }

    return (props.trigger) ? (
            <div className={styles.popup}>
                <div className={styles.popupInner}>
                    <button className={styles.closeBtn} onClick={closePopup}>X</button>
                    <div className={styles.container}>
                        <h1>{username}</h1>
                        <h1>{email}</h1>
                        <h1>{major}</h1>
                        <br/>
                    </div>
                </div>
            </div>

        ) :
        "";

}

export default OtherUserPopup;