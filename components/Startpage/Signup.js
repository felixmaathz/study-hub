import styles from "../../styles/popup.module.css"
import Image from 'next/image'
import React, {useState} from "react";
import {setDoc, doc, collection, query, where, getDoc, getDocs} from "firebase/firestore";
import {app, db} from "../../config/firebaseConfig";
import {useRouter} from "next/router";

import {useAuth} from "components/Context/userAuthContext.js"


export default function Signup(props) {


    const [createEmail, setCreateEmail] = useState("")
    const [createPassword, setCreatePassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [createUsername, setCreateUsername] = useState("")
    const [createRepeatPassword, setCreateRepeatPassword] = useState("")
    const [createMajor, setCreateMajor] = useState("")
    const [usernameAvailable, setUsernameAvailable] = useState(false)
    const [emailAvailable, setEmailAvailable] = useState(false)

    const router = useRouter();

    const {user, signUp, saveUserData} = useAuth()

    const handleSignUp = async (event) => {
        event.preventDefault();
        if (!(createUsername === ""
                || createEmail === ""
                || createPassword === ""
                || createRepeatPassword === ""
                || createMajor === ""
                || !usernameAvailable)
            && createPassword === createRepeatPassword) {
            try {
                await signUp(createEmail, createPassword).then(r => {
                    try {
                        console.log(r.user.uid)
                        setDoc(doc(db, "users", r.user.uid), {
                            username: createUsername,
                            email: createEmail,
                            major: createMajor,
                            bio: "",
                            competencies: [],
                            location: []
                        })
                        setDoc(doc(db, "userChats", r.user.uid), {}
                        ).then(r => {
                            console.log("success")
                            router.push("/MapPage")
                        })
                    } catch (e) {
                        console.error("Error adding document: ", e);
                    }
                })
                alert("sign up successful")

                // try {
                //     await setDoc(doc(db, "users", createdUser.uid), {
                //         username: createUsername,
                //         email: createEmail,
                //         major: createMajor,
                //         location: []
                //     }
                //     );
                // } catch (e) {
                //     console.error("Error adding document: ", e);
                // }
            } catch (error) {
                setErrorMessage(error.message);
            }

        } else {
            alert("Please fill in all fields and make sure your passwords match")
        }
    }

    const nextForm = () => {
        if (!(createUsername === ""
                || createEmail === ""
                || createPassword === ""
                || !emailAvailable
                || createRepeatPassword === ""
                || !usernameAvailable)
            && createPassword === createRepeatPassword) {
            const firstForm = document.getElementById("firstForm");
            firstForm.style.display = "none";
            const secondForm = document.getElementById("secondForm");
            secondForm.style.display = "flex";
        } else {
            alert("Please fill in all fields and make sure your passwords match")
        }
    }

    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const checkUsernameAvailability = async (e) => {
        setCreateUsername(e.target.value)
        if(e.target.value.length >= 4){
            const userRef = collection(db, "users");
            const q = query(userRef, where("username", "==", e.target.value));
            const querySnapshot = await getDocs(q);
            const userDoc = querySnapshot.docs[0];
            if (userDoc) {
                setUsernameAvailable(false)
            } else {
                setUsernameAvailable(true)
            }
        }else{
            setUsernameAvailable(false)
        }
    }

    const checkEmailAvailability = async (e) => {
        setCreateEmail(e.target.value)
        const userRef = collection(db, "users");
        const q = query(userRef, where("email", "==", e.target.value));
        const querySnapshot = await getDocs(q);
        const userDoc = querySnapshot.docs[0];
        if (userDoc) {
            setEmailAvailable(false)

        } else {
            setEmailAvailable(true)
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
                            <label className={styles.labelContainer}>
                                Username:
                                <br/>
                                <input className={styles.inputFields}
                                       type="text"
                                       name="name"
                                       value={createUsername}
                                       onChange={(e)=>checkUsernameAvailability(e)}
                                       required/>
                                {usernameAvailable ?
                                    <p className={styles.fieldIcon}><span className="material-symbols-outlined">
                                    done
                                    </span></p>
                                    :
                                    <p className={styles.fieldIcon}><span className="material-symbols-outlined">
                                        close
                                    </span></p>
                                }
                            </label>
                            <br/>
                            <label className={styles.labelContainer}>
                                Email:
                                <br/>
                                <input className={styles.inputFields}
                                       type="email"
                                       name="email"
                                       value={createEmail}
                                       onChange={(e)=>checkEmailAvailability(e)}
                                       required/>
                            </label>
                            <br/>
                            <label className={styles.labelContainer}>
                                Password:
                                <br/>
                                <input className={styles.inputFields}
                                       type={showPassword ? "text" : "password"}
                                       name="password"
                                       value={createPassword}
                                       onChange={(event) => setCreatePassword(event.target.value)}
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
                                    <option value="" selected disabled hidden></option>
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
