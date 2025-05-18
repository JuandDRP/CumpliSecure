
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB8dSyLSNxRlvhX8PsTQbNEK0ie6XaXn5g",
  authDomain: "login-edya2.firebaseapp.com",
  projectId: "login-edya2",
  storageBucket: "login-edya2.appspot.com",
  messagingSenderId: "89246934117",
  appId: "1:89246934117:web:dff88b4c669c053289128c"
};

const appfirebase = initializeApp(firebaseConfig);
export default appfirebase;