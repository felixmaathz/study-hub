import Layout from '../components/LoggedInPage/Layout'
import StartLayout from '../components/Startpage/StartLayout'
import '../styles/layout.css'
import {useRouter} from "next/router";
import '../styles/start-layout.scss';
import {UserAuthContextProvider} from "../components/Context/userAuthContext";
import ProtectedRoute from "../components/ProtectedRoute";
import "../styles/chatpage.scss"

export default function MyApp({Component, pageProps}) {


    //Return different layouts depending on the if you're logged in or not
    const router = useRouter();

    const noAuthRequired = ["/"]

    //If you're not logged in, return the startpage layout
    if (router.pathname === "/") {
        return (
            <UserAuthContextProvider>
                <StartLayout>
                    <Component {...pageProps} />
                </StartLayout>
            </UserAuthContextProvider>
        )
    }
    //If you're logged in, return the normal layout
    return (
        <>
            <UserAuthContextProvider>
                <Layout>
                    {noAuthRequired.includes(router.pathname) ? (
                        <Component {...pageProps} />
                    ) : (
                        <ProtectedRoute>
                            <Component {...pageProps} />
                        </ProtectedRoute>
                    )
                    }
                </Layout>
            </UserAuthContextProvider>
        </>
    )
}
