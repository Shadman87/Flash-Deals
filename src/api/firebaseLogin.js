import fireConfig from '../firebaseConfig/config';

export default (email, password) => {
  fireConfig
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      console.log(user); 
      window.location.assign('/');
    })
    .catch(err => {
      alert(err); 
      console.log(err); 
    });
}
