import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import {Navbar} from './Navbar';

export default function Layout({ children, home}){
    return(
        <div>
            <Head>
                <title>StudyHub</title>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
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