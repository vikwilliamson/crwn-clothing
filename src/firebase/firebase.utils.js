import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyA9lBGe-SXd7pQrxXgxbdY_e0BTgsK4LUE",
  authDomain: "crwn-clothing-atl.firebaseapp.com",
  databaseURL: "https://crwn-clothing-atl.firebaseio.com",
  projectId: "crwn-clothing-atl",
  storageBucket: "crwn-clothing-atl.appspot.com",
  messagingSenderId: "1038179397813",
  appId: "1:1038179397813:web:4e56c95261017bfdb14efc",
  measurementId: "G-F5V4C71EHY"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
