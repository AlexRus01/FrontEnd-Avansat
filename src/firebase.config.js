
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDITNmy2vqhsOeo-6_wABlkf-g4r5a_MvU",
  authDomain: "house-marketplace-app-528b4.firebaseapp.com",
  projectId: "house-marketplace-app-528b4",
  storageBucket: "house-marketplace-app-528b4.appspot.com",
  messagingSenderId: "144447826456",
  appId: "1:144447826456:web:09711872f416042c07b16d",
  measurementId: "G-B04DB9J4H0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()
const analytics = getAnalytics(app);