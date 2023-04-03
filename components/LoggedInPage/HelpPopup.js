import React from 'react'
import styles from '../../styles/popup.module.css'


function HelpPopup(props){
    return (props.trigger) ? (
        <div className={styles.popup}>
            <div className={styles.popupInner}>
                <button className={styles.closeBtn} onClick = {() => props.setTrigger(false)}>X</button>

                <div className={styles.container}>
                    <h3>We are certain you’re already familiar with this stuff. You type text and you receive text. Hopefully something useful.

                        Good luck!

                        // Fogen Industries Inc. and Co.
                    </h3>
                </div>
            </div>
        </div>

    ):"";
}

export default HelpPopup