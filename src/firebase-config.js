// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCQ1DG2RnA8h8cdrFVsaShbyOXT_GHt8P8",
    authDomain: "book-club-reads-359821.firebaseapp.com",
    projectId: "book-club-reads-359821",
    storageBucket: "book-club-reads-359821.appspot.com",
    messagingSenderId: "408194509106",
    appId: "1:408194509106:web:578e98750c98a662868f2b",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export const db = getDatabase(firebase);
export const auth = getAuth(firebase);
export const provider = new GoogleAuthProvider();
export default firebase;
