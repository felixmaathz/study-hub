import React, {useRef, useState} from 'react'
import styles from '../../styles/popup.module.css'
import Image from "next/image";
import AddImage from "../../public/images/addImage.png";
import {db, storage} from "../../config/firebaseConfig";
import {ref, uploadBytes} from "firebase/storage";
import {useAuth} from "../Context/userAuthContext";
import {doc, updateDoc} from "firebase/firestore";


export function CompetencyList({competencies, onRemove}) {
    return (
        <div className={styles.showCompetencies}>
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
        </div>
    );
}

function EditProfilePopup(props) {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [major, setMajor] = useState("");
    const [competence, setCompetence] = useState("")
    const [competencies, setCompetencies] = useState([]);
    const [bio, setBio] = useState("");
    const [imagePreview, setImagePreview] = useState(null)
    const [profilePicture, setProfilePicture] = useState(null)
    const [profilePictureURL, setProfilePictureURL] = useState("")
    const {user, getDisplayPicture} = useAuth()

    React.useEffect(() => {
        if (props.data) {
            console.log("Edit profile popup triggered")
            setUsername(props.data.username)
            setEmail(props.data.email)
            setMajor(props.data.major)
            setCompetencies(props.data.competencies)
            setBio(props.data.bio)
            setProfilePictureURL(props.data.profilePictureURL)
            getDisplayPicture(props.data.profilePictureURL).then((r) => {
                setProfilePicture(r)
            })
        }
    }, [props.editTrigger])

    const addCompetence = () => {
        if (competence === "") return;
        setCompetencies([...competencies, "#" + competence + " "])
        setCompetence("")
    }

    const handleRemoveCompetency = (index) => {
        const newCompetencies = [...competencies];
        newCompetencies.splice(index, 1);
        setCompetencies(newCompetencies);
    };

    const handleSave = async () => {
        if( username === "" ||
            email === "" ||
            major === "" ){
            alert("Please fill in all fields")
            return;
        }
        if (imagePreview) {
            await uploadImage().then(() => {
                props.setEditTrigger(false)
                props.saveProfile(username, email, major, competencies, profilePictureURL, bio)
                setImagePreview(null)
                alert("Profile saved! New picture uploaded!")
            })
        } else {
            props.setEditTrigger(false)
            props.saveProfile(username, email, major, competencies, profilePictureURL, bio)
            alert("Profile saved!")
        }
    }


    const handleCancel = () => {
        setImagePreview(null)
        props.setEditTrigger(false)
    }


    const uploadImage = async () => {
        if (profilePicture === null) return;
        if (profilePicture.size > 2097152) {
            alert('File size is too big!');
            return;
        }
        console.log(profilePictureURL)
        console.log("profilePictures/" + user.uid)
        const storageRef = ref(storage, "profilePictures/" + user.uid);
        await uploadBytes(storageRef, profilePicture).then(() => {
            getDisplayPicture(profilePictureURL).then((r) => {
                setProfilePicture(r)
            })
        })
    }


    const previewImage = (event) => {
        setProfilePictureURL("profilePictures/" + user.uid)
        setProfilePicture(event.target.files[0])
        setImagePreview(URL.createObjectURL(event.target.files[0]))
    }

    return (props.editTrigger) ? (
            <div className={styles.editPopup}>
                <div className={styles.popupInner}>
                    <div className={styles.profileLayout}>
                        <div className={styles.userPictureContainer}>
                            <div className={styles.userProfilePicture}>
                                {
                                    imagePreview ? (
                                            <Image
                                                src={imagePreview}
                                                alt="user"
                                                fill="true"
                                                className={styles.profileFrame}
                                            />
                                        )
                                        : (
                                            <Image
                                                src={profilePicture}
                                                alt="user"
                                                fill="true"
                                                className={styles.profileFrame}
                                            />
                                        )
                                }
                                <div className={styles.level}>
                                    <h4>LVL 4</h4>
                                </div>
                                <input
                                    type="file"
                                    onChange={previewImage}
                                    accept="image/jpeg, image/png"
                                    style={{display: 'none'}}
                                    id="file"
                                />

                                <label htmlFor='file'>
                                    <div className={styles.changeProfilePicture}>
                                        <Image
                                            src={AddImage}
                                            alt='addImage'/>
                                    </div>
                                </label>
                            </div>
                            <div className={styles.container}>
                                <label className={styles.labelContainer}>Bio:
                                    <input
                                        type="text"
                                        value={bio}
                                        className={styles.inputFields}
                                        placeholder={"What's on your mind?"}
                                        onChange={event => setBio(event.target.value)}/>
                                </label>

                                <button onClick={handleSave} className={styles.popupButtons}>Save profile</button>

                                <button onClick={handleCancel} className={styles.popupButtons}> Cancel</button>
                            </div>
                        </div>

                        <div className={styles.userInfo}>
                            {/*<label className={styles.labelContainer}>Username:*/}
                            {/*    <input value={username} onChange={event => setUsername(event.target.value)}*/}
                            {/*           className={styles.inputFields}/>*/}
                            {/*</label>*/}
                            <h1>{username}</h1>
                            <br/>
                            {/*<input value={email} disabled className={styles.inputFields}/>*/}
                            <label className={styles.labelContainer}>Major:
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
                            </label>

                            <br/>
                            <div style={{position: "relative"}}>
                                <label className={styles.labelContainer}>Competence:
                                    <input type="text"
                                           className={styles.inputFields}
                                           placeholder={"Add competence..."}
                                           value={competence}
                                           onChange={(event) => {
                                               const newVal = event.target.value.replace(/\s/g, '')
                                               setCompetence(newVal)
                                           }
                                           }/>
                                    <button onClick={addCompetence}
                                            className={styles.addCompetenceButton}><span
                                        className="material-symbols-outlined"
                                        onClick={addCompetence}>
                                    add
                                </span>
                                    </button>
                                </label>
                            </div>
                            <div className={styles.competencies}>
                                <div>
                                    <CompetencyList competencies={competencies} onRemove={handleRemoveCompetency}/>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        ) :
        "";
}

export default EditProfilePopup