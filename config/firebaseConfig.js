import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCcVagUvzHRSU0RJfMUNENcku8FCLJJcPE",
    authDomain: "study-hub-b8474.firebaseapp.com",
    projectId: "study-hub-b8474",
    storageBucket: "study-hub-b8474.appspot.com",
    messagingSenderId: "421055091809",
    appId: "1:421055091809:web:81d6f73f16c5cd25330620"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)

export { app, db, auth };