import React from 'react';
import { FiLogOut } from 'react-icons/fi';
import { auth } from '../config/firebaseConfig';
import { signOut } from 'firebase/auth';

const Header = () => {
    const handleClick = () => {
        signOut(auth);
    }
    return (
        <header className='main-header'>
            <h2 className='header-h2'>where to eat?</h2>
            <button className='header-btn' onClick={handleClick}>
                <p className='header-username'>{auth.currentUser.displayName}</p>
                <span className='header-email'>{auth.currentUser.email}</span>
                <span className='header-icon'>{FiLogOut({})}</span>
            </button>
        </header>
    )
}

export default Header