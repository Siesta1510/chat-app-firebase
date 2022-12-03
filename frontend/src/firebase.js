import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDNo3g8j2-_D-6C3ZQVW26MJNyuUdFj3EY",
  authDomain: "chat-7b3a2.firebaseapp.com",
  projectId: "chat-7b3a2",
  storageBucket: "chat-7b3a2.appspot.com",
  messagingSenderId: "331622262763",
  appId: "1:331622262763:web:3ea2323761048d2e43dbae"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();