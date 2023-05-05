import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import AlertContext from './context/AlertContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AlertContext>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AlertContext>
);


