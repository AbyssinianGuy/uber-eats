// before it was import firebase from 'firebase'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyBeXM28Hd-tkvw7hHLSj2NS9S_Xit4Csyk",
    authDomain: "uber-eats-678d1.firebaseapp.com",
    projectId: "uber-eats-678d1",
    storageBucket: "uber-eats-678d1.appspot.com",
    messagingSenderId: "516608326723",
    appId: "1:516608326723:web:073bc0b556fb41f8af28f6"
};

firebase.apps.length ? firebase.app() : firebase.initializeApp(firebaseConfig);
export default firebase
