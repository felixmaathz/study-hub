import React, {useState} from "react";
import LogInPopUp from "../components/LogInPopUp";
import SignUpPopUp from "../components/SignUpPopUp";
import SignUpPopUpTwo from "../components/SignUpPopUpTwo";

import styles from "../styles/index.module.css"




export default function Home() {
    const [logButtonPopup, setLogButtonPopup] = useState(false);
    const [signButtonPopup, setSignButtonPopup] = useState(false);
    const [signTwoButtonPopup, setSignTwoButtonPopup] = useState(false);

    return(
        <div>
            <main>
                <div className={styles.body}>
                <h1>Find Experts In Your Area</h1>
                <br/>
                <button onClick={() => setLogButtonPopup(true)}>Log in</button>
                <br/>
                <button onClick={() => setSignButtonPopup(true)}>Sign up</button>
                </div>
            </main>

            <LogInPopUp trigger={logButtonPopup} setTrigger = {setLogButtonPopup} />

            <SignUpPopUp trigger={signButtonPopup} setTrigger = {setSignButtonPopup}>
                <div>
                    <button onClick={() => {setSignTwoButtonPopup(true); setSignButtonPopup(false)}}>Continue</button>
                </div>
            </SignUpPopUp>

            <SignUpPopUpTwo trigger={signTwoButtonPopup} setTrigger = {setSignTwoButtonPopup}/>

        </div>
    )
}



