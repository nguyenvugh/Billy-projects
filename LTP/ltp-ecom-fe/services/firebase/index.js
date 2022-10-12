import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBd16UGI1fhlIEgpMIkOlh7-esWcWm9rdg",
  authDomain: "ltpecom.firebaseapp.com",
  databaseURL: "https://ltpecom-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ltpecom",
  storageBucket: "ltpecom.appspot.com",
  messagingSenderId: "597679325093",
  appId: "1:597679325093:web:051814e151739f9e7a324c",
  measurementId: "G-R1NKJDBPH1",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

export default firebase;
