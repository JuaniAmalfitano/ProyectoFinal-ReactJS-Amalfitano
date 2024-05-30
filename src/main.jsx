// Main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'




import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCsQjTFaKtZIS8kXZ4A-2i00YGqf8RnN7g",
  authDomain: "proyecto-final-react-1e190.firebaseapp.com",
  projectId: "proyecto-final-react-1e190",
  storageBucket: "proyecto-final-react-1e190.appspot.com",
  messagingSenderId: "798899851513",
  appId: "1:798899851513:web:41575ba1684612eac65228"
};

const app = initializeApp(firebaseConfig);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>,
)
