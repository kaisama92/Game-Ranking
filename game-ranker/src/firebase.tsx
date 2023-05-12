import { FirebaseApp, initializeApp } from "firebase/app";
import { Firestore, getFirestore } from 'firebase/firestore';

const firebaseConfig : { apiKey: string | undefined, authDomain: string | undefined, projectId: string | undefined, storageBucket: string | undefined, messagingSenderId: string | undefined, appId: string | undefined } = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID 
}

const app: FirebaseApp = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);

export default db;