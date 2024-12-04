import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCBifO2A5rRuKo26LKJpaZy4-OqKSShnoY",
    authDomain: "fart-f534b.firebaseapp.com",
    databaseURL: "https://fart-f534b-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "fart-f534b",
    storageBucket: "fart-f534b.appspot.com",
    messagingSenderId: "229168511446",
    appId: "1:229168511446:web:f5495fc3c3ffa9d8bb4c77"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);