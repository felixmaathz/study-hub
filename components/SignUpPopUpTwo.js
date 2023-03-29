import React from 'react'
import styles from '../styles/popup.module.css'



function SignUpPopUpTwo(props) {
    return (props.trigger) ? (
        <div className={styles.popup}>
            <div className={styles.popupInner}>
                <button className={styles.closeBtn} onClick = {() => props.setTrigger(false)}
                >X</button>
                <div className={styles.container}>
                    <h3>Choose competences and profile picture</h3>
                    <form>
                        <label>
                            Upload profile picture:
                            <input type ="file" name="profilepic" accept="image/*"/>
                        </label>
                        <br/>
                        <label>
                            Choose your civil engineering competence:
                            <select name="Competences" id="competence">
                                <option value="E">Electrical Engineering</option>
                                <option value="ES">Energy Systems Engineering</option>
                                <option value="I">Industrial Engineering and Management</option>
                                <option value="IT">Computer and Information Engineering</option>
                                <option value="K">Chemical Engineering</option>
                                <option value="W">Environmental and Water Engineering</option>
                                <option value="X">Molecular Biotechnology Engineering</option>
                                <option value="STS">Sociotechnical Systems Engineering</option>
                                <option value="F">Engineering Physics</option>
                                <option value="Q">Materials Engineering</option>
                            </select>
                        </label>

                    </form>
                </div>
            </div>
        </div>

    ):"";
}

export default SignUpPopUpTwo