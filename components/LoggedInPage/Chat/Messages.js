import React from 'react';
import SingleMessage from './SingleMessage';
const Messages = () => {
    return (
        <div className='messages'>
            <SingleMessage />
            <SingleMessage />
            <SingleMessage />
            <SingleMessage />
            <SingleMessage />
        </div>
    );
};

export default Messages;