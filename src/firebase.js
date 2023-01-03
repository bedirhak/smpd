import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";



const firebaseConfig = {
  apiKey: "AIzaSyBF3sVrAofbuplGYCBlqTnSW88PeqNmb_4",
  authDomain: "smpd-auth-dev.firebaseapp.com",
  projectId: "smpd-auth-dev",
  storageBucket: "smpd-auth-dev.appspot.com",
  messagingSenderId: "51373065223",
  appId: "1:51373065223:web:a664f490b2da61e70296a2",
  measurementId: "G-2Q2SMELFQZ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);