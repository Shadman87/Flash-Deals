import firebase from "firebase";
import firestore from "./firestore";

//Importing SweetAlert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default (
  id,
  title,
  message,
  subMessage,
  imageFile,
  category,
  type,
  date,
  time,
  dateInMilli
) => {
  const ref = firebase.storage().ref();
  const MySwal = withReactContent(Swal);
  MySwal.showLoading();
  if (imageFile) {
    var fileName = id;
    const metadata = {
      contentType: imageFile.type,
    };
    const task = ref.child(fileName).put(imageFile, metadata);
    task
      .then((snapshot) => snapshot.ref.getDownloadURL())
      .then((url) => {
        console.log(url);
        firestore
          .collection("Deals")
          .doc(id)
          .update({
            id: id,
            title: title,
            message: message,
            subMessage: subMessage,
            imageUrl: url,
            category: category,
            type: type,
            date: date,
            time: time,
            dateInMilli: dateInMilli,
          })
          .then(() => {
            MySwal.fire({
              icon: "success",
              title: "Data Updated!",
              confirmButtonText: "Okay",
            }).then(() => {
              window.location.assign("/");
            });
          })
          .catch((error) => {
            console.log(error);
          });
      });
  } else {
    firestore
      .collection("Deals")
      .doc(id)
      .update({
        id: id,
        title: title,
        message: message,
        subMessage: subMessage,
        category: category,
        type: type,
        date: date,
        time: time,
        dateInMilli: dateInMilli,
      })
      .then(() => {
        MySwal.fire({
          icon: "success",
          title: "Data Updated!",
          confirmButtonText: "Okay",
        }).then(() => {
          window.location.assign("/");
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
