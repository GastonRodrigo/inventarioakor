// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {

    apiKey: "AIzaSyBfU6UVnycGWE3JMbHOITLlnB4C74mzls4",
  
    authDomain: "akorinventario.firebaseapp.com",
  
    projectId: "akorinventario",
  
    storageBucket: "akorinventario.appspot.com",
  
    messagingSenderId: "438198384434",
  
    appId: "1:438198384434:web:e46b50682307387268492b"
  
  };
  

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
