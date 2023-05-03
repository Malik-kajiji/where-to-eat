import React from 'react';
import { FiLogOut } from 'react-icons/fi';

const Header = () => {
    return (
        <header className='main-header'>
            <h2>where to eat?</h2>
            <button>
                <p className='username'>username</p>
                <span className='email'>example@email.com</span>
                <span className='icon'>{FiLogOut({})}</span>
            </button>
        </header>
    )
}

export default Header