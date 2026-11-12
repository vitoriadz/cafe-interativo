import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAo533BoF0Cb1d0rpvTYlCeQ5bv5gEO3wE",
  authDomain: "pausa-para-o-cafe.firebaseapp.com",
  projectId: "pausa-para-o-cafe",
  storageBucket: "pausa-para-o-cafe.firebasestorage.app",
  messagingSenderId: "456676094271",
  appId: "1:456676094271:web:7067222fc80c0e5fd8a38a",
  measurementId: "G-DHDD7PD5W8"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);