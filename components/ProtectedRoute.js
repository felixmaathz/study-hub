import {useAuth} from "./Context/userAuthContext";
import {useRouter} from "next/router";
import {useEffect} from "react";
import Loading from "./Loading";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../config/firebaseConfig";


const ProtectedRoute = ({children}) => {

    const {user} = useAuth();
    const router = useRouter();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push("/");
            }
        })

    }, [])

    return (
        <>{user? children : null}</>
    )

}

export default ProtectedRoute;