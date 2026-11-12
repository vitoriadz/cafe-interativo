// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAo533BoF0Cb1d0rpvTYlCeQ5bv5gEO3wE",
  authDomain: "pausa-para-o-cafe.firebaseapp.com",
  projectId: "pausa-para-o-cafe",
  storageBucket: "pausa-para-o-cafe.firebasestorage.app",
  messagingSenderId: "456676094271",
  appId: "1:456676094271:web:7067222fc80c0e5fd8a38a",
  measurementId: "G-DHDD7PD5W8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);