import Image from 'next/image'
import logoTypeText from 'public/images/logotype_text.png'
import React from "react";


function StartHeader(){
    return (


        <div className="start-layout-header">
            <div className="start-layout-logo-container">
                <Image src={logoTypeText}
                       layout="fill"
                       alt="logotype"
                       className={'start-layout-logo'}
                />
            </div>
        </div>

    )
}

export default StartHeader