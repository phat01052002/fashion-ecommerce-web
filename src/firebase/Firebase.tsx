// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import 'firebase/compat/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyDET2O34jHukJuyI5HtcGFpjDeIYabw6Jw',
    authDomain: 'fashion-eccommerce-website.firebaseapp.com',
    projectId: 'fashion-eccommerce-website',
    storageBucket: 'fashion-eccommerce-website.appspot.com',
    messagingSenderId: '902941665572',
    appId: '1:902941665572:web:948f12b1934bae18a0ebb1',
    measurementId: 'G-DC6VNS8R6X',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
auth.languageCode = 'it';
