import Head from 'next/head';
import StartHeader from '../Startpage/StartHeader';
import StartFooter from '../Startpage/StartFooter';

export default function StartLayout({ children, home}){
    return(
        <div>
            <Head>
                <title>StudyHub</title>
                <link rel="icon" href="/images/favicon.png" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                <link href="https://fonts.googleapis.com/css2?family=Epilogue:wght@300;400;600;900&display=swap"
                      rel="stylesheet"/>
            </Head>

            <StartHeader/>

            <main>
                {children}
            </main>

            <StartFooter/>
        </div>
    )

}