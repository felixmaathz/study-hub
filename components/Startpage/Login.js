import styles from "../../styles/popup.module.css"
import Image from 'next/image'
import React, {useState} from "react";
import {sendPasswordResetEmail} from "firebase/auth";
import {addDoc, collection} from "firebase/firestore";
import {app, auth, db} from "../../config/firebaseConfig";
import {useRouter} from "next/router";
import { useAuth } from "components/Context/userAuthContext.js"

export default function Login(props) {


    // const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("")

    const router = useRouter();
    const { user, logIn } = useAuth()

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            await logIn(email, password)
            await router.push("/MapPage");
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const resetPassword = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setSuccessMessage("Email sent to "+email)
                setTimeout(() => {
                    setSuccessMessage("")
                }, 6000)
            })
            .catch((error) => {
                setErrorMessage("Enter valid email adress")
                setTimeout(() => {
                    setErrorMessage("")
                }, 6000)


            });

    }

    const closePopup = () => {
        props.setTrigger(false)
        setEmail("")
        setPassword("")
        setErrorMessage("")
        setSuccessMessage("")
    }



    return (props.trigger) ? (
        <>
            <div className={styles.popup}>
                <div className={styles.popupInner}>
                    <button className={styles.closeBtn} onClick={closePopup}>
                        <span className="material-symbols-outlined">
                            close
                        </span>
                    </button>

                    <Image src="/images/favicon.png"
                           alt="icon"
                           width={60}
                           height={60}/>
                    <br/>
                    <br/>

                    <form onSubmit={handleLogin}>

                        <div className={styles.container} id="firstForm">
                            <div className={styles.heading1}>Log in</div>
                            <label className={styles.labelContainer}>
                                Email:
                                <br/>
                                <input className={styles.inputFields}
                                       type="email"
                                       name="name"
                                       value={email}
                                       onChange={(event) => setEmail(event.target.value)}
                                       required/>
                            </label>
                            <br/>
                            <label  className={styles.labelContainer}>
                                Password:
                                <br/>
                                <input className={styles.inputFields}

                                       type={showPassword? "text" : "password"}
                                       name="password"
                                       value={password}
                                       onChange={(event) => setPassword(event.target.value)}
                                       required
                                />
                                {!showPassword ?
                                    <p className={styles.fieldIcon}><span onClick={handleShowPassword} className="material-symbols-outlined">
                                        visibility
                                    </span></p>
                                    :
                                    <p className={styles.fieldIcon}><span onClick={handleShowPassword} className="material-symbols-outlined">
                                        visibility_off
                                    </span></p>
                                }
                            </label>
                            <p onClick={resetPassword} className={styles.resetPassword}>Reset password</p>
                            <br/>
                            {errorMessage && <span>{errorMessage}</span>}
                            {successMessage && <span>{successMessage}</span>}
                            <button type="submit" className={styles.popupButtons}>Log in</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    ) : "";
}
