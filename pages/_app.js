import Layout from '../components/Layout'
import '../styles/layout.css'

export default function MyApp({Component, pageProps}) {
    return (
        <>
            <Layout>
                <Component {...pageProps} />
            </Layout>

        </>
    )
}