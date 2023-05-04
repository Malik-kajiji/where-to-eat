import React from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai';

const Add = () => {
    return (
      <>
        <div className="background"></div>
        <input className="enter-username-input" placeholder="Enter Username"/>
        <div className="add-button">
          <p className='add-icon'><AiOutlinePlusCircle /></p>
        </div>
        <div className="close-button">
          <p className="close-text">Close</p>
        </div>    
      </>
    )
}

export default Add