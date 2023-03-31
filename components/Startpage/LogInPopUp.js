import React from 'react'
import styles from '../../styles/popup.module.css'
import Link from 'next/link';

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
                            <input className={styles.inputFields} type="text" name="name" />
                        </label>
                        <br/>
                        <label>
                            Password:
                            <input className={styles.inputFields} type="password" name="password" />
                        </label>
                        <Link href="/MapPage">
                            <button type="submit"> Submit</button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>

    ):"";
}

export default LogInPopUp