import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBdIlSKf2l0LGMrOeyQjKgBR8kr4JMR_-8",
    authDomain: "dtf-5797c.firebaseapp.com",
    projectId: "dtf-5797c",
    storageBucket: "dtf-5797c.firebasestorage.app",
    messagingSenderId: "53261978649",
    appId: "1:53261978649:web:4ad4a3e73f503f409eae88",
    measurementId: "G-KL2DX400C0"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
