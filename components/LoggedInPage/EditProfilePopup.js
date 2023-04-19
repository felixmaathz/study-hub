import React, {useRef, useState} from 'react'
import styles from '../../styles/popup.module.css'


function CompetencyList({competencies, onRemove}) {
    return (
        <>
            {(competencies.length > 0) ? (
                competencies.map((competency, index) => (
                <p
                    key={index}
                    className={styles.competence}
                    onClick={() => onRemove(index)}>
                    {competency}
                </p>
                ))) : (
                    <h3>No competencies added :(</h3>
                )
            }
        </>
    );
}

function EditProfilePopup(props) {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [major, setMajor] = useState("");
    const [competence, setCompetence] = useState("")
    const [competencies, setCompetencies] = useState([]);

    React.useEffect(() => {
        if (props.data) {
            console.log(props.data)
            setUsername(props.data.username)
            setEmail(props.data.email)
            setMajor(props.data.major)
            setCompetencies(props.data.competencies)
        }
    }, [])

    const addCompetence = () => {
        setCompetencies([...competencies, "#" + competence + " "])
        setCompetence("")
    }


    const handleRemoveCompetency = (index) => {
        const newCompetencies = [...competencies];
        newCompetencies.splice(index, 1);
        setCompetencies(newCompetencies);
    };

    const handleSave = () => {
        props.setEditTrigger(false)
        props.saveProfile(username, email, major, competencies)
    }

    return (props.editTrigger) ? (
            <div className={styles.editPopup}>
                <div className={styles.popupInner}>
                    <div className={styles.layout}>


                        <div className={styles.container}>
                            <h3>Your Profile</h3>
                            <input value={username} onChange={event => setUsername(event.target.value)}
                                   className={styles.inputFields}/>
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
                        <div className={styles.competencies}>

                            <div className={styles.labelContainer}>
                                <label className={styles.label}>Competencies
                                    <input type="text" className={styles.inputFields} value={competence}
                                           onChange={(event) => {
                                               const newVal = event.target.value.replace(/\s/g, '')
                                               setCompetence(newVal)
                                           }
                                           }/>
                                </label>
                                <button onClick={addCompetence}><span className="material-symbols-outlined"
                                                                      onClick={addCompetence}>
                                    add
                                </span></button>
                            </div>

                            <p>Click to remove competence!</p>
                            <div className={styles.showCompetencies}>

                                <CompetencyList competencies={competencies} onRemove={handleRemoveCompetency}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        ) :
        "";
}

export default EditProfilePopup