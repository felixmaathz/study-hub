import Image from 'next/image'
import React, {useState} from "react";
import LogInPopUp from "./LogInPopUp";
import SignUpPopUp from "./SignUpPopUp";
import SignUpPopUpTwo from "./SignUpPopUpTwo";

function mainPic() {
    const [logButtonPopup, setLogButtonPopup] = useState(false);
    const [signButtonPopup, setSignButtonPopup] = useState(false);
    const [signTwoButtonPopup, setSignTwoButtonPopup] = useState(false);

    const triggerPopup = () => {
        setSignTwoButtonPopup(true);
        setSignButtonPopup(false);
    }

    return (


        <div className='start-map-container'>
            <div className='transparent-info-container'>

                <div className="welcome-text">
                    <h1>Find experts in your area!</h1>

                    <div>

                        Hello and welcome to StudyHub!
                        The ultimate social media platform for students.
                        Connect with your fellow classmates through our interactive map interface
                        and learn by both teaching and receiving help.

                    </div>

                </div>

                <div className='buttons-position'>
                    <button className='button-login' onClick={() => setLogButtonPopup(true)}>Log in</button>
                    <br/>
                    <button className='button-signup' onClick={() => setSignButtonPopup(true)}>Sign up</button>
                </div>
            </div>

            <Image src={'/images/startpicture.png'}
                   layout="fill"
                   className={'start-map'} />


            <LogInPopUp trigger={logButtonPopup} setTrigger = {setLogButtonPopup} />

            <SignUpPopUp trigger={signButtonPopup} setTrigger = {setSignButtonPopup}
                         onSubmit={triggerPopup}>
            </SignUpPopUp>

            <SignUpPopUpTwo trigger={signTwoButtonPopup} setTrigger = {setSignTwoButtonPopup}/>
        </div>

    );
}

export default mainPic