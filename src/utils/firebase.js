import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAXLCkmV97EhXjGduVephObC9WlSz2gCd0",
  authDomain: "diary-project-2456c.firebaseapp.com",
  projectId: "diary-project-2456c",
  storageBucket: "diary-project-2456c.firebasestorage.app",
  messagingSenderId: "890003534712",
  appId: "1:890003534712:web:8c4062edaa4769a3a40e8d",
  measurementId: "G-L9X0ZMTLKE",
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
