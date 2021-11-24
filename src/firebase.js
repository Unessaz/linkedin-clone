import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyD6koW38m_pXwvVw-Obq7aDCcHED848BBI",
    authDomain: "linkedin-clone-be1a3.firebaseapp.com",
    projectId: "linkedin-clone-be1a3",
    storageBucket: "linkedin-clone-be1a3.appspot.com",
    messagingSenderId: "510900513369",
    appId: "1:510900513369:web:58c07cdeb43201136cdf48",
    measurementId: "G-C2VEH511L7"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore() 
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()
const storage = firebase.storage()

export {auth , provider , storage}
export default db 