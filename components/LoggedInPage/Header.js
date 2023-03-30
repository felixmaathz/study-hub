import Image from 'next/image'
import logoTypeText from '../../public/images/logotype_text.png'

function Header(){
    return (

        <>
            <div>
                <div className="layout-header">
                    Logged in
                    <Image src={logoTypeText} alt="logotype" height={50}/>
                    <div>
                        <button> Map </button>

                        <button> Chat </button>

                        <button> Help </button>

                        <div>
                            <button> Profile </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header