import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDx4U55opXuAW-GCBsCrxhF58uudrWfxuU",
  authDomain: "charles-sensitivity.firebaseapp.com",
  projectId: "charles-sensitivity",
  storageBucket: "charles-sensitivity.firebasestorage.app",
  messagingSenderId: "1027657362793",
  appId: "1:1027657362793:web:4e0b9172c52f164059e1f8"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);