import styles from "../../styles/popup.module.css"
import Image from 'next/image'
import React, {useState} from "react";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {addDoc, collection} from "firebase/firestore";
import {app, db} from "../../config/firebaseConfig";
import {useRouter} from "next/router";

export default function Login(props) {


    // const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const router = useRouter();

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const auth = getAuth(app);
            await signInWithEmailAndPassword(auth, email, password);
            alert("login successful")
            await router.push("/MapPage");
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

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
                                       type="password"
                                       name="password"
                                       value={password}
                                       onChange={(event) => setPassword(event.target.value)}
                                       required/>
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
