import Image from 'next/image'
import React, {useState} from "react";
import Login from "./Login";
import Signup from "./Signup";

function mainPic() {
    const [logButtonPopup, setLogButtonPopup] = useState(false);
    const [signButtonPopup, setSignButtonPopup] = useState(false);


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
                     alt="logotype"
                   className={'start-map'} />


            <Login trigger={logButtonPopup} setTrigger = {setLogButtonPopup} />

            <Signup trigger={signButtonPopup} setTrigger = {setSignButtonPopup} />

        </div>

    );
}

export default mainPic