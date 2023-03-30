import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children, home}){
    return(
        <div>
            <Head>
                <title>StudyHub</title>
                <link rel="icon" href="/images/favicon.png" />
            </Head>
            <Header/>
            <main>
                {children}
            </main>
            <Footer/>
        </div>
    )

}