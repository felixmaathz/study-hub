import React from 'react'
import styles from '../../styles/popup.module.css'

function ProfilePopup(props){
    return (props.trigger) ? (
        <div className={styles.popup}>
            <div className={styles.popupInner}>
                <button className={styles.closeBtn} onClick = {() => props.setTrigger(false)}>X</button>
                <div className={styles.container}>
                    <h3>Your Profile</h3>
                </div>
            </div>
        </div>

    ):"";
}

export default ProfilePopup