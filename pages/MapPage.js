import styles from "../styles/index.module.css"
import React, {useState} from "react";
import Header from "../components/LoggedInPage/Header";

export default function MapPage() {
    const [helpButtonPopup, setHelpButtonPopup] = useState(false);

    return(
        <div>
            <main>
                <div className={styles.body}>
                    <h1>Map Page</h1>
                    <br/>
                    <button onClick={() => setHelpButtonPopup(true)}>Help</button>
                </div>
            </main>
        </div>
    )
}