import React, { useEffect } from 'react';


function App() {

  useEffect(()=>{
    document.addEventListener('mousemove',parallax);

    function parallax(e){
      const BG = document.querySelector('.BG');

      let x = e.clientX /8 
      let y = e.clientY /8

      BG.style.backgroundPositionX = `${x}px`
      BG.style.backgroundPositionY = `${y}px`
    }
  },[])
  return (
    <main className="App">
      <div className='BG'></div>
      
    </main>
  );
}

export default App;
