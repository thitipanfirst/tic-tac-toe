import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDb3ggtwr_A67suXUkVCPJ-5EHpTJR_sdI",
    authDomain: "tic-tac-toe-2b41e.firebaseapp.com",
    projectId: "tic-tac-toe-2b41e",
    storageBucket: "tic-tac-toe-2b41e.firebasestorage.app",
    messagingSenderId: "1032634382891",
    appId: "1:1032634382891:web:c144618128a9276749886e",
    measurementId: "G-43S82S75Z2"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;