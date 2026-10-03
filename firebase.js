// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9fuCF5r2C5ExzslnaMgS9OgMB8F5eyzA",
  authDomain: "jemak-waste.firebaseapp.com",
  projectId: "jemak-waste",
  storageBucket: "jemak-waste.firebasestorage.app",
  messagingSenderId: "100864894769",
  appId: "1:100864894769:web:8d731ec203bca597407210",
  measurementId: "G-322D8CEKBQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log("API KEY:", import.meta.env.VITE_FIREBA¬I_KEY);
export default app;
// or for Create React App:
// console.log("API KEY:", process.env.REACT_APP_FIREBASE_API_KEY);