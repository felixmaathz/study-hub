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
                <div className="layout-header">

                        <div className="toolbar-logo">
                            <link rel="icon" href="/images/favicon.png" />
                            <Image src={logoTypeText} alt="logotype" height={50}/>
                        </div>

                        <div>
                            <Link href='/MapPage' passHref> <button className='header-buttons'> Map </button> </Link>
                            <Link href='/ChatPage' passHref><button className='header-buttons'> Chat </button> </Link>
                            <button className='header-buttons' onClick={() => setHelpButtonPopup(true)}> Help </button>
                        </div>

                        <button className='header-profile-button' onClick={() => setProfileButtonPopup(true)}> Profile </button>

                <ProfilePopup trigger={profileButtonPopup} setTrigger = {setProfileButtonPopup}/>
                <HelpPopup trigger={helpButtonPopup} setTrigger = {setHelpButtonPopup}/>
                </div>
        </>
            )
}

export default Header