// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_BfVh3kvY8awtHVZc6TiiRcKQCKiKtS8",
  authDomain: "accounts-925d0.firebaseapp.com",
  projectId: "accounts-925d0",
  storageBucket: "accounts-925d0.appspot.com",
  messagingSenderId: "317531573930",
  appId: "1:317531573930:web:6cebff5f27fe6d1dad8ad3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);