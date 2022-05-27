// Import the functions you need from the SDKs you need
import { initializeApp , getApp, getApps} from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC6rCF2jswuhGL28UW6bA80KC3xdRS1oI0",
    authDomain: "insta-2-4a5a7.firebaseapp.com",
    projectId: "insta-2-4a5a7",
    storageBucket: "insta-2-4a5a7.appspot.com",
    messagingSenderId: "486946078826",
    appId: "1:486946078826:web:ed70b2480f531004330a13"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp() ;
const db = getFirestore();
const storage= getStorage();

export {app,db,storage}