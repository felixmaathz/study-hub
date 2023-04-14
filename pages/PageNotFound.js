import Link from "next/link";


export default function PageNotFound() {
    return (
        <div>
            <main>
                <div>
                    <h1>Access Denied</h1>
                    <p>You must be signed in to view this page</p>
                    <Link href="/">
                        Back to home
                    </Link>
                </div>
            </main>
        </div>
    )
}