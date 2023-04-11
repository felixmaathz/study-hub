import React, {useState} from 'react'
import styles from '../../styles/popup.module.css'
import {useRouter} from "next/router";
import {app, db} from 'config/firebaseConfig'
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import {collection, addDoc} from "firebase/firestore";
import Link from "next/link";


function SignUpPopUp(props) {

    const [createEmail, setCreateEmail] = useState("")
    const [createPassword, setCreatePassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [createUsername, setCreateUsername] = useState("")
    const [createRepeatPassword, setCreateRepeatPassword] = useState("")

    const router = useRouter();

    const handleSignUp = async (event) => {
        event.preventDefault();

        try {
            const auth = getAuth(app);
            // await createUserWithEmailAndPassword(auth, createEmail, createPassword);
            alert("sign up successful")

            try {
                // const docRef = await addDoc(collection(db, "users"), {
                //     username: createUsername,
                //     email: createEmail,
                //     password: createPassword,
                // });
                // console.log("Document written with ID: ", docRef.id);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onSubmit()
    }

    return (props.trigger) ? (
        <div className={styles.popup}>
            <div className={styles.popupInner}>
                <button className={styles.closeBtn} onClick={() => props.setTrigger(false)}
                >X
                </button>


                <div className={styles.container}>
                    <h3>Fill in your information sign up</h3>
                    <form onSubmit={handleSignUp}>
                        <label>
                            E-mail:
                            <input className={styles.inputFields}
                                   type="email"
                                   name="email"
                                   value={createEmail}
                                   onChange={(event) => setCreateEmail(event.target.value)}
                                   required/>
                        </label>
                        <br/>
                        <label>
                            Username:
                            <input className={styles.inputFields}
                                   type="text"
                                   name="username"
                                   value={createUsername}
                                   onChange={(event) => setCreateUsername(event.target.value)}
                                   required
                            />
                        </label>
                        <br/>
                        <label>
                            Password
                            <input className={styles.inputFields}
                                   type="password"
                                   name="password"
                                   value={createPassword}
                                   onChange={(event) => setCreatePassword(event.target.value)}/>
                        </label>
                        <br/>
                        <label>
                            Repeat password:
                            <input className={styles.inputFields}
                                   type="password"
                                   name="repeatPassword"
                                   value={createRepeatPassword}
                                   onChange={(event) => setCreateRepeatPassword(event.target.value)}/>
                        </label>
                        {errorMessage && <p>{errorMessage}</p>}
                        <br/>
                        <input className={styles.submitButton} type="submit" value="Submit" onClick={handleSubmit}/>
                    </form>
                </div>

            </div>
        </div>

    ) : "";
}

export default SignUpPopUp