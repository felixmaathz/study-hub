import React from 'react';
import Search from './Search';
import ChatList from './ChatList';
const Sidebar = () => {
    return (
        <div className='sidebar'>
            <Search />
            <ChatList />
        </div>
    )
}

export default Sidebar;