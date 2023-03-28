import Head from 'next/head';

export default function Layout({ children, home}){
    return(
        <div>
            <Head>
                <title>StudyHub</title>
                <link rel="icon" href="/images/favicon.ico" />
            </Head>
            <main>
                {children}
            </main>
        </div>
    )

}