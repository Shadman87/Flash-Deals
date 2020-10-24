import firestore from './firestore';

export default () => {
    return firestore.collection("Deals").get();
}