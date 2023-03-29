import Layout from '../components/Layout'
import '../styles/layout.css'
import { useRouter } from "next/router";


export default function MyApp({Component, pageProps}) {

    const router = useRouter();
    if (router.pathname === "/") {
        return <Component {...pageProps} />;
    }

    return (
        <>
            <Layout>
                <Component {...pageProps} />
            </Layout>

        </>
    )
}