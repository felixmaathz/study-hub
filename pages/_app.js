import Layout from '../components/LoggedInPage/Layout'
import StartLayout from '../components/Startpage/StartLayout'
import '../styles/layout.scss'
import {useRouter} from "next/router";
import '../styles/start-layout.scss';
import {UserAuthContextProvider} from "../components/Context/userAuthContext";
import ProtectedRoute from "../components/ProtectedRoute";
import "../styles/chatpage.scss"
import {ChatContextProvider} from "../components/Context/chatContext";
import UnprotectedRoute from "../components/UnprotectedRoute";
import PageNotFound from "./PageNotFound";

export default function MyApp({Component, pageProps}) {


    //Return different layouts depending on the if you're logged in or not
    const router = useRouter();

    const pages = ["/", "/MapPage", "/ChatPage"]


    return (
        <>
            {router.pathname === "/" ? (
                <UserAuthContextProvider>
                    <ChatContextProvider>
                        <UnprotectedRoute>
                            <StartLayout>
                                <Component {...pageProps} />
                            </StartLayout>
                        </UnprotectedRoute>
                    </ChatContextProvider>
                </UserAuthContextProvider>
            ) : (
                <UserAuthContextProvider>
                    <ChatContextProvider>
                        {pages.includes(router.pathname) ? (
                        <Layout>
                                <ProtectedRoute>
                                    <Component {...pageProps} />
                                </ProtectedRoute>
                        </Layout>
                        ) : (
                            <PageNotFound/>
                        )}
                    </ChatContextProvider>
                </UserAuthContextProvider>

            )
            }
        </>
    )
}
