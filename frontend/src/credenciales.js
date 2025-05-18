
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "",
  authDomain: "login-edya2.firebaseapp.com",
  projectId: "login-edya2",
  storageBucket: "login-edya2.appspot.com",
  messagingSenderId: "",
  appId: "1:89246934117:web:dff88b4c669c053289128c"
};

const appfirebase = initializeApp(firebaseConfig);
export default appfirebase;
