import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDwKcR_CY6WdEb5ze9bIIKODdgZoOyg8IY",
  authDomain: "pellifix-1b6dd.firebaseapp.com",
  projectId: "pellifix-1b6dd",
  storageBucket: "pellifix-1b6dd.appspot.com",
  messagingSenderId: "980990145965",
  appId: "1:980990145965:web:295941d6956819b8315d24",
  measurementId: "G-JJNHZX4P0N"
};

firebase.initializeApp(firebaseConfig);

export default firebase