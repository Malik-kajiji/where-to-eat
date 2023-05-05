import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import Login from './Login';
import SignUp from './Signup';
import '../styles/account.css';

const Account = () => {
    return (
        <section className='account'>
            <Router>
                <header className='logo'>
                    <h2>where to eat ?</h2>
                </header>
                <Routes>
                    <Route 
                    path='/' 
                    element={<Login />}/>
                    <Route 
                        path='/signup' 
                        element={<SignUp />}
                    />
                </Routes>
            </Router>
        </section>
    )
}

export default Account