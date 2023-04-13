import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import {Navbar} from './Navbar';

export default function Layout({ children, home}){
    return(
        <div>
            <Head>
                <title>StudyHub</title>
            </Head>
            <Navbar/>
            <div>
                <main>
                    {children}
                </main>
            </div>
            <Footer/>
        </div>
    )

}