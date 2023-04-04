import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children, home}){
    return(
        <div>
            <Head>
                <title>StudyHub</title>
            </Head>
            <Header/>
            <main>
                {children}
            </main>

            <Footer/>
        </div>
    )

}