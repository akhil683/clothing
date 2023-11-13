import { initializeApp } from "firebase/app";
import {
    getAuth, 
    signInWithPopup,
    createUserWithEmailAndPassword,
    GoogleAuthProvider } from 'firebase/auth';
import { 
    getFirestore,
    doc,
    setDoc,
    getDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCbQZqTBpDV572JR6etv2tYFzn1wROEEog",
  authDomain: "clothing-app-74c5d.firebasepp.com",
  projectId: "clothing-app-74c5d",
  storageBucket: "clothing-app-74c5d.appspot.com",
  messagingSenderId: "946656958760", 
  appId: "1:946656958760:web:e7d542676b5ee6cdc5581d",
  measurementId: "G-E7QH6T81RX"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInfo={}) => {
    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
    
    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createAt,
                ...additionalInfo,
            })
        } catch (e) {
            console.log(e.message);
        }
    }
    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password)
}