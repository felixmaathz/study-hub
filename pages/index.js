import {useState} from "react";
import LogInPopUp from "../components/LogInPopUp";
import SignUpPopUp from "../components/SignUpPopUp";

import SignStyles from '../styles/SignUpPopUp.module.css'
import LogStyles from '../styles/LogInPopUp.module.css'

//Utloggad startsida

export default function Home() {
    const [logButtonPopup, setLogButtonPopup] = useState(false);
    const [signButtonPopup, setSignButtonPopup] = useState(false);

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
                <div className={LogStyles.container}>
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
                <div className={SignStyles.container}>
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
                    <button type="submit">Log in</button>
                </form>
                </div>
            </SignUpPopUp>
        </div>
    )
}



