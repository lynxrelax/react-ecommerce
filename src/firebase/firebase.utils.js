// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // import { getAnalytics } from "firebase/analytics";

// // import firebase from 'firebase/app';
// import 'firebase/firestore';
// import 'firebase/auth';
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAqZ_QxlFB1OPjRLZMcB7EuP9TE9IIhKvM",
//   authDomain: "crwn-db-6e6b8.firebaseapp.com",
//   projectId: "crwn-db-6e6b8",
//   storageBucket: "crwn-db-6e6b8.appspot.com",
//   messagingSenderId: "208307272649",
//   appId: "1:208307272649:web:3f13ae7da6b53fb98f4618",
//   measurementId: "G-ZV5QM765FR"
// };

// // Initialize Firebase
// // const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);

// const firebase = initializeApp(firebaseConfig);
// export const auth = firebase.auth(); 
// export const firestore = firebase.firestore();

// const provider = new firebase.auth.GoogleAuthProvider();
// provider.setCustomParameters({ prompt: 'select_account' });
// export const signInWithGoogle = () => auth.signInWithPopup(provider) ;

// export default firebase;

import firebase from "firebase/compat/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, getDoc, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAqZ_QxlFB1OPjRLZMcB7EuP9TE9IIhKvM",
  authDomain: "crwn-db-6e6b8.firebaseapp.com",
  projectId: "crwn-db-6e6b8",
  storageBucket: "crwn-db-6e6b8.appspot.com",
  messagingSenderId: "208307272649",
  appId: "1:208307272649:web:3f13ae7da6b53fb98f4618",
  measurementId: "G-ZV5QM765FR"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return; //if userAuth is null, then don't do anything
  const userRef = doc(firestore, `users/${userAuth.uid}`);
  const snapShot = await getDoc(userRef);
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

// export const addCollectionAndDocuments = async (
//   collectionKey,
//   objectsToAdd
// ) => {
//   const collectionRef = firestore.collection(collectionKey);

//   const batch = firestore.batch();
//   objectsToAdd.forEach((obj) => {
//     const newDocRef = collectionRef.doc();
//     batch.set(newDocRef, obj);
//   });

//   return await batch.commit();
// };

firebase.initializeApp(firebaseConfig);

export const auth = getAuth();
export const firestore = getFirestore();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => signInWithPopup(auth, provider);
export default firebase;