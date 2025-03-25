import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDLZwLwDjtc4bXLD9BfYUcWxmTleAWdH74",
  authDomain: "schoolbell-1145.firebaseapp.com",
  databaseURL:
    "https://schoolbell-1145-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "schoolbell-1145",
  storageBucket: "schoolbell-1145.firebasestorage.app",
  messagingSenderId: "540039261850",
  appId: "1:540039261850:web:0b9dfa2346afc53fc9b923",
  measurementId: "G-9LN8V95TS7",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
