import React from 'react'
import styles from '../../styles/popup.module.css'
import Link from 'next/link';


function AboutUsPopUp(props) {

    return (props.trigger) ? (
        <div className={styles.popup}>
            <div className={styles.popupInner}>
                <button className={styles.closeBtn} onClick = {() => props.setTrigger(false)}>
                    <span className="material-symbols-outlined">
                            close
                        </span>
                </button>

                <div className={styles.textContainer}>
                    <h2>
                        Hello there!
                    </h2>
                    <h3 style={{color: "#d9d9d9", lineHeight: "1.5em"}}>
                        Welcome to StudyHub!
                        We're a small team consisting of four students; Felix "the backend monster" Maathz, Gabriel "leaflet" Martens, Simon "chat chad" Olofsson and Hugo "CSS king" Asztély.
                        This web application was made as a project for one of our courses at Uppsala University, but we hope it doesn't stop as a school project, and that it actually becomes a
                        useful and maybe even fun tool for students in their studies.
                        <br/>
                        <br/>
                        We hope you enjoy our web application!
                        <br/>
                        <br/>
                         Studyhub team
                    </h3>
                </div>
            </div>
        </div>

    ):"";
}

export default AboutUsPopUp