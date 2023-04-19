import logoType from "../../public/images/logotype.png";
import Image from "next/image";

function Footer(){
    return (
        <div className="layout-footer">
            <Image src={logoType} alt="logotype" height={30}/>
            <div className = "footer-items">
                Contact us at felixmaathz@gmail.com
            </div>
        </div>
    )
}

export default Footer