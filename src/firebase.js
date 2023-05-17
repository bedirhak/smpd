import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { doc } from "firebase/firestore";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const doctorCollectionRef = db.collection("doctor-users");
export const prescriptionsRef = db.collection("prescriptions");

// Firestore bağlantısını kontrol etmek için bir test koleksiyonu oluşturun
//const testCollection = db.collection("test");

// const analytics = getAnalytics(firebaseApp);
//export const db = getFirestore(firebaseApp);
export const register = (email, password, name, surname, role) => {
    
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        updateProfile(auth.currentUser, {displayName: `${name} ${surname}`, photoURL: role})
        const user = userCredential.user;
        
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
}

export const logout = (email, password) => {
    
    const auth = getAuth();
    signOut(auth).then(() => {
    }).catch((error) => {
      // An error happened.
    });
}