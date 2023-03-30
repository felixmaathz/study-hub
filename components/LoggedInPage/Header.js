import Image from 'next/image'
import logoTypeText from '../../public/images/logotype_text.png'
import React, {useState} from "react";
import ProfilePopup from "./ProfilePopup";
import HelpPopup from "./HelpPopup";
import Link from 'next/link';

function Header(){
    const [profileButtonPopup, setProfileButtonPopup] = useState(false);
    const [helpButtonPopup, setHelpButtonPopup] = useState(false);

    return (

        <>
            <div>
                <div className="layout-header">
                    <Image src={logoTypeText} alt="logotype" height={50}/>
                    <div className='header-buttons-position'>
                        <Link href='/MapPage' passHref> <button className='header-buttons'> Map </button> </Link>

                        <Link href='/ChatPage' passHref><button className='header-buttons'> Chat </button> </Link>

                        <button className='header-buttons' onClick={() => setHelpButtonPopup(true)}> Help </button>
                    </div>
                    <div>
                        <button className='header-profile-button' onClick={() => setProfileButtonPopup(true)}> Profile </button>
                    </div>
                </div>
                <ProfilePopup trigger={profileButtonPopup} setTrigger = {setProfileButtonPopup}/>
                <HelpPopup trigger={helpButtonPopup} setTrigger = {setHelpButtonPopup}/>
            </div>
        </>
    )
}

export default Header