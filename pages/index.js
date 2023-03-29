import {useState} from "react";
import LogInPopUp from "../components/LogInPopUp";
import SignUpPopUp from "../components/SignUpPopUp";
import SignUpPopUpTwo from "../components/SignUpPopUpTwo";


import styles from "../styles/popup.module.css"

//Utloggad startsida

export default function Home() {
    const [logButtonPopup, setLogButtonPopup] = useState(false);
    const [signButtonPopup, setSignButtonPopup] = useState(false);
    const [signTwoButtonPopup, setSignTwoButtonPopup] = useState(false);

    return(
        <div>
        <main>
        <h1>Welcome to StudyHub</h1>
            <br/>
            <button onClick={() => setLogButtonPopup(true)}>Log in</button>
            <br/>
            <button onClick={() => setSignButtonPopup(true)}>Sign up</button>
        </main>

            <LogInPopUp trigger={logButtonPopup} setTrigger = {setLogButtonPopup} >
                <div className={styles.container}>
                    <h3>Fill in your information to log in</h3>
                <form>
                    <label>
                        Username:
                        <input type="text" name="name" />
                    </label>
                    <br/>
                    <label>
                        Password:
                        <input type="password" name="password" />
                    </label>
                    <button type="submit">Log in</button>
                </form>
                </div>

            </LogInPopUp>

            <SignUpPopUp trigger={signButtonPopup} setTrigger = {setSignButtonPopup}>
                <div className={styles.container}>
                    <h3>Fill in your information sign up</h3>
                <form>
                    <label>
                        E-mail:
                        <input type="text" name="email" />
                    </label>
                    <br/>
                    <label>
                        Username:
                        <input type="text" name="password" />
                    </label>
                    <br/>
                    <label>
                        Password
                        <input type="password" name="password" />
                    </label>
                    <br/>
                    <label>
                        Repeat password:
                        <input type="password" name="password" />
                    </label>
                    <button onClick={() => {setSignTwoButtonPopup(true); setSignButtonPopup(false)}}>Continue</button>
                </form>
                </div>
            </SignUpPopUp>

            <SignUpPopUpTwo trigger={signTwoButtonPopup} setTrigger = {setSignTwoButtonPopup}>
                <div className={styles.container}>
                    <h3>Choose competences and profile picture</h3>
                <form>
                    <label>
                        Upload profile picture:
                        <input type ="file" name="profilepic" accept="image/*"/>
                    </label>
                    <br/>
                        <label>
                            Choose your civil engineering competence:
                            <select name="Competences" id="competence">
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
                            </select>
                        </label>

                </form>
                </div>
            </SignUpPopUpTwo>
        </div>
    )
}



