import React from 'react'
import '../styles/home.css'
import woodenBackground from '../wooden-bg.jpg';
import { MdOutlineLogout } from 'react-icons/md';
import { AiOutlinePlusCircle } from 'react-icons/ai';

const Home = () => {
    return (
        <>
            <div className="background">
                <img className='background-image' src={woodenBackground}/>
            </div>
            <p className="page-title">Where to Eat?</p>
            <div className="logout-button">
                <p className="username">Username</p>
                <p className="email">Example@email.com</p>
                <p className="logout-icon"><MdOutlineLogout /></p>
            </div>
            <div className="top-divider"></div>
            <p className="friends-list-title">Friends List</p>
            <div className="requests-button">
                <p className="requests-text">Requests</p>
                <div className="requests-circle">
                <p className="requests-number">1</p>
                </div>
            </div>
            <div className="add-button">
                <p className="add-text">Add</p>
                <p className="add-icon"><AiOutlinePlusCircle /></p>
            </div>
            <div className="middle-divider"></div>
        </>
    )
}

export default Home