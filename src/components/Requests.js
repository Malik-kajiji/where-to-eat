import React from 'react'
import { BsCheckLg } from 'react-icons/bs';
import { TbLetterX } from 'react-icons/tb';

const Requests = () => {
    return (
      <>
        <div className="blur-background"></div>
        <div className="request-bar">
          <p className="username">Username</p>
          <p className='accept'><BsCheckLg /></p>
          <p className='decline'><TbLetterX /></p>
        </div>
        <div className="close-button">
          <p className="close-text">Close</p>
        </div>
      </>
    )
}

export default Requests