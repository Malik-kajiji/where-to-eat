import React, { useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { AlertData } from '../context/AlertContext';
import { db,auth } from '../config/firebaseConfig';
import { doc , getDoc , setDoc } from 'firebase/firestore';

const AddFriend = ({setIsAddShowen,allUser,friends}) => {
    const { setAlertData } = AlertData();
    const [inputData,setInputData] = useState('');
    function handleAdd(){
        if(auth.currentUser.displayName === inputData){
            setAlertData({type:'warrning',msg:'you can not send a friend request to your self',showen:true});
            return
        }
        let isFriend = false;
        for(let i = 0; i< friends.length; i++){
            if(friends[i].username === inputData){
                isFriend = true;
            }
        }
        if(isFriend){
            setAlertData({type:'warrning',msg:'this friend is already added',showen:true});
            return
        }

        let isExists = false;
        let userUid = '';
        for(let i = 0; i< allUser.length; i++){
            if(allUser[i].name === inputData){
                isExists = true;
                userUid = allUser[i].uid
            }
        }
        if(!isExists){
            setAlertData({type:'error',msg:'the user does not exist',showen:true});
        }else {
            const Reff = doc(db,'userData',auth.currentUser.uid)
            getDoc(Reff)
            .then(res=>{
                const location = res.data().location
                const Ref = doc(db,'userData',userUid);
                getDoc(Ref)
                .then((res)=>{
                    const Data = res.data();
                    let newData = {...Data,friendReq:[...Data.friendReq,{username:auth.currentUser.displayName,uid:auth.currentUser.uid,location:location}]}
                    setDoc(Ref,newData)
                    .then(()=>{
                        setAlertData({type:'success',msg:'friend request sent successfully',showen:true});
                    })
                    .catch((err)=>{
                        setAlertData({type:'error',msg:err.message,showen:true});
                    })
                })
                .catch((err)=>{
                    setAlertData({type:'error',msg:err.message,showen:true});
                })
            })
        }
    }
    return (
        <div className='add-friend'>
            <div className='add-username'>
                <input 
                type="text" 
                className='add-username-input'
                placeholder='enter username'
                value={inputData}
                onChange={(e)=>setInputData(e.target.value)}
                />
                <div className='add-username-btn-plus' onClick={handleAdd}>
                    <AiOutlinePlusCircle />
                </div>
            </div>
            <div className='close-button' onClick={()=>setIsAddShowen(false)}>
                <p className="close-text">Close</p>
            </div>
        </div>
    )
}

export default AddFriend