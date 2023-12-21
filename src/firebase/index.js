import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCeBLIUMfVWAPA1vjp4-MtnbT-sDmS6Q-Y",
    authDomain: "library-app-cfcd6.firebaseapp.com",
    projectId: "library-app-cfcd6",
    storageBucket: "library-app-cfcd6.appspot.com",
    messagingSenderId: "644144743459",
    appId: "1:644144743459:web:4f77f8f2041530edaadd96",
    measurementId: "G-MDLHG8QGEV"
  };

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
const auth = getAuth(app);

export {db, auth}