// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA-v_ccOuhsmOLCUqW-WNgl8LEJDrCRohQ",
    authDomain: "where-to-eat-3e7c9.firebaseapp.com",
    projectId: "where-to-eat-3e7c9",
    storageBucket: "where-to-eat-3e7c9.appspot.com",
    messagingSenderId: "132056028500",
    appId: "1:132056028500:web:a559b5a2045dd7c1dc64c1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);