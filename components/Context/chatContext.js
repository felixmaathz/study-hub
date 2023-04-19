import {createContext, useContext, useEffect, useState, useReducer} from 'react';
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import {auth, db} from "../../config/firebaseConfig";
import Loading from "../Loading";
import {collection, doc, getDoc, setDoc, query, where, getDocs} from "firebase/firestore";
import {useAuth} from "./userAuthContext";


const ChatContext = createContext();

export const useChatContext = () => useContext(ChatContext);


export const ChatContextProvider = ({children}) => {

    const {user}= useAuth();
    const [loading, setLoading] = useState(true);

    const INITIAL_STATE ={
        chadId:"null",
        user:{}
    }

    const chatReducer = (state, action) => {
        switch(action.type){
            case "CHANGE_USER":
                return{
                    user: action.payload,
                    chatId: user.uid > action.payload?.uid
                        ? user.uid + action.payload.uid
                        : action.payload?.uid + user.uid,
                };

            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

    return (
        <ChatContext.Provider value={{data:state, dispatch}}>
            {children}
        </ChatContext.Provider>
    )
}