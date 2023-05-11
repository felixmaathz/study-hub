import logoType from "public/images/favicon.png";
import Image from "next/image";

function StartFooter(){
    return (
        <div className="start-layout-footer" >

                    <Image src={logoType}
                           width={60}
                            height={60}
                            alt="logotype"
                           className={'book-logo'}/>


                <div>
                    Contact us at study-hub@team.net. v. 2.1.05
                </div>
        </div>
    )
}

export default StartFooter