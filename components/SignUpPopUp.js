import React from 'react'
import styles from '../styles/popup.module.css'



function SignUpPopUp(props) {
    return (props.trigger) ? (
        <div className={styles.popup}>
            <div className={styles.popupInner}>
                <button className={styles.closeBtn} onClick = {() => props.setTrigger(false)}
                >X</button>


                <div className={styles.container}>
                    <h3>Fill in your information sign up</h3>
                    <form>
                        <label>
                            E-mail:
                            <input type="text" name="email" />
                        </label>
                        <br/>
                        <label>
                            Username:
                            <input type="text" name="password" />
                        </label>
                        <br/>
                        <label>
                            Password
                            <input type="password" name="password" />
                        </label>
                        <br/>
                        <label>
                            Repeat password:
                            <input type="password" name="password" />
                        </label>
                        {props.children}
                    </form>
                </div>

            </div>
        </div>

    ):"";
}

export default SignUpPopUp