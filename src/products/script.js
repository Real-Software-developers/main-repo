// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCDvwIj5sxqJE-yIrkQhBtPLAWDlKxY-zU",
    authDomain: "entiresystem-7ea4f.firebaseapp.com",
    databaseURL: "https://entiresystem-7ea4f-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "entiresystem-7ea4f",
    storageBucket: "entiresystem-7ea4f.appspot.com",
    messagingSenderId: "25619596774",
    appId: "1:25619596774:web:e296b99271610195690227",
    measurementId: "G-LXVGY3MW22"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase();

// Function to submit the form and write data to Firebase Realtime Database and Firestore
document.getElementById('ProductsForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form values
    const shopName = document.getElementById('shopname').value;
    const productName = document.getElementById('productname').value;
    /*const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;*/
    const productPrice = document.getElementById('productprice').value;
    const description = document.getElementById('message').value;

    // Reference to the Firebase Realtime Database
    const databaseRef = ref(database, 'Products');

    // Push data to Firebase Realtime Database
    const newProductRef = push(databaseRef);
    set(newProductRef, {
        shopName: shopName,
        productName: productName,
        productPrice: productPrice,
        description: description
    }).then(() => {
        console.log("Product data added to Firebase Realtime Database");
        // Reset form
        document.getElementById('ProductsForm').reset();
    }).catch((error) => {
        console.error("Error adding product data to Firebase Realtime Database:", error);
    });

    // Reference to the "shops" collection
    // const shopsRef = ref(database, 'shops');

    // // Push data to Firebase Realtime Database for "shops" collection
    // const newShopRef = push(shopsRef);
    // set(newShopRef, {
    // 	shopName: shopName,
    // 	description: description,
    // 	location: location
    // }).then(() => {
    // 	console.log("Shop details added to Firebase Realtime Database for 'shops' collection");
    // 	// Reset form
    // 	document.getElementById('shopOwnerForm').reset();
    // }).catch((error) => {
    // 	console.error("Error adding shop details to Firebase Realtime Database for 'shops' collection:", error);
    // });
});
