import React from 'react'; 

import firebase from 'firebase';
import fireConfig from '../firebaseConfig/config';

//Importing SweetAlert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import "./../App.css";

class DealDelete extends React.Component {

  deleteBtn = () => {
    const id = this.props.match.params.id; 
    console.log(id); 
     
    let firestore = fireConfig.firestore(); 
    const MySwal = withReactContent(Swal);
    let imageUrl = ''; 
    //Getting the imageUrl
    firestore
      .collection("Deals")
      .doc(id)
      .get()
      .then((doc) => {
        imageUrl = doc.data().imageUrl; 
        this.deleteImageFromStorage(imageUrl);
      })
      .then(() => {
        firestore
          .collection("Deals")
          .doc(id)
          .delete()
          .then(() => {
            MySwal.fire({
              icon: "success",
              title: "Data Deleted!",
              confirmButtonText: "Okay",
              timer: 2000
            })
            .then(() => {
              window.location.assign('/');
            });  
          })
          .catch((error) => {
            console.log(error);
          });
      }); 
    
     


  }

  deleteImageFromStorage = (url) => {
    const refUrl = firebase.storage().refFromURL(url);

    refUrl
      .delete()
      .then(function () {
        console.log("File deleted!");
        //window.location.assign('/');
      })
      .catch(function (error) {
        console.log("Error: " + error);
      })
  }
  render() {
    return (
      <div className="text-center container">
        <h3 className="text-center">Are you sure to delete this deal?</h3>
        <button className="btn btn-danger btn-lg" onClick={this.deleteBtn}>Delete</button>
        <button className="btn btn-primary btn-lg">Take me back!</button>
      </div>
    ); 
  }
}

export default DealDelete; 