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
            <div style = {{minHeight: '100vh'}}>
                <main>
                    {children}
                </main>
            </div>
            <Footer/>
        </div>
    )

}