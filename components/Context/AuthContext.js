import React, {createContext, useEffect, useState} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import Loading from "../Loading";
import {app} from "../../config/firebaseConfig";

export const AuthContext = createContext;

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const auth = getAuth(app);
    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <Loading/>;
    }

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};