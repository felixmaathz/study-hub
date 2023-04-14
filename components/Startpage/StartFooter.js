import logoType from "public/images/logotype.png";
import Image from "next/image";

function StartFooter(){
    return (
        <div className="start-layout-footer" >
                <div className="start-layout-footer-container-book-logo">
                    <Image src={logoType}
                           layout="fill"
                           className={'book-logo'}/>
                </div>

                <div>
                    Contact us at study-hub@team.net
                </div>
        </div>
    )
}

export default StartFooter