import {useAuth} from "./Context/userAuthContext";
import {useRouter} from "next/router";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../config/firebaseConfig";


const UnprotectedRoute = ({children}) => {

    const {user} = useAuth();
    const router = useRouter();

    onAuthStateChanged(auth, (user) => {
        if (user) {
            router.push("/MapPage")
        }
    })

    return (
        <>{!user ? children : null}</>
    )

}

export default UnprotectedRoute;