import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase's web config is not a secret — it identifies the project, not a
// credential. Access to data is controlled by Firestore Security Rules
// (see the "Editing access" note in README.md), not by hiding this object.
const firebaseConfig = {
  apiKey: "AIzaSyC_ImiS41IQQ2oD4DS4LBs0G2NGiR6rudI",
  authDomain: "mediaprod-c69fa.firebaseapp.com",
  projectId: "mediaprod-c69fa",
  storageBucket: "mediaprod-c69fa.firebasestorage.app",
  messagingSenderId: "202364333539",
  appId: "1:202364333539:web:13a491f58f41d87736c4d6",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
