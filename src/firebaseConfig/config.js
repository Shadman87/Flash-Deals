import firebase from "firebase/app"; 
import "firebase/firestore"; 

var firebaseConfig = {
  apiKey: "AIzaSyCnYOg4zDjFMn5y6og81EwIadHbxgSLJCI",
  authDomain: "flash-deals-app.firebaseapp.com",
  databaseURL: "https://flash-deals-app.firebaseio.com",
  projectId: "flash-deals-app",
  storageBucket: "flash-deals-app.appspot.com",
  messagingSenderId: "165307310724",
  appId: "1:165307310724:web:4a05d1bc61e4e6fc98d8d1",
  measurementId: "G-D9RE5Y6PHD"
};

// Initialize Firebase
const fireConfig = firebase.initializeApp(firebaseConfig); 

export default fireConfig;  