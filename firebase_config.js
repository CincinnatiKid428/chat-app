// File: firebase_config.js
// This config is shared with a shopping list demo app but will use a separate collection [Messages]


//Import required Firebase modules
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

//Import AsyncStorage for caching
import AsyncStorage from '@react-native-async-storage/async-storage';

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

//Initialize auth with persistence so users can retain their uid
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const db = getFirestore(app);


//Export instances
export { app, auth, db };
