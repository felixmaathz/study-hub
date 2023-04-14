import React from 'react';
import Image from 'next/image';
import AddImage from '../../../public/images/addImage.png';
const chatInputField = () => {
    return (
        <div className='chatInput'>
            <input type='text' placeholder='Type a message...' />
            <div className='send'>
                <input type='file' style={{display:'none'}} id='file' />
                <label htmlFor='file'>
                    <div className='chatImageStyle'>
                        <Image src={AddImage} alt='addImage' />
                    </div>
                </label>
                <button>Send</button>
            </div>
        </div>
    )
}

export default chatInputField;