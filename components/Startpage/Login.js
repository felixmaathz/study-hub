import styles from "../../styles/popup.module.css"
import Image from 'next/image'
import React, {useState} from "react";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {addDoc, collection} from "firebase/firestore";
import {app, db} from "../../config/firebaseConfig";
import {useRouter} from "next/router";
import { useAuth } from "components/Context/userAuthContext.js"

export default function Login(props) {


    // const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

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




    return (props.trigger) ? (
        <>
            <div className={styles.popup}>
                <div className={styles.popupInner}>
                    <button className={styles.closeBtn} onClick={() => props.setTrigger(false)}/>

                    <Image src="/images/favicon.png"
                           alt="icon"
                           width={60}
                           height={60}/>
                    <br/>
                    <br/>

                    <form onSubmit={handleLogin}>

                        <div className={styles.container} id="firstForm">
                            <div className={styles.heading1}>Log in</div>
                            <label>
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
                            <label>
                                Password:
                                <br/>
                                <input className={styles.inputFields}
                                       type={showPassword? "text" : "password"}
                                       name="password"
                                       value={password}
                                       onChange={(event) => setPassword(event.target.value)}
                                       required/>
                                <Image src={showPassword?"/images/eyeClose.png":"/images/eyeOpen.png"} alt={"eyeClose"} height={20} width={25} onClick={handleShowPassword}></Image>

                            </label>
                            <br/>
                            {errorMessage && <p>{errorMessage}</p>}
                            <button type="submit" className={styles.popupButtons}>Log in</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    ) : "";
}
