// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAE-IGops7Uo80ovG564G5hGpvI-zrjEdE",
  authDomain: "learn-lingo-5c782.firebaseapp.com",
  databaseURL: "https://learn-lingo-5c782-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "learn-lingo-5c782",
  storageBucket: "learn-lingo-5c782.firebasestorage.app",
  messagingSenderId: "848536240900",
  appId: "1:848536240900:web:8c37089b84ca9043f9c651",
  measurementId: "G-43ZW71ES6Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
const database = getDatabase(app);

export {database}