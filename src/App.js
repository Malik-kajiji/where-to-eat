import React, { useEffect, useState } from 'react';
import Header from './components/Header'
import Questions from './components/Questions';
import Home from './components/Home';
import Account from './components/Account';
import Alert from './components/Alert';
import { onAuthStateChanged  } from 'firebase/auth'
import { doc,onSnapshot } from 'firebase/firestore'
import { db, auth } from './config/firebaseConfig';
import  Choose  from './components/Choose'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


function App() {

  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [isAsked,setIsAsked] = useState(false);
  const [loading,setLoading] = useState(true)
  const [loading2,setLoading2] = useState(true)

  useEffect(()=>{
    document.addEventListener('mousemove',parallax);
    function parallax(e){
      const BG = document.querySelector('.BG');
      let x = e.clientX / 8 
      let y = e.clientY / 8
      BG.style.backgroundPositionX = `${x}px`
      BG.style.backgroundPositionY = `${y}px`
    }

    onAuthStateChanged(auth,(res)=>{
      if(res){
        setIsLoggedIn(true)
      }else {
        setIsLoggedIn(false)
      }
      setLoading(false)
    })
  },[])
  useEffect(()=>{
    if(isLoggedIn){
      const Ref = doc(db,'userData',auth.currentUser.uid);
      onSnapshot(Ref,(res)=>{
        setIsAsked(res.data().isAsked);
        setLoading2(false)
      })
    }else {
      setLoading2(false)
    }
  },[isLoggedIn])
  return (
    <main className="App">
      <div className='BG'></div>
      <Alert />
      {loading || loading2?
        <h2 className='loading'>Loading....</h2>
      :
        <>
          { isLoggedIn ?
            <>
            {isAsked?
                <Router>
                  <Header />
                  <Routes>
                      <Route 
                      path='/' 
                      element={<Home />}/>
                      <Route 
                          path='/chooes/:uid' 
                          element={<Choose />}
                      />
                  </Routes>
                </Router>
              :
              <Questions />
            }
            </>
            :
            <Account />
          }
        </>

      }
    </main>
  );
}

export default App;
