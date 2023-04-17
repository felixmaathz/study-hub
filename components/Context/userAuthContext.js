import {createContext, useContext, useEffect, useState} from 'react';
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import {auth, db} from "../../config/firebaseConfig";
import Loading from "../Loading";
import {doc, getDoc, setDoc} from "firebase/firestore";


const UserAuthContext = createContext();

export const useAuth = () => useContext(UserAuthContext);

export const UserAuthContextProvider = ({children}) => {


    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    console.log(user)
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
        createUserWithEmailAndPassword(auth, email, password).then(r => {
            console.log(r.user.uid)
        })
    }


    const logIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = async () => {
        setUser(null);
        await signOut(auth);
    }




    return (
        <UserAuthContext.Provider value={{user, signUp, logIn, logOut}}>
            {loading ? <Loading/> : children}
        </UserAuthContext.Provider>
    )
}