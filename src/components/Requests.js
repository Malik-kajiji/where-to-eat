import React from 'react'
import { BsCheckLg } from 'react-icons/bs';
import { TbLetterX } from 'react-icons/tb';
import '../styles/requests.css';
import { auth,db } from '../config/firebaseConfig';
import { doc,getDoc,setDoc } from 'firebase/firestore';
import { AlertData } from '../context/AlertContext';

const Requests = ({setIsRequestsShowen,friendReq}) => {
  const { setAlertData } = AlertData();

  function handleAdd(uid,username,location){
    const friendRef = doc(db,'userData',uid);
    getDoc(friendRef)
    .then((res)=>{
        const Data = res.data();
        let newData = {...Data,friends:[...Data.friends,{username:auth.currentUser.displayName,uid:auth.currentUser.uid,location:location}]}
        setDoc(friendRef,newData)
        .then(()=>{
            setAlertData({type:'success',msg:'friend added successfully',showen:true});
        })
    })
    .catch((err)=>{
        setAlertData({type:'error',msg:err.message,showen:true});
    })

    const userRef = doc(db,'userData',auth.currentUser.uid);
    getDoc(userRef)
    .then((res)=>{
        const Data = res.data();
        let newFriendReq = friendReq.filter((e)=> e.username !== username)
        let newData = {...Data,friendReq:newFriendReq,friends:[...Data.friends,{username:username,uid:uid,location:location}]}
        setDoc(userRef,newData)
    })
    .catch((err)=>{
        setAlertData({type:'error',msg:err.message,showen:true});
    })
  }

  function handleRemove(username){
    
    const userRef = doc(db,'userData',auth.currentUser.uid);
    getDoc(userRef)
    .then((res)=>{
        const Data = res.data();
        let newFriendReq = friendReq.filter((e)=> e.username !== username)
        let newData = {...Data,friendReq:newFriendReq}
        setDoc(userRef,newData)
    })
    .catch((err)=>{
        setAlertData({type:'error',msg:err.message,showen:true});
    })

  }
    return (
      <>
        <div className="blur-background"></div>
        <article className='requests'>
          {friendReq.map((user,i)=>(
            <div className="request-bar" key={i}>
              <p className="username">{user.username}</p>
              <p className='accept' onClick={()=>handleAdd(user.uid,user.username,user.location)}><BsCheckLg /></p>
              <p className='decline' onClick={()=>handleRemove(user.uid)}><TbLetterX /></p>
            </div>
          ))

          }
        </article>
        <div className="close-button" onClick={()=>setIsRequestsShowen(false)}>
          <p className="close-text">Close</p>
        </div>
      </>
    )
}

export default Requests