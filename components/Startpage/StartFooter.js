import logoType from "public/images/logotype.png";
import Image from "next/image";

function StartFooter(){
    return (
        <div className="start-layout-footer">
            <Image src={logoType} alt="logotype" height={50}/>
        </div>
    )
}

export default StartFooter