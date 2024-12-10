// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqKcOfGygH_Rt4O7Zknpv7DIjryIRXa2Y",
  authDomain: "visual-logic-craft.firebaseapp.com",
  databaseURL: "https://visual-logic-craft-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "visual-logic-craft",
  storageBucket: "visual-logic-craft.firebasestorage.app",
  messagingSenderId: "716788220237",
  appId: "1:716788220237:web:1670f0a53f4a72e8e77704",
  measurementId: "G-Y3T1X6BRYR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);