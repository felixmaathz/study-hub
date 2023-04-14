import React from 'react'
import styles from '../../styles/popup.module.css'
import Link from 'next/link';


function AboutUsPopUp(props) {

    return (props.trigger) ? (
        <div className={styles.popup}>
            <div className={styles.popupInner}>
                <button className={styles.closeBtn} onClick = {() => props.setTrigger(false)}
                >X</button>

                <div className={styles.container}>
                    <h3>
                        About the team
                    </h3>
                    <h4>
                       We are gangstaz, equipped with lethal programming skills.
                    </h4>
                </div>
            </div>
        </div>

    ):"";
}

export default AboutUsPopUp