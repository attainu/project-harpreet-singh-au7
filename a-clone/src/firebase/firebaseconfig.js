import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA1aMjo2w4KJX1-huF7atNvAaVzrBljeIY",
  authDomain: "aclone-4da0f.firebaseapp.com",
  databaseURL: "https://aclone-4da0f.firebaseio.com",
  projectId: "aclone-4da0f",
  storageBucket: "aclone-4da0f.appspot.com",
  messagingSenderId: "198945304223",
  appId: "1:198945304223:web:649a94cc3ddbae54acbcaa",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
