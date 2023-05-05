import Link from "next/link";


export default function PageNotFound() {

    return(
        <div>
            <main style={{display: 'flex', flexDirection: 'column',justifyContent:"center",alignItems: 'center'}}>
                <h1>404</h1>
                <h2>Page not found</h2>
                <Link
                href="/">
                    <>Go back to the startpage</>
                </Link>
            </main>
        </div>
    )
}