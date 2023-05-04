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
            text: 'What are you craving?',
            type: 'checkbox',
            options: ['Chinese', 'Indian', 'Italian', 'Middle Eastern']
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
        <>
            <h1>we got a few questions</h1>
        </>
    )
}

export default Questions
