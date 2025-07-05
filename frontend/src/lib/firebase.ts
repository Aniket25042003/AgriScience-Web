import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCc-Tg6QfOGWV1BGNXIkk36Jv_-pp4JjBI",
  authDomain: "agriscience-a65ad.firebaseapp.com",
  databaseURL: "https://agriscience-a65ad-default-rtdb.firebaseio.com",
  projectId: "agriscience-a65ad",
  storageBucket: "agriscience-a65ad.firebasestorage.app",
  messagingSenderId: "265446873897",
  appId: "1:265446873897:web:6cdc8988d13df20f3d3538",
  measurementId: "G-SQDLSS2MS0"
};

// Initialize Firebase only if it hasn't been initialized already
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);