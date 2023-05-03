import React, { useEffect, useState } from 'react'
import '../styles/choose.css'

const Choose = () => {
    const [wheelDeg,setWheelDeg] = useState({transform:'rotateZ(32deg) '});
    const [poinetrDeg,setPointerDeg] = useState({transform: 'translate(-50%,-50%) rotateZ(-32deg)'});
    const [randomRes,setRandomRes] = useState('');
    const [isClicked,setIsClicked] = useState(false);
    

    function handleSpin(){
        setIsClicked(true)
        const offersArr = [
            '1st',
            '2nd',
            '3rd',
            '4th',
            '5th'
        ]
        const randomNum = Math.round( Math.random() * 4 );
        setTimeout(()=>{
            setRandomRes(offersArr[randomNum]);
        },6500)
        let transform = 3600;
        
        switch (randomNum) {
        case 0 : 
            transform += 360;
        break;
        case 1 : 
            transform += 288;
        break;
        case 2 : 
            transform += 216;
        break;
        case 3 : 
            transform += 144;
            break;
        case 4 : 
            transform += 72;
            break;
        default :
            transform += 35;
        }
        setWheelDeg({transform:`rotateZ(${transform}deg)`});
        setPointerDeg({transform: `translate(-50%,-50%) rotateZ(${transform * -1}deg)`})
    }
    return (
        <section className='best-restaurants'>
            <h2 className='h2'>best places to eat with (username) based on your data</h2>
            <article className='restaurant'>
                <div className='image' style={{backgroundImage:"url('https://d3aux7tjp119y2.cloudfront.net/images/Tak2-CMSTemplate_IrMZHla.width-1650.jpg')"}}></div>
                <span className='number'>1st</span>
                <h2 className='name'>restaurant name</h2>
                <p className='details'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Ipsam quis, eligendi magni amet saepe quaerat ducimus, itaque, 
                    corporis debitis doloribus animi reprehenderit optio nulla nihil 
                    dolorum quidem odio! Doloribus, modi.
                </p>
                <span className='location'>restaurant location</span>
            </article>
            <article className='choosen'>
                <div className={`spin-wheel-container ${randomRes !== '' ? 'show' : ''}`} style={wheelDeg}>
                    <div className='spin-wheel'>
                        <div className='offer ' style={{transform:'translateX(-50%) rotateZ(0deg) '}}>1st</div>
                        <div className='offer ' style={{transform:'translateX(-50%) rotateZ(72deg)'}}>2nd</div>
                        <div className='offer ' style={{transform:'translateX(-50%) rotateZ(144deg)'}}>3rd</div>
                        <div className='offer ' style={{transform:'translateX(-50%) rotateZ(216deg)'}}> 4th </div>
                        <div className='offer ' style={{transform:'translateX(-50%) rotateZ(288deg)'}}>5th</div>
                        <span className='pointer' style={poinetrDeg}></span>
                    </div>
                </div>
                <button className={`spin-btn ${randomRes !== '' ? 'show' : ''}`} onClick={handleSpin} disabled={isClicked}>
                    pick a random one
                </button>
                <div className={`choosen-restaurant ${randomRes !== '' ? 'show' : ''}`}>
                    <h2>1st</h2>
                    <p>restaurant name</p>
                    <div className='image' style={{backgroundImage:"url('https://d3aux7tjp119y2.cloudfront.net/images/Tak2-CMSTemplate_IrMZHla.width-1650.jpg')"}}></div>
                </div>
                <button className={`go-back ${randomRes !== '' ? 'show' : ''}`}>
                    go back to home
                </button>
            </article>
        </section>
    )
}

export default Choose