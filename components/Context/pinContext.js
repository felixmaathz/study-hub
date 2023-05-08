import {createContext, useContext, useEffect, useState} from "react";
import {collection, getDocs, onSnapshot, query, where} from "firebase/firestore";
import {db} from "../../config/firebaseConfig";


const PinContext = createContext();

export const usePin = () => useContext(PinContext);

export const PinContextProvider = ({children}) => {

    const [pinChange, setPinChange] = useState("")

    useEffect(() => {
        const docRef = collection(db, "users");
        const q = query(docRef, where("location", "!=", "[]"));
        const unsub = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.data().username)
                setPinChange(doc.data().username)
            });
            setPinChange("")
        })
        return unsub()
    },[])



    return (
        <PinContext.Provider value={{pinChange}}>
            {children}
        </PinContext.Provider>
    )


}