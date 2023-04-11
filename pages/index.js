import React, {useState} from "react";
import LogInPopUp from "../components/Startpage/LogInPopUp";
import SignUpPopUp from "../components/Startpage/SignUpPopUp";
import SignUpPopUpTwo from "../components/Startpage/SignUpPopUpTwo";

import styles from "../styles/index.module.css"


export default function Home() {
    const [logButtonPopup, setLogButtonPopup] = useState(false);
    const [signButtonPopup, setSignButtonPopup] = useState(false);
    const [signTwoButtonPopup, setSignTwoButtonPopup] = useState(false);

    const triggerPopup = () => {
        setSignTwoButtonPopup(true);
        setSignButtonPopup(false);
    }

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

            <SignUpPopUp trigger={signButtonPopup} setTrigger = {setSignButtonPopup}
            onSubmit={triggerPopup}>
            </SignUpPopUp>

            <SignUpPopUpTwo trigger={signTwoButtonPopup} setTrigger = {setSignTwoButtonPopup}/>

        </div>
    )
}



