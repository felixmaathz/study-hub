import React from 'react'
import styles from '../styles/popup.module.css'




function LogInPopUp(props) {

    return (props.trigger) ? (
        <div className={styles.popup}>
            <div className={styles.popupInner}>
            <button className={styles.closeBtn} onClick = {() => props.setTrigger(false)}
            >X</button>

                <div className={styles.container}>
                    <h3>Fill in your information to log in</h3>
                    <form>
                        <label>
                            Username:
                            <input type="text" name="name" />
                        </label>
                        <br/>
                        <label>
                            Password:
                            <input type="password" name="password" />
                        </label>
                        <button type="submit">Log in</button>
                    </form>
                </div>
            </div>
        </div>

    ):"";
}

export default LogInPopUp