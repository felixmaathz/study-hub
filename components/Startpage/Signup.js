import styles from "../../styles/popup.module.css"
import Image from 'next/image'
import React, {useState} from "react";
import {createUserWithEmailAndPassword, getAuth} from "firebase/auth";
import {setDoc, doc} from "firebase/firestore";
import {app, db} from "../../config/firebaseConfig";
import {useRouter} from "next/router";

export default function Signup(props) {


    const [createEmail, setCreateEmail] = useState("")
    const [createPassword, setCreatePassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [createUsername, setCreateUsername] = useState("")
    const [createRepeatPassword, setCreateRepeatPassword] = useState("")
    const [createMajor, setCreateMajor] = useState("")

    const router = useRouter();

    const handleSignUp = async (event) => {
        event.preventDefault();
        if (!(  createUsername === ""
                || createEmail === ""
                || createPassword === ""
                || createRepeatPassword === ""
                || createMajor === "")
            && createPassword === createRepeatPassword){
            try {
                const auth = getAuth(app);

                await createUserWithEmailAndPassword(auth, createEmail, createPassword);
                alert("sign up successful")

                try {
                    const uid = auth.currentUser.uid;
                    const docRef = await setDoc(doc(db, "users", uid), {
                        username: createUsername,
                        email: createEmail,
                        major: createMajor
                    })
                    await router.push("/MapPage")
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            } catch (error) {
                setErrorMessage(error.message);
            }
        }
    }

    const nextForm = () => {
        if (!(  createUsername === ""
                || createEmail === ""
                || createPassword === ""
                || createRepeatPassword === "")
                && createPassword === createRepeatPassword) {
            const firstForm = document.getElementById("firstForm");
            firstForm.style.display = "none";
            const secondForm = document.getElementById("secondForm");
            secondForm.style.display = "flex";
        } else {
            alert("Please fill in all fields and make sure your passwords match")
        }
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

                    <form onSubmit={handleSignUp}>

                        <div className={styles.container} id="firstForm">
                            <div className={styles.heading1}>Sign Up</div>
                            <label>
                                Username:
                                <br/>
                                <input className={styles.inputFields}
                                       type="text"
                                       name="name"
                                       value={createUsername}
                                       onChange={(event) => setCreateUsername(event.target.value)}
                                       required/>
                            </label>
                            <br/>
                            <label>
                                Email:
                                <br/>
                                <input className={styles.inputFields}
                                       type="email"
                                       name="email"
                                       value={createEmail}
                                       onChange={(event) => setCreateEmail(event.target.value)}
                                       required/>
                            </label>
                            <br/>
                            <label>
                                Password:
                                <br/>
                                <input className={styles.inputFields}
                                       type="password"
                                       name="password"
                                       value={createPassword}
                                       onChange={(event) => setCreatePassword(event.target.value)}
                                       required/>
                            </label>
                            <br/>
                            <label>
                                Confirm Password:
                                <br/>
                                <input className={styles.inputFields}
                                       type="password"
                                       name="repeatPassword"
                                       value={createRepeatPassword}
                                       onChange={(event) => setCreateRepeatPassword(event.target.value)}/>
                            </label>
                            <br/>
                            <button type="button" className={styles.popupButtons} onClick={nextForm}> Next</button>
                        </div>
                        <div className={styles.secondContainer} id="secondForm">
                            <label>
                                Choose your Major:
                                <br/>
                                <select className={styles.inputFields}
                                        name="major"
                                        value={createMajor}
                                        onChange={(event) => setCreateMajor(event.target.value)}
                                        required>
                                    <option value="E">Electrical Engineering</option>
                                    <option value="ES">Energy Systems Engineering</option>
                                    <option value="I">Industrial Engineering and Management</option>
                                    <option value="IT">Computer and Information Engineering</option>
                                    <option value="K">Chemical Engineering</option>
                                    <option value="W">Environmental and Water Engineering</option>
                                    <option value="X">Molecular Biotechnology Engineering</option>
                                    <option value="STS">Sociotechnical Systems Engineering</option>
                                    <option value="F">Engineering Physics</option>
                                    <option value="Q">Materials Engineering</option>
                                    <option value="Other">Other</option>
                                </select>
                            </label>
                            <br/>
                            {errorMessage && <p>{errorMessage}</p>}
                            <button type="submit" className={styles.popupButtons}>Sign Up</button>
                        </div>
                    </form>


                </div>
            </div>
        </>
    ) : "";
}