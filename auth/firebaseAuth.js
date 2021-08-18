import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

//DEVELOPMENT
// const firebaseConfig = {
//   apiKey: "AIzaSyD6TRxrFaPYUMwBK9mePe1pFpalvQ_TuZ4",
//   authDomain: "aya-zay-dev.firebaseapp.com",
//   databaseURL: "https://aya-zay-dev.firebaseio.com",
//   projectId: "aya-zay-dev",
//   storageBucket: "aya-zay-dev.appspot.com",
//   messagingSenderId: "128908156769",
//   appId: "1:128908156769:web:472aaa4b6bba088063af20",
//   measurementId: "G-SYG7PJMP4Q"
// };

//Production 
const firebaseConfig = {
  apiKey: "AIzaSyAb3eOtUxvydaqfCLqDFf1EzLF3rm9ukYY",
  authDomain: "aya-zay-prod.firebaseapp.com",
  databaseURL: "https://aya-zay-prod.firebaseio.com",
  projectId: "aya-zay-prod",
  storageBucket: "aya-zay-prod.appspot.com",
  messagingSenderId: "1053120586391",
  appId: "1:1053120586391:web:3a584b686b5560aeefbfd2",
  measurementId: "G-5MH950BWQM"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}



var googleProvider = new firebase.auth.GoogleAuthProvider();
var facebookProvider = new firebase.auth.FacebookAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
facebookProvider.addScope('public_profile,email');
facebookProvider.setCustomParameters({ prompt: 'select_account' });


export const auth = firebase.auth();
export const googleLogin = () => auth.signInWithPopup(googleProvider);
export const facebookLogin = () => auth.signInWithPopup(facebookProvider);

export default firebase;