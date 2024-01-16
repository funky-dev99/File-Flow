import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAMmm5kz6i7UhAYeR07-_B9pG5teq89Ke8",
  authDomain: "file-flow11.firebaseapp.com",
  projectId: "file-flow11",
  storageBucket: "file-flow11.appspot.com",
  messagingSenderId: "331222125160",
  appId: "1:331222125160:web:73d9f2aa907307d87bc9dd",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
