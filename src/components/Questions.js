import React, { useState } from 'react';
import '../styles/questions.css';

const Questions = () => {

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

    return (
        <>
            <h1>we got a few questions</h1>
            
        </>
    )
}

export default Questions
