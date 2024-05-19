// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOZLiadpG_NGMfaBpnGiQ-YLOgchvDN8M",
  authDomain: "fashion-ecommerce-app-a2da9.firebaseapp.com",
  projectId: "fashion-ecommerce-app-a2da9",
  storageBucket: "fashion-ecommerce-app-a2da9.appspot.com",
  messagingSenderId: "994404214036",
  appId: "1:994404214036:web:087ac70d41ce5297fb4e01",
  measurementId: "G-XE7BETLE45"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);