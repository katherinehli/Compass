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