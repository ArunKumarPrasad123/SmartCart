import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY  ,
  authDomain: "loginsmartcart.firebaseapp.com",
  projectId: "loginsmartcart",
  storageBucket: "loginsmartcart.firebasestorage.app",
  messagingSenderId: "390346680462",
  appId: "1:390346680462:web:32b6fa60aa01d38874c1df"
};

// Initialize Firebase
const APP = initializeApp(firebaseConfig);
const auth = getAuth(APP)
const provider = new GoogleAuthProvider()


export { auth, provider}
