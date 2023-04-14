import styles from "../styles/loading.module.css"
import Image from "next/image";


export default function Loading() {
    return (
        <div className={styles.loading}>
            <div className={styles.loadingContainer}>
                <Image src="/images/loading.gif" alt="loading"
                width={200}
                height={200}/>
            </div>
        </div>
    )
}