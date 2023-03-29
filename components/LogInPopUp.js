import React from 'react'
import styles from '../styles/popup.module.css'



function LogInPopUp(props) {
    return (props.trigger) ? (
        <div className={styles.popup}>
            <div className={styles.popupInner}>
            <button className={styles.closeBtn} onClick = {() => props.setTrigger(false)}
            >X</button>
            {props.children}
            </div>
        </div>

    ):"";
}

export default LogInPopUp