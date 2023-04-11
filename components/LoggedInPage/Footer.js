import logoType from "../../public/images/logotype.png";
import Image from "next/image";

function Footer(){
    return (
        <div className="layout-footer">
            <Image src={logoType} alt="logotype" height={30}/>
            <div className = "footer-items">
                License & Agreements
            </div>
        </div>
    )
}

export default Footer