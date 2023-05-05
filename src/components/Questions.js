import React, { useEffect, useState } from 'react';
import '../styles/questions.css';
import { AlertData } from '../context/AlertContext';
import { doc , setDoc } from 'firebase/firestore';
import { auth , db } from '../config/firebaseConfig';

const Questions = () => {
    const { setAlertData } = AlertData()
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState([[], [], '','']);
    const [location,setLocation] = useState('');

    const handleAnswerChange = (event, index) => {
        const { value, type, checked } = event.target
        if (type === 'checkbox') {
            setAnswers((prevAnswers) => {
                const newAnswer = prevAnswers[index].includes(value)
                ? prevAnswers[index].filter((item) => item !== value)
                : [...prevAnswers[index], value]
                return prevAnswers.map((item, i) => (i === index ? newAnswer : item))
            })
        } else {
            setAnswers((prevAnswers) =>{
                const newAnswer = [...prevAnswers];
                const newArr = newAnswer.map((item, i) => (i === index ? value : item))
                return newArr;
            }
            )
        }
    }

    const handleNext = () => {
        setCurrentQuestion((prevQuestion) => {
            if(prevQuestion === 0 || prevQuestion === 1){
                if(answers[prevQuestion].length < 1){
                    setAlertData({type:'warrning',msg:'choose at least one option',showen:true});
                    return prevQuestion;
                }
            }else {
                if(answers[prevQuestion] === ''){
                    setAlertData({type:'warrning',msg:'choose one option',showen:true});
                    return prevQuestion;
                }
            }
            return prevQuestion + 1
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if(answers[3] === ''){
            setAlertData({type:'warrning',msg:'choose one option',showen:true});
        }else {
            let priceLevel;
            if(answers[2] === 'looking for the cheapest food'){
                priceLevel = 'low'
            }else if(answers[2] === 'looking for a mix between quality and price'){
                priceLevel = 'medium'
            }else {
                priceLevel = 'high'
            }
            const Ref = doc(db,'userData',auth.currentUser.uid);
            setDoc(Ref,{
                answers: {
                    cuisine:answers[0],
                    diningOptions:answers[1],
                    priceLevel,
                    minRating: answers[3]
                },
                isAsked:true,
                friends:[],
                friendReq:[],
                location:location
            })
            .then(()=>{
                setAlertData({type:'success',msg:'your profile created successfully',showen:true});
            })
            .catch((err)=>{
                setAlertData({type:'error',msg:err.message,showen:true});
            })
        }
    }
    
    useEffect(()=>{
        fetch('https://api.geoapify.com/v1/ipinfo?apiKey=1eed5c738651413291c1bddbac0cf5b2')
        .then(res => res.json())
        .then(json => setLocation(`${json.city.name}, ${json.country.name}`));
    },[])

    const questions = [
        {
            text: 'What cuisine are you craving?',
            type: 'checkbox',
            options: ['Chinese', 'Indian', 'Italian', 'Korean', 'Spanish', 'Japanese']
        },
        {
            text: 'what are the best dining options for you?',
            type: 'checkbox',
            options: ['fast food', 'casual', 'Fine Dining',' Cafe','Pub']
        },
        {
            text: 'what is the food quality to price ratio you are looking for?',
            type: 'radio',
            options: ['looking for the cheapest food', 'looking for a mix between quality and price', 'looking for the best food quality']
        },
        {
            text: 'what is the minmum rating you are looking for?',
            type: 'radio',
            options: ['2.5', '3', '3.5','4','4.5','5']
        }
    ]

    const currentQuestionData = questions[currentQuestion]

    return (
        <div className='questions'>
            <div className='header'>
                <h1>we got a few questions</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <h2>{currentQuestionData.text}</h2>
                {currentQuestionData.type === 'checkbox' &&
                    currentQuestionData.options.map((option, index) => (
                        <div className='answers' key={index}>
                            <input 
                                type="checkbox"
                                className='the-input'
                                id={`${currentQuestion}-${index}`}
                                name={`${currentQuestion}`}
                                value={option}
                                checked={answers[currentQuestion].includes(option)}
                                onChange={(event) => handleAnswerChange(event, currentQuestion)}
                            />
                            <label htmlFor={`${currentQuestion}-${index}`}>{option}</label>
                        </div>
                    ))}
                {currentQuestionData.type === 'radio' &&
                    currentQuestionData.options.map((option, index) => (
                        <div className='answers' key={index}>
                            <input 
                                type="radio"
                                className='the-input'
                                id={`${currentQuestion}-${index}`}
                                name={`${currentQuestion}`}
                                value={option}
                                checked={answers[currentQuestion] === option}
                                onChange={(event) => handleAnswerChange(event, currentQuestion)}
                            />
                            <label htmlFor={`${currentQuestion}-${index}`}>{option}</label>
                        </div>
                    ))}
                {currentQuestionData.type === 'text' && (
                    <input
                        type='text'
                        className='the-input'
                        value={answers[currentQuestion]}
                        placeholder='Manhattan, NY'
                        onChange={(event) => handleAnswerChange(event, currentQuestion)}
                    />
                )}
                {currentQuestion < questions.length - 1 && (
                    <button type='button' onClick={handleNext} className='next'>next</button>
                )}
                {currentQuestion === questions.length - 1 && (
                    <button type='submit' className='next'>Done</button>
                )}
            </form>
        </div>
    )
}

export default Questions
