import firestore from './firestore';
import deleteImageFromStorage from './deleteImageStorage';

//Importing SweetAlert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content"; 

export default (id) => {

  const MySwal = withReactContent(Swal);
  let imageUrl = ''; 
  //Getting the imageUrl
  MySwal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true, 
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!",
    confirmButtonColor: "#d33",
    cancelButtonColor: "#01D307",
    reverseButtons: true,
  })
  .then((result) => {
    
    if (result.value) {
      
      firestore
      .collection("Deals")
      .doc(id)
      .get()
      .then((doc) => {
        imageUrl = doc.data().imageUrl; 
        deleteImageFromStorage(imageUrl);
      })
      .then(() => {
        MySwal.showLoading();
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
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      MySwal.fire({
          icon: "error",
          title: "Cancelled!",
          text: "Your imaginary file is safe :)",
          showConfirmButton: false,
          timer: 2000,
      });
    }
  });
}