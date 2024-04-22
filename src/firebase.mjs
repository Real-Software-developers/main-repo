import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBxW-EgVHsLrcALcx5ZEsdw82pKNjPkTG0",
  authDomain: "softwaredev-ae453.firebaseapp.com",
  projectId: "softwaredev-ae453",
  storageBucket: "softwaredev-ae453.appspot.com",
  messagingSenderId: "1088760396379",
  appId: "1:1088760396379:web:ede1cf09d18abe672ddd7e",
};

const app = initializeApp(firebaseConfig);
const authentication = getAuth(app);
const firestore = getFirestore(app);

export { authentication, firestore };
