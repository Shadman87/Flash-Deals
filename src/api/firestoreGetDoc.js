import firestore from './firestore';

export default (id) => { 
    return firestore.collection("Deals").doc(id).get() 
} 