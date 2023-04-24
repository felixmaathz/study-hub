import {createContext, useContext, useEffect, useState} from 'react';
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import {auth, db, storage} from "../../config/firebaseConfig";
import Loading from "../Loading";
import {collection, doc, getDoc, setDoc, query, where, getDocs, updateDoc} from "firebase/firestore";
import {ref,getDownloadURL} from "firebase/storage";


const UserAuthContext = createContext();

export const useAuth = () => useContext(UserAuthContext);

export const UserAuthContextProvider = ({children}) => {


    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    uid: user.uid,
                });
            } else {
                setUser(null);
            }
            setLoading(false);
        })
        return () => unsubscribe();
    }, [])

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
         return getDownloadURL(ref(storage, path))
            .then((url) => {
               return url
            })
            .catch((error) => {

            });
    }

    const getPins = async () => {
        const pins = []
        const docRef = await collection(db, "users")
        const q = await query(docRef, where("location", "!=", []))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            pins.push(doc.data())
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




    return (
        <UserAuthContext.Provider value={{user, signUp, logIn, logOut, getUserData, getPins, getDisplayPicture, displayMajor}}>
            {loading ? <Loading/> : children}
        </UserAuthContext.Provider>
    )
}