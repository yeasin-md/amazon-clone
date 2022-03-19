// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';
const firebaseConfig = {
  apiKey: 'AIzaSyDC-wwgpUvbmkq2ijpg-gk8aqP3KmQHzmg',
  authDomain: 'clone-ymd.firebaseapp.com',
  projectId: 'clone-ymd',
  storageBucket: 'clone-ymd.appspot.com',
  messagingSenderId: '668839386080',
  appId: '1:668839386080:web:782ca799b64c70800a6985',
  measurementId: 'G-KJ4SBGXC9D',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
