import React from 'react'
import { Link } from 'react-router-dom'

const Friends = ({friends}) => {
    return (
      <article className='friends'>
        {friends.map((e,i)=>(
          <div className="friend-bar" key={i}>
            <p className="friend-username">{e.username}</p>
            <p className="friend-location">Lives at {e.location}</p>
            <Link to={`/chooes/${e.username}`}>
              <div className="pick-restaurant-button">
                <p className="pick-restaurant-text">pick a restaurant</p>
              </div>
            </Link>
          </div>
        ))
        }
      </article>
    )
}

export default Friends