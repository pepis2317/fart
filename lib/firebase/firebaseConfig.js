// lib/firebase.js
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import {getStorage} from 'firebase/storage'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyCBifO2A5rRuKo26LKJpaZy4-OqKSShnoY",
  authDomain: "fart-f534b.firebaseapp.com",
  databaseURL: "https://fart-f534b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fart-f534b",
  storageBucket: "fart-f534b.appspot.com",
  messagingSenderId: "229168511446",
  appId: "1:229168511446:web:f5495fc3c3ffa9d8bb4c77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app)
const db = getFirestore(app);

const auth = getAuth(app);
export {auth, db, storage}
