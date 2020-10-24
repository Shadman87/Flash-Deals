import firebase from 'firebase'; 

export default (url) => {
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