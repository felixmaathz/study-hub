import Image from 'next/image'
import React, {useState} from "react";
import AboutUsPopUp from "./AboutUsPopUp";
import logoType from "public/images/logotype.png";

function infoMain() {
    const [aboutUsPopUp, setAboutUsPopUp] = useState(false);

    const triggerPopup = () => {
        setAboutUsPopUp(true);
    }

    return (


        <div className='info-main-container'>

            <div className='about-us-container'>

                <div className="pic-about-us-container" >
                    <div className="pic-about-us">
                        <Image src={logoType}
                               alt="logotype"
                               layout="fill"
                               className={'book-logo'}/>
                    </div>

                </div>

                <div className='text-about-us-container'>
                    <div>
                        <h1>Why do we even exist?</h1>
                        <h2>
                            Help others students and yadayada
                        </h2>

                        <div>
                            It all started back when Felix tried to get help with centering a div
                            on stackoverflow. It took him 6 days to get a reply, and it wasn't even correct.
                            That day he vowed that noone would ever have to endure the same painful experience,
                            and the idea of StudyHub formed. The solution is here.
                        </div>

                        <div className='about-us-position'>
                            <button className='button-signup' onClick={() => setAboutUsPopUp(true)}>About Us</button>
                        </div>
                    </div>
                </div>
            </div>





            <AboutUsPopUp trigger={aboutUsPopUp} setTrigger = {setAboutUsPopUp} />

        </div>

    );
}

export default infoMain