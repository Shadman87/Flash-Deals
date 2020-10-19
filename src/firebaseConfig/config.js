import firebase from "firebase/app"; 
import "firebase/firestore"; 

var firebaseConfig = {
  apiKey: "AIzaSyAvfE58c4sJoyZxDus6zSxXcC1ZDfK6SI4",
  authDomain: "flash-deals-project.firebaseapp.com",
  databaseURL: "https://flash-deals-project.firebaseio.com",
  projectId: "flash-deals-project",
  storageBucket: "flash-deals-project.appspot.com",
  messagingSenderId: "783644832170",
  appId: "1:783644832170:web:5ce66afa314bf48b2b7bd3"
};
// Initialize Firebase
const firebase = firebase.initializeApp(firebaseConfig); 

export default firebase;  