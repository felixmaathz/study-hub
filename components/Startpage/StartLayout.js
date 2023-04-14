import Head from 'next/head';
import StartHeader from '../Startpage/StartHeader';
import StartFooter from '../Startpage/StartFooter';

export default function StartLayout({ children, home}){
    return(
        <div>
            <Head>
                <title>StudyHub</title>
                <link rel="icon" href="/images/favicon.png" />
            </Head>

            <StartHeader/>

            <main>
                {children}
            </main>

            <StartFooter/>
        </div>
    )

}