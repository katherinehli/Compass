import * as firebase from "firebase"

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAq5KPxjdbf_Qu9OKKOJJTgmg_TtTDPxT8",
    authDomain: "compass-ba103.firebaseapp.com",
    databaseURL: "https://compass-ba103-default-rtdb.firebaseio.com/",
    storageBucket: "compass-ba103.appspot.com",
    projectID: "compass-ba103"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//   const firebaseConfig = {
//     apiKey: "AIzaSyA_2OCJdPcFrwHPQXLcP5zxErLYramrbXo",
//     authDomain: "compassapp-40995.firebaseapp.com",
//     databaseURL: "https://compassapp-40995-default-rtdb.firebaseio.com",
//     projectId: "compassapp-40995",
//     storageBucket: "compassapp-40995.appspot.com",
//     messagingSenderId: "657267396684",
//     appId: "1:657267396684:web:a25e83ee05c74aab3424e9",
//     measurementId: "G-99QE9301LG"
//   };
//   // Initialize Firebase
//   const firebaseApp = firebase.initializeApp(firebaseConfig);
