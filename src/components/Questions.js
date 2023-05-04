import React, { useState } from 'react';
import '../styles/questions.css';

const Questions = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState(['', [], ''])

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
            setAnswers((prevAnswers) =>
            prevAnswers.map((item, i) => (i === index ? value : item))
            )
        }
    }

    const handleNext = () => {
        setCurrentQuestion((prevQuestion) => prevQuestion + 1)
    }

    const handleSubmit = (event) => {
        // submit answers to connect to API???
        event.preventDefault()
        console.log(answers)
    }

    const questions = [
        {
            text: 'What cuisine are you craving?',
            type: 'checkbox',
            options: ['Chinese', 'Indian', 'Italian', 'Korean', 'Spanish', 'Japanese']
        },
        {
            text: 'How long are you willing to travel?',
            type: 'radio',
            options: ['< 5 miles', '> 5 miles', 'anywhere']
        },
        {
            text: 'In what city/town would you like to eat?',
            type: 'text'
        }
    ]

    const currentQuestionData = questions[currentQuestion]

    return (
        <div className='questions'>
            <h1>we got a few questions</h1>
            <form onSubmit={handleSubmit}>
                <h2>{currentQuestionData.text}</h2>
                {currentQuestionData.type === 'checkbox' &&
                    currentQuestionData.options.map((option, index) => (
                        <div className='answers' key={index}>
                            <input 
                                type="checkbox"
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
                                id={`${currentQuestion}-${index}`}
                                name={`${currentQuestion}`}
                                value={option}
                                checked={answers[currentQuestion].includes(option)}
                                onChange={(event) => handleAnswerChange(event, currentQuestion)}
                            />
                            <label htmlFor={`${currentQuestion}-${index}`}>{option}</label>
                        </div>
                    ))}
                {currentQuestionData.type === 'text' && (
                    <input
                        type='text'
                        value={answers[currentQuestion]}
                        placeholder='Manhattan, NY'
                        onChange={(event) => handleAnswerChange(event, currentQuestion)}
                    />
                )}
                {currentQuestion < questions.length - 1 && (
                    <button type='button' onClick={handleNext}>next</button>
                )}
                {currentQuestion === questions.length - 1 && (
                    <button type='submit'>submit</button>
                )}
            </form>
        </div>
    )
}

export default Questions
