// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQowSC0f7rxPVpjRruQpatwoNrPFRZc7Y",
  authDomain: "mediplus-7d049.firebaseapp.com",
  projectId: "mediplus-7d049",
  storageBucket: "mediplus-7d049.appspot.com",
  messagingSenderId: "402324578610",
  appId: "1:402324578610:web:962883634e85ed23adb72b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;