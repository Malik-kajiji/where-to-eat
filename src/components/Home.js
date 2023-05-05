import React, { useEffect, useState } from 'react'
import '../styles/home.css'
import { AiOutlinePlusCircle } from 'react-icons/ai';
import Friends from './Friends';
import Requests from './Requests';
import AddFriend from './AddFriend';
import { auth,db} from '../config/firebaseConfig';
import { doc,getDoc,setDoc,onSnapshot } from 'firebase/firestore';
import { AlertData } from '../context/AlertContext';

const Home = () => {
    const { setAlertData } = AlertData();
    const [isRequestsShowen,setIsRequestsShowen] = useState(false);
    const [isAddShowen,setIsAddShowen] = useState(false);
    const [friends,setFriends] = useState([]);
    const [friendReq,setFriendReq] = useState([]);
    const [allUser,setAllUser] = useState([]);



    useEffect(()=>{
        const Ref = doc(db,'userData',auth.currentUser.uid);
        onSnapshot(Ref,(res)=>{
            setFriends(res.data().friends);
            setFriendReq(res.data().friendReq);
        })
        const Ref2 = doc(db,'allusers','usersData');
        onSnapshot(Ref2,(res)=>{
            setAllUser(res.data().Data)
        })
    },[])
    return (
        <>
            <p className="friends-list-title">Friends List</p>
            <div className="requests-button" onClick={()=>setIsRequestsShowen(true)}>
                <p className="requests-text">Requests</p>
                {friendReq.length > 0 &&
                    <p className="requests-number">{friendReq.length}</p>
                }
            </div>
            <div className="add-button" onClick={()=>setIsAddShowen(true)}>
                <p className="add-text">Add</p>
                <p className="add-icon"><AiOutlinePlusCircle /></p>
            </div>
            <div className="middle-divider"></div>
            <Friends friends={friends}/>
            {isRequestsShowen &&
                <Requests friendReq={friendReq} setIsRequestsShowen={setIsRequestsShowen} />
            }
            {isAddShowen &&
                <AddFriend setIsAddShowen={setIsAddShowen} allUser={allUser} friends={friends} />
            }
        </>
    )
}

export default Home