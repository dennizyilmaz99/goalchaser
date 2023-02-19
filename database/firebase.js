//Here is my Firebase config and auth
import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAU9v0_zLS4a7NXuUQq8cuv7weUxgebTYs",
  authDomain: "goalchaser-88723.firebaseapp.com",
  projectId: "goalchaser-88723",
  storageBucket: "goalchaser-88723.appspot.com",
  messagingSenderId: "538174495317",
  appId: "1:538174495317:web:e448f463ce523278c092dc",
  measurementId: "G-LSQR2X5Q7T",
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

export { auth };
