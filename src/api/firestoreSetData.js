import firebase from 'firebase';
import firestore from './firestore';

//Importing SweetAlert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content"; 

export default (id, title, message, imageFile, category, date, time, dateInMilli) => {
  //Uploading to Firestore
  const ref = firebase.storage().ref();

  const MySwal = withReactContent(Swal);

  if (imageFile) {
    var fileName = id;
    const metadata = {
        contentType: imageFile.type,
    };
    const task = ref.child(fileName).put(imageFile, metadata);
    task.then((snapshot) => snapshot.ref.getDownloadURL()).then((url) => {
      //alert("Image Upload Successful");
      console.log(url); 
      firestore
        .collection("Deals")
        .doc(id)
        .set({
          id: id, 
          title: title, 
          message: message, 
          imageUrl: url, 
          category: category,
          date: date, 
          time: time, 
          dateInMilli: dateInMilli
        })
        .then(() => {
          MySwal.fire({
            icon: "success",
            title: "Data Saved!",
            confirmButtonText: "Okay",
          })
          .then(() => {
            window.location.assign('/');
          });
        })
        .catch((error) => {
          console.log(error); 
        }); 
    });
  } else {
    console.log("Image needs to be selected!");
    window.location.reload(); 
  } 
}