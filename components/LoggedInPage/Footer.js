import logoType from "../../public/images/logotype.png";
import Image from "next/image";

function Footer(){
    return (
        <div className="layout-footer">
            <Image src={logoType} alt="logotype" height={30}/>
            <div className = "footer-items">
                Contact us at study-hub@team.net. v. 2.1.05
            </div>
        </div>
    )
}

export default Footer