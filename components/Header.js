import Image from 'next/image'
import logoTypeText from '../public/images/logotype_text.png'

function Header(){
    return (


            <div className="layout-header">
                Logged in
                <Image src={logoTypeText} alt="logotype" height={50}/>
            </div>
    )
}

export default Header