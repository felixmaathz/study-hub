import Image from 'next/image'
import logoTypeText from '../../public/images/logotype_text.png'
import profilePicture from '../../public/images/profilbild.png'
import React, {useState} from "react";
import ProfilePopup from "./ProfilePopup";
import HelpPopup from "./HelpPopup";

function Header(){
    const [profileButtonPopup, setProfileButtonPopup] = useState(false);
    const [helpButtonPopup, setHelpButtonPopup] = useState(false);

    return (

        <>
            <div>
                <div className="layout-header">
                    Logged in
                    <Image src={logoTypeText} alt="logotype" height={50}/>
                    <div>
                        <button> Map </button>

                        <button> Chat </button>

                        <button onClick={() => setHelpButtonPopup(true)}> Help </button>

                        <div>
                            <button className='profile-picture-button' onClick={() => setProfileButtonPopup(true)}> Profile </button>
                        </div>
                    </div>
                </div>
                <ProfilePopup trigger={profileButtonPopup} setTrigger = {setProfileButtonPopup}/>
                <HelpPopup trigger={helpButtonPopup} setTrigger = {setHelpButtonPopup}/>
            </div>
        </>
    )
}

export default Header