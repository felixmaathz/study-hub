import Layout from '../components/LoggedInPage/Layout'
import StartLayout from '../components/Startpage/StartLayout'
import '../styles/layout.css'
import {useRouter} from "next/router";
import '../styles/start-layout.css';
import ProtectedRoute from "../hooks/ProtectedRoute";
import '../styles/chatpage.scss'
export default function MyApp({Component, pageProps}) {


    //Return different layouts depending on the if you're logged in or not
    const router = useRouter();

    //If you're not logged in, return the startpage layout
    if (router.pathname === "/") {
        return (
            <StartLayout>
                <Component {...pageProps} />
            </StartLayout>
        )
    }
    //If you're logged in, return the normal layout
    return (
        <>
            <Component {...pageProps} />
        </>
    )
}
