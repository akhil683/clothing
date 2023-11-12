import { initializeApp } from "firebase/app";
import {
    getAuth, 
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider } from 'firebase/auth';
import { 
    getFirestore,
    doc,
    setDoc,
    getDoc } from 'firebase/firestore';
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCbQZqTBpDV572JR6etv2tYFzn1wROEEog",
  authDomain: "clothing-app-74c5d.firebaseapp.com",
  projectId: "clothing-app-74c5d",
  storageBucket: "clothing-app-74c5d.appspot.com",
  messagingSenderId: "946656958760",
  appId: "1:946656958760:web:e7d542676b5ee6cdc5581d",
  measurementId: "G-E7QH6T81RX"
};

const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot.exists());
    
    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createAt
            })
        } catch (e) {
            console.log(e.message);
        }
    }
    return userDocRef;
}