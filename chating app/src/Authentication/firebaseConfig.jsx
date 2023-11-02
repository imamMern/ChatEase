
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDzUWxm2Ayd86uMtKKAAfii1Rf1J9O4rJw",
  authDomain: "chatify-510a3.firebaseapp.com",
  projectId: "chatify-510a3",
  storageBucket: "chatify-510a3.appspot.com",
  messagingSenderId: "939900190136",
  appId: "1:939900190136:web:abcdfabd03b1f1c8c8634d",
  measurementId: "G-Q9JM6HPNSH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default firebaseConfig