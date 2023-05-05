import React, { useEffect, useState } from 'react'
import '../styles/choose.css'
import { useParams,Link } from 'react-router-dom';

const Choose = () => {
    const { uid } = useParams();
    const [wheelDeg,setWheelDeg] = useState({transform:'rotateZ(32deg) '});
    const [poinetrDeg,setPointerDeg] = useState({transform: 'translate(-50%,-50%) rotateZ(-32deg)'});
    const [randomRes,setRandomRes] = useState('');
    const [isClicked,setIsClicked] = useState(false);
    const [resturants,setResturants] = useState([]);
    const [choosen,setChoosen] = useState({rank:'',name:'',url:''});
    const [loading,setLoading] = useState(true)

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
        setChoosen({rank:offersArr[randomNum],name:resturants[randomNum].name,url:resturants[randomNum]?.photo?.images?.thumbnail?.url})
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

    useEffect(()=>{

        function log(position){
            let lat = position.coords.latitude
            let lon = position.coords.longitude

            const url = `https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng?latitude=${lat}&longitude=${lon}&limit=4&currency=USD&distance=2&open_now=false&lunit=km&lang=en_US`;
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'd72cd9c4b7msh92741464fc88173p18b759jsn58cfac827c5a',
                    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
                }
            };

            fetch(url,options)
            .then((res) => res.json())
            .then((data)=>setResturants(data.data))
            .finally(()=> setLoading(false))
        }
        navigator.geolocation.getCurrentPosition(log)
    },[])


    return (
        <section className='best-restaurants'>
            <h2 className='h2'>best places to eat with {uid} based on your data</h2>
            {loading?
            <h2 className='loading'>Loading....</h2>
            :
                <>
                    {resturants.map((e,i)=>(
                        <article className='restaurant' key={i}>
                        <div className='image' style={{backgroundImage:`url('${e?.photo?.images?.thumbnail?.url}')`}}></div>
                        <span className='number'>{i+1}st</span>
                        <h2 className='name'>{e.name}</h2>
                        <p className='details'>
                            {e.description !== ''?
                                e.description
                            :
                                e.web_url
                            }
                        </p>
                        <span className='location'>{e.location_string||e.address}</span>
                        <span className='distance'>{e.distance_string}</span>
                    </article>
                    ))

                    }
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
                            <h2>{choosen.rank}</h2>
                            <p>{choosen.name}</p>
                            <div className='image' style={{backgroundImage:`url('${choosen.url}')`}}></div>
                        </div>
                        <Link to='/'>
                            <button className={`go-back ${randomRes !== '' ? 'show' : ''}`}>
                                go back to home
                            </button>
                        </Link>
                    </article>
                </>
            }
        </section>
    )
}

export default Choose