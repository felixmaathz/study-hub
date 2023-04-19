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
                        <h1>So what's the idea?</h1>
                        <h2>
                            A highway for knowledge distribution
                        </h2>

                        <div>
                            We're students, just like you. We've all endured long waiting times on stackoverflow,
                            sometimes you can't even fully confide in ChatGPT's ability to help you
                            (Try asking it about SQL queries, big lol). Our solution is a web application for a closely connected community of students.
                            It does its magic over the interface of a map, where you can see all other logged on students. It lets you interact,
                            so you can be there for each other, one as a student tutor, and the other as a helpee. The helpee then rates its tutor, kinda like uber.
                            If you have a great rating, people will want your help, and they'll even pay for it!
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