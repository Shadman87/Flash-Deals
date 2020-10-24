import "firebase/firestore"; 
import fireConfig from "../firebaseConfig/config";

let firestore = fireConfig.firestore(); 
export default () => {
    return firestore.collection("Deals").get();
}