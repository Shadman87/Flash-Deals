import fireConfig from '../firebaseConfig/config';

export default () => {
  fireConfig
    .auth()
    .onAuthStateChanged((user) => {
      if(user) {
        console.log(user.email); 
      } else {
        window.location.assign('/login');
      }
    })    
}