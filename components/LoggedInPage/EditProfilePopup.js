import React, {useRef, useState} from 'react'
import styles from '../../styles/popup.module.css'


function EditProfilePopup(props) {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [major, setMajor] = useState("");

    React.useEffect(() => {
        if(props.data){
            console.log(props.data)
            setUsername(props.data.username)
            setEmail(props.data.email)
            setMajor(props.data.major)
        }
    },[])



    const handleSave = () => {
        props.setEditTrigger(false)
        props.saveProfile(username, email, major)
    }

    return (props.editTrigger) ? (
            <div className={styles.editPopup}>
                <div className={styles.popupInner}>
                    <button className={styles.closeBtn} onClick={() => props.setEditTrigger(false)}>X</button>
                    <div className={styles.container}>
                        <h3>Your Profile</h3>
                        <input value={username} onChange={event => setUsername(event.target.value)} className={styles.inputFields}/>
                        <br/>
                        <input value={email} disabled className={styles.inputFields}/>
                        <br/>
                        <select className={styles.inputFields}
                                name="major"
                                value={major}
                                onChange={(event) => setMajor(event.target.value)}
                                required>
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
                            <option value="Other">Other</option>
                        </select>
                        <br/>
                        <button onClick={handleSave}>Save profile</button>
                    </div>
                </div>
            </div>

        ) :
        "";
}

export default EditProfilePopup