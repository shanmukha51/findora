import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth, setPersistence, browserLocalPersistence } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBqK-zv3CxOb3M4mA7SvdBjRbvhb1Fk6gU",
  authDomain: "finddora-e745f.firebaseapp.com",
  projectId: "finddora-e745f",
  storageBucket: "finddora-e745f.firebasestorage.app",
  messagingSenderId: "281911615749",
  appId: "1:281911615749:web:dd76ff9323b0d104c0576c",
  measurementId: "G-WQMNSFK02Z"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const authPersistence = setPersistence(auth, browserLocalPersistence);
