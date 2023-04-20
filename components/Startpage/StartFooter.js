import logoType from "public/images/logotype.png";
import Image from "next/image";

function StartFooter(){
    return (
        <div className="start-layout-footer" >
                <div className="start-layout-footer-container-book-logo">
                    <Image src={logoType}
                           layout="fill"
                            alt="logotype"
                           className={'book-logo'}/>
                </div>

                <div>
                    Contact us at study-hub@team.net. v. 2.1.05
                </div>
        </div>
    )
}

export default StartFooter