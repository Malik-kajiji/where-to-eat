import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AlertData } from '../context/AlertContext'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, db } from '../config/firebaseConfig'
import { doc,setDoc,getDoc } from 'firebase/firestore'

const Signup = () => {
    const [allUsers,setAllUsers] = useState([]);
    const navigate = useNavigate()
    const { setAlertData } = AlertData()
    const [ formData, setFormData] = useState({
        email: '',
        password: '',
        passwordConf: '',
        username:''
    })

    const { email, password, passwordConf,username } = formData


    const handleSubmit = e => {
        e.preventDefault()
        if(email === '' || password === '' || passwordConf === '' || username === ''){
            setAlertData({type:'warrning',showen:true,msg:'make sure to fill all the inputs'})
        }else if(password !== passwordConf ){
            setAlertData({type:'warrning',showen:true,msg:'make sure to match the passwords'})
        } else {
            let doesExist = false;
            for(let i = 0; i< allUsers.length ; i++){
                if(allUsers[i].name === username){
                    doesExist = true;
                }
            }
            if(doesExist){
                setAlertData({type:'error',showen:true,msg:'the username is already taken'})
            }else {
                createUserWithEmailAndPassword(auth,email,password)
                .then((res)=>{
                    updateProfile(res.user,{displayName:username})
                    const Ref = doc(db,'allusers','usersData');
                    setDoc(Ref,{Data: [...allUsers,{name:username,uid:res.user.uid}]});
                    const Ref2 = doc(db,'userData',res.user.uid);
                    setDoc(Ref2,{isAsked:false,answers:{},freinds:[],freindReq:[]});
                    setAlertData({type:'success',showen:true,msg:'created account successfully'})
                    navigate('/')
                })
                .catch((err) => setAlertData({type:'error',showen:true,msg:err.message}))
            }
        }
    }

    const handleChange = e => {
        
        setFormData({
            ...formData, 
            [e.target.name]: e.target.value,
        })
    }

    useEffect(()=>{
        const Ref = doc(db,'allusers','usersData');
        getDoc(Ref)
        .then(res => {
            setAllUsers(res.data().Data)
        })
    },[])
    return (
        <form className='login' onSubmit={(e)=>handleSubmit(e)}>
            <label htmlFor="">username</label>
            <input 
                type="text" 
                placeholder='username' 
                autoComplete='off'
                id='username'
                name='username'
                value={username}
                onChange={handleChange}
                />
            <label htmlFor="">Email</label>
            <input 
                type="text" 
                autoComplete='off'
                id='email'
                name='email'
                placeholder='name@example.com'
                value={email}
                onChange={handleChange}
            />
            <label htmlFor="">password</label>
            <input 
                type='password'
                autoComplete='off'
                id='password'
                name='password'
                placeholder='****************'
                value={password}
                onChange={handleChange}
            />
            <label htmlFor="">confirm password</label>
            <input 
                type='password'
                autoComplete='off'
                id='confirm'
                name='passwordConf'
                placeholder='****************'
                value={passwordConf}
                onChange={handleChange}
            />
            <p>already have account? <Link to='/'> Login </Link> </p>
            <button>
                create account
            </button>
        </form>
    )
}

export default Signup