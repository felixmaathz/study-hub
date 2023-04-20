import React, {useRef, useState} from 'react'
import styles from '../../styles/popup.module.css'
import Image from "next/image";
import AddImage from "../../public/images/addImage.png";
import {db, storage} from "../../config/firebaseConfig";
import {ref, uploadBytes} from "firebase/storage";
import {useAuth} from "../Context/userAuthContext";
import {doc, updateDoc} from "firebase/firestore";



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
    const [profilePicture, setProfilePicture] = useState(null)
    const [profilePictureURL, setProfilePictureURL] = useState("")

    const {user} = useAuth()

    React.useEffect(() => {
        if (props.data) {
            console.log(props.data)
            setUsername(props.data.username)
            setEmail(props.data.email)
            setMajor(props.data.major)
            setCompetencies(props.data.competencies)
            setProfilePictureURL(props.data.profilePictureURL)
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
        props.saveProfile(username, email, major, competencies, profilePictureURL)
    }

    const handleCancel = () => {
        props.setEditTrigger(false)
    }

    const uploadImage = () => {
        if(profilePicture===null) return;
        if(profilePicture.size > 2097152) {
            alert('File size is too big!');
            return;
        }
        setProfilePictureURL("profilePictures/" + user.uid)
        const storageRef = ref(storage, "profilePictures/" + user.uid);
        uploadBytes(storageRef, profilePicture).then((snapshot) => {
            alert('Uploaded image!');
            associateUser().then(r => {
                console.log("Associated user with image! " +user.uid);
            })
        })
    }

    const associateUser = async () => {
        const docRef = await updateDoc(doc(db, "users", user.uid), {
            profilePictureURL: "profilePictures/" + user.uid
        })
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
                            <input
                                type="file"
                                onChange={(e) => {setProfilePicture(e.target.files[0])}}
                                accept="image/jpeg, image/png"
                            />
                            <button onClick={uploadImage}>Upload</button>
                            <br/>
                            <button onClick={handleSave} className={styles.popupButtons}>Save profile</button>
                            <button onClick={handleCancel} className={styles.popupButtons}> Cancel </button>
                        </div>
                        <div className={styles.competencies}>

                            <div className={styles.labelContainer}>
                                <label className={styles.label}>Add competence:
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
                            {competencies.length > 0 ? (
                            <p>Click to remove competence!</p>
                                ) : ""}
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