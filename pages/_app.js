import Layout from '../components/Layout'
import StartLayout from '../components/Startpage/StartLayout'
import '../styles/layout.css'
import { useRouter } from "next/router";


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
            <Layout>
                <Component {...pageProps} />
            </Layout>

        </>
    )
}