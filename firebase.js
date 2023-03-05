


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqOBMk5uGWLtOhw9ZcM6LqO2DTK_gYekM",
  authDomain: "sportsapp-d30fb.firebaseapp.com",
  projectId: "sportsapp-d30fb",
  storageBucket: "sportsapp-d30fb.appspot.com",
  messagingSenderId: "155110640688",
  appId: "1:155110640688:web:f5905645e193636fd571f5",
  measurementId: "G-FRCNCQKLBP"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth=getAuth(app)





export {app,auth,signInWithEmailAndPassword,createUserWithEmailAndPassword}