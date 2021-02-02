import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";


var firebaseConfig = {
    
    // apiKey: "##########",
    // authDomain: "#######################",
    // projectId: "#############",
    // storageBucket: "##############",
    // messagingSenderId: "#############",
    // appId: "###################",
    // measurementId: "###########"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();



const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
    auth.signInWithPopup(provider);
};


export const generateUserDocument = async (user, additionalData) => {
    if (!user) return;
    const userRef = firestore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
        const { email, displayName, photoURL } = user;
        try {
            await userRef.set({
            displayName,
            email,
            photoURL,
            role: 1,
            hasStore: false,
            ...additionalData
            });
        } catch (error) {
            console.error("Error creating user document", error);
        }
    }
    return getUserDocument(user.uid);
};

const getUserDocument = async uid => {
    if (!uid) return null;
    try {
        const userDocument = await firestore.doc(`users/${uid}`).get();
        return {
            uid,
            ...userDocument.data()
        };
    } catch (error) {
        console.error("Error fetching user", error);
    }
};