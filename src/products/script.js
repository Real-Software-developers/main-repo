// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js";

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
const storage = getStorage(app);
// Function to submit the form and write data to Firebase Realtime Database and Firestore
document.getElementById('ProductsForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form values
    const shopName = document.getElementById('shopname').value;
    const productName = document.getElementById('productname').value;
    const productPrice = document.getElementById('productprice').value;
    const description = document.getElementById('message').value;
    const imageFile = document.getElementById('productimage').files[0];
    const category = document.getElementById('category').value; // Get selected category

    // Reference to the Firebase Realtime Database
    const databaseRef = ref(database, 'Products');

    // Push data to Firebase Realtime Database
    const newProductRef = push(databaseRef);

    // Upload image to Firebase Storage
    const imageRef = storageRef(storage, 'product_images/' + imageFile.name);
    await uploadBytes(imageRef, imageFile);

    // Get image URL
    const imageUrl = await getDownloadURL(imageRef);

    // Set data in Firebase Realtime Database
    set(newProductRef, {
        shopName: shopName,
        productName: productName,
        productPrice: productPrice,
        description: description,
        imageUrl: imageUrl,
        category: category // Include category in the data
    }).then(() => {
        console.log("Product data added to Firebase Realtime Database");
        // Reset form
        document.getElementById('ProductsForm').reset();
    }).catch((error) => {
        console.error("Error adding product data to Firebase Realtime Database:", error);
    });
});
