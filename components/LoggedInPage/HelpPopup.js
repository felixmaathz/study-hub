import React from 'react'
import styles from '../../styles/popup.module.css'



function HelpPopup(props){
    return (props.trigger) ? (
        <div className={styles.popup}>
            <div className={styles.popupInner}>
                <button className={styles.closeBtn} onClick = {() => props.setTrigger(false)}>
                    <span className="material-symbols-outlined">
                            close
                        </span>
                </button>

                <div className={styles.textContainer}>
                    <h2>What is this sorcery?</h2>
                    <p style={{color: "#d9d9d9", lineHeight: "1.5em"}}>Tricky interface? I doubt it, I bet you clicked here just for the hell of it. But if you&apos;re seriously in need of help in order to proceed;
                        put down your pin anywhere on the map, however, preferably where you are located. Save the pin using the big red button.
                        Now you can speak to the other students by clicking their profile pins on the map.
                    <br/><br/>
                        StudyHub team
                    </p>
                </div>
            </div>
        </div>

    ):"";
}

export default HelpPopup