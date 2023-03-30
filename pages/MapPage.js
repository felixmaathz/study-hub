import styles from "../styles/index.module.css"
import React, {useState} from "react";
import Header from "../components/LoggedInPage/Header";
import ProfilePopup from "../components/LoggedInPage/ProfilePopup";

export default function MapPage() {

    return(
        <div>
            <main>
                <div className={styles.body}>
                    <h1>Map Page</h1>
                    <br/>
                </div>
            </main>
        </div>
    )
}