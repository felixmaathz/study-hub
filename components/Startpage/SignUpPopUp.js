import React from 'react'
import styles from '../../styles/popup.module.css'



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
                            <input className={styles.inputFields} type="text" name="email" />
                        </label>
                        <br/>
                        <label>
                            Username:
                            <input className={styles.inputFields} type="text" name="password" />
                        </label>
                        <br/>
                        <label>
                            Password
                            <input className={styles.inputFields} type="password" name="password" />
                        </label>
                        <br/>
                        <label>
                            Repeat password:
                            <input className={styles.inputFields} type="password" name="password" />
                        </label>
                        {props.children}
                    </form>
                </div>

            </div>
        </div>

    ):"";
}

export default SignUpPopUp