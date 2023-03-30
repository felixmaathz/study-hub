import logoType from "../../public/images/logotype.png";
import Image from "next/image";

function Footer(){
    return (
        <div className="layout-footer">
            <Image src={logoType} alt="logotype" height={50}/>
        </div>
    )
}

export default Footer