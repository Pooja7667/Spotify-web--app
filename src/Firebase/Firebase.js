// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth , signInWithEmailAndPassword  , createUserWithEmailAndPassword } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC65BFvAk_BwBzvS3Qa9bYsUFaLVxPEauc",
  authDomain: "entertainmentapp-b07d5.firebaseapp.com",
  projectId: "entertainmentapp-b07d5",
  storageBucket: "entertainmentapp-b07d5.appspot.com",
  messagingSenderId: "704178819482",
  appId: "1:704178819482:web:e3e18b0f48e886f754aa23",
  measurementId: "G-W4D1XRLP1T"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
 const db = getFirestore(app)
export {auth,signInWithEmailAndPassword , createUserWithEmailAndPassword , db} 