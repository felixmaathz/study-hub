import {createContext, useContext, useEffect, useState} from 'react';
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,

} from "firebase/auth";
import {auth, db, storage} from "../../config/firebaseConfig";
import Loading from "../Loading";
import {collection, doc, getDoc, setDoc, query, where, getDocs, updateDoc, onSnapshot} from "firebase/firestore";
import {ref, getDownloadURL} from "firebase/storage";


const UserAuthContext = createContext();

export const useAuth = () => useContext(UserAuthContext);

export const UserAuthContextProvider = ({children}) => {


    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [messageNotification, setMessageNotification] = useState(false)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                getUserData(user.uid).then(r => {
                    setUser({
                        uid: user.uid,
                        email: r.email,
                        username: r.username,
                        major: r.major,
                        competencies: r.competencies,
                        bio: r.bio,
                        XP: r.XP,
                        profileLikes: r.profileLikes,
                        profilePictureURL: r.profilePictureURL,
                        location: r.location,
                    })
                    console.log(r)
                })
            } else {
                setUser(null);
            }
            setLoading(false);
        })
        return () => unsubscribe();
    }, [])

    useEffect(() => {

    },[user])



    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const logIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = async () => {
        console.log(user.uid)
        await updateDoc(doc(db, "users", user.uid), {
            location: [],
        }).then(async () => {
            await signOut(auth);
            setUser(null);
        })
    }

    const getUserData = async (uid) => {
        const docRef = doc(db, "users", uid);
        try {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return docSnap.data()
            } else {
                console.log("Document does not exist")
            }

        } catch (error) {
            console.log(error)
        }
    }


    const getDisplayPicture = async (path) => {
        if (path === undefined || path === "") {
            console.log("No profile picture found")
            return "/images/profile.png"
        }
        return getDownloadURL(ref(storage, path))
            .then((url) => {
                console.log("Profile picture found")
                return url
            })
            .catch((error) => {
                console.log(error)
            });
    }

    const getPins = async () => {
        const pins = []
        const docRef = await collection(db, "users")
        const q = await query(docRef, where("location", "!=", []))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (doc.id === user.uid) return
            pins.push({...doc.data(), uid: doc.id})
        })
        return pins
    }


    const displayMajor = (major) => {
        switch (major) {
            case "E":
                return "Electrical Engineering"
            case "ES":
                return "Energy Systems Engineering"
            case "I":
                return "Industrial Engineering and Management"
            case "IT":
                return "Computer and Information Engineering"
            case "K":
                return "Chemical Engineering"
            case "W":
                return "Environmental and Water Engineering"
            case "X":
                return "Molecular Biotechnology Engineering"
            case "STS":
                return "Sociotechnical Systems Engineering"
            case "F":
                return "Engineering Physics"
            case "Q":
                return "Materials Engineering"
            case "Other":
                return "Other"
        }
    }
    const checkMessages = async () => {
        let unread = false
        const docRef = doc(db, "userChats", user.uid);
        const unsubscribe = onSnapshot(docRef,(doc) => {
            Object.entries(doc.data()).forEach(([key, value]) => {
                if (value.read === false) {
                    console.log(value.read)
                    console.log("Unread message")
                    return unread = true
                }
            })
        })
        // let unread = false
        // const docRef = doc(db, "userChats", user.uid);
        // const docSnap = await getDoc(docRef);
        // if(!docSnap.exists()) return unread
        // const chats = docSnap.data()
        // Object.entries(chats).forEach(([key, value]) => {
        //     if (value.read === false) {
        //         console.log(value.read)
        //         unread = true
        //     }
        // })
        return unread
    }

    const clearMessageNotifications = async () => {
        const docRef = doc(db, "userChats", user.uid);
        const docSnap = await getDoc(docRef);
        const chats = docSnap.data()
        Object.entries(chats).forEach(([key, value]) => {
            if (value.read === false) {
                updateDoc(doc(db, "userChats", user.uid), {
                    [key]: {
                        ...value,
                        read: true,
                    }

                })

            }
        })

    }


    return (
        <UserAuthContext.Provider
            value={{
                user,
                signUp,
                logIn,
                logOut,
                getUserData,
                getPins,
                getDisplayPicture,
                displayMajor,
                checkMessages,
                clearMessageNotifications

            }}>
            {loading ? <Loading/> : children}
        </UserAuthContext.Provider>
    )
}