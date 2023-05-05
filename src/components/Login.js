import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AlertData } from '../context/AlertContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';

const Login = () => {
    const navigate = useNavigate()
    const { setAlertData } = AlertData()

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleSubmit =  e => {
        e.preventDefault();
        if(formData.email === '' || formData.password === ''){
            setAlertData({type:'warrning',showen:true,msg:'make sure to fill all the inputs'})
        }else {
            signInWithEmailAndPassword(auth,formData.email,formData.password)
            .then((res)=>{
                setAlertData({type:'success',showen:true,msg:'logged in successfully'})
                navigate('/')
            })
            .catch((err) => setAlertData({type:'error',showen:true,msg:err.message}))
        }
    }

    const handleChange = e => {
        setFormData({
            ...formData, 
            [e.target.name]: e.target.value,
        })
    }
    return (
        <form className='login' onSubmit={(e)=>handleSubmit(e)}>
            <label htmlFor="">Email</label>
            <input 
                type="text" 
                autoComplete='off'
                id='email'
                name='email'
                placeholder='name@example.com'
                value={formData.email}
                onChange={(e)=>handleChange(e)}
            />
            <label htmlFor="">password</label>
            <input 
                type='password'
                autoComplete='off'
                id='password'
                name='password'
                placeholder='****************'
                value={formData.password}
                onChange={handleChange}
            />
            <p>don’t have account? <Link to='/signup'> Create one </Link> </p>
            <button>
                Login
            </button>
        </form>
    )
}

export default Login