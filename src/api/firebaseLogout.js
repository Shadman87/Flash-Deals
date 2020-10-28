import fireConfig from '../firebaseConfig/config';

export default () => {
  fireConfig.auth().signOut();
}