import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBOxS3YxOjAQoy2HQZLsSHAAC4-ukhgO0c",
  authDomain: "bili-dev.firebaseapp.com",
  projectId: "bili-dev",
  storageBucket: "bili-dev.appspot.com",
  messagingSenderId: "213696605314",
  appId: "1:213696605314:web:0c52d075195101b484989b",
  measurementId: "G-2QYDPXDQ08",
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
}

export const auth = getAuth();
export const db = getFirestore(app);

export default firebaseConfig;
