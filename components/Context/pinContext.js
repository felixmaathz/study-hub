import {createContext, useContext, useEffect, useState} from "react";
import {collection, onSnapshot, query, where} from "firebase/firestore";
import {db} from "../../config/firebaseConfig";


const PinContext = createContext();

export const usePin = () => useContext(PinContext);

export const PinContextProvider = ({children}) => {

    const [userJoined, setUserJoined] = useState("");
    const [userLeft, setUserLeft] = useState("");

    useEffect(() => {
        const q = query(collection(db, "users"), where("location", "!=", []));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    // console.log("New pin: ", change.doc.data().username);
                    handleUserJoined(change.doc.data().username)
                }
                if (change.type === "removed") {
                    // console.log("Removed pin: ", change.doc.data().username);
                    handleUserLeft(change.doc.data().username)
                }
            });
        });
    },[])


    const handleUserJoined = (username) => {
        setUserJoined(username)
        setUserLeft(null)
    }

    const handleUserLeft = (username) => {
        setUserLeft(username)
        setUserJoined(null)
    }


    return (
        <PinContext.Provider value={{userJoined,userLeft}}>
            {children}
        </PinContext.Provider>
    )


}