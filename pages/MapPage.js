import styles from "../styles/index.module.css"
import React, {useState} from "react";
import Link from 'next/link';
import Map from "../components/LoggedInPage/Map/map_ssr";

export default function MapPage() {

    return(
        <div>
            <main>
                <div>
                    <Map/>
                </div>
            </main>
        </div>
    )
}