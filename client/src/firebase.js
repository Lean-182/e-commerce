import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth"; 



const firebaseConfig = {
    apiKey: "AIzaSyDbOFjInaJ2C5dZFF7kQ7D4H_IoPXtfzME",
    authDomain: "cio-clothes-1c354.firebaseapp.com",
    projectId: "cio-clothes-1c354",
    storageBucket: "cio-clothes-1c354.appspot.com",
    messagingSenderId: "355957269528",
    appId: "1:355957269528:web:1029840c00a731dfa30f6d",
    measurementId: "G-JG6CD38YD4"
  };

  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  //EXPORT

  export const auth = getAuth(app)

  