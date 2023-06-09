import Image from 'next/image'
import React, {useState} from "react";
import Login from "./Login";
import Signup from "./Signup";
import AboutUsPopUp from "./AboutUsPopUp";

import logoType from "public/images/logotype.png";

function MainPic() {
    const [logButtonPopup, setLogButtonPopup] = useState(false);
    const [signButtonPopup, setSignButtonPopup] = useState(false);
        const [aboutUsPopUp, setAboutUsPopUp] = useState(false);

        const triggerPopup = () => {
            setAboutUsPopUp(true);
        }


    return (

    <div>
        <div className='start-map-container'>
            <div className='transparent-info-container'>
                <div className="welcome-text">
                    <h1>Find experts in your area!</h1>

                    <span className="welcome-text-light">

                        Hello and welcome to StudyHub!
                        The ultimate social media platform for students.
                        Connect with your fellow classmates through our interactive map interface
                        and learn by both teaching and receiving help.

                    </span>

                </div>

                <div className='buttons-position'>
                    <button className='button-login' onClick={() => setLogButtonPopup(true)}>LOG IN</button>
                    <br/>
                    <button className='button-signup' onClick={() => setSignButtonPopup(true)}>SIGN UP</button>
                </div>
            </div>

            <Image src={'/images/startpicturev2.png'}
                   layout="fill"
                     alt="logotype"
                   className={'start-map'} />


            <Login trigger={logButtonPopup} setTrigger = {setLogButtonPopup} />

            <Signup trigger={signButtonPopup} setTrigger = {setSignButtonPopup} />


        </div>


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
                        <h1>So what&apos;s the idea?</h1>
                        <h2>
                            A highway for knowledge distribution
                        </h2>

                        <div className="about-us-text">
                            We&apos;ve all endured long waiting times on stackoverflow,
                            our solution is a web application for a closely connected community of students.
                            It does its magic over the interface of a map, where you can see all other logged on students. It lets you interact,
                            so you can be there for each other, one as a student tutor, and the other as a helpee. If the tutoring
                            is satisfactory, the helpee may choose to commend his tutor, this improves the tutor&apos;s rating.
                        </div>

                        <div className='about-us-position'>
                            <button className='button-about-us' onClick={() => setAboutUsPopUp(true)}>ABOUT US</button>
                        </div>
                    </div>
                </div>
            </div>





            <AboutUsPopUp trigger={aboutUsPopUp} setTrigger = {setAboutUsPopUp} />

        </div>
    </div>

    );
}

export default MainPic