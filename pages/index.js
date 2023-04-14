import React, {useState} from "react";
import styles from "../styles/index.module.css"
import StartMain from "../components/Startpage/StartMain";
import SecondStartMain from "../components/Startpage/SecondStartMain";

export default function Home() {

    return(
        <div>
            <main>
                <StartMain/>
                <SecondStartMain/>
            </main>
        </div>
    )
}



