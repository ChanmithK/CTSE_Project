// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import { getAuth } from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCShcOb4IND6PJw4xhjM18S7SIiPJpSAHA",
  authDomain: "ctse-project-34d0d.firebaseapp.com",
  projectId: "ctse-project-34d0d",
  storageBucket: "ctse-project-34d0d.appspot.com",
  messagingSenderId: "459675485798",
  appId: "1:459675485798:web:1a0a94de968fab3e284fa7",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
