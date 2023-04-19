import React from 'react'
import styles from '../../styles/popup.module.css'
import Link from 'next/link';


function AboutUsPopUp(props) {

    return (props.trigger) ? (
        <div className={styles.popup}>
            <div className={styles.popupInner}>
                <button className={styles.closeBtn} onClick = {() => props.setTrigger(false)}>X</button>

                <div className={styles.container}>
                    <h3>
                        yadayada
                    </h3>
                    <h4>
                       "I go sell coke to your ho, sorry if you didn't know. That your girl loves my blow, one hit... now the girl on the pole.
                        <br/>I love sellin' blow! I love sellin' blow! I love sellin' blow! I love sellin' blow!" - Complete Poems, Karin Boye
                    </h4>
                </div>
            </div>
        </div>

    ):"";
}

export default AboutUsPopUp