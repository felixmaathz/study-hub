import Image from 'next/image'
import logoTypeText from 'public/images/logotype_text.png'

function StartHeader(){
    return (


        <div className="layout-header">
            <Image src={logoTypeText} alt="logotype" height={50}/>
        </div>
    )
}

export default StartHeader