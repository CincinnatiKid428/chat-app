// File: firebase_config.js
// This config is shared with a shopping list demo app but will use a separate collection [Messages]


//Import required Firebase modules
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

//Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAA_zM-4Z_bV2QX8nP1gGqqPid4bdbzJig",
  authDomain: "shopping-list-demo-baf15.firebaseapp.com",
  projectId: "shopping-list-demo-baf15",
  storageBucket: "shopping-list-demo-baf15.firebasestorage.app",
  messagingSenderId: "108442080348",
  appId: "1:108442080348:web:45c6f6abe18f340f53c299"
};

//Initialize the Firebase app (only once)
const app = initializeApp(firebaseConfig);

//Export instances
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
