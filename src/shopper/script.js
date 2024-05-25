import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
		import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";
		import { getDatabase, ref, push, set,get } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
		import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
	
		// Your Firebase configuration
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
	
		
		// Initialize Firebase app
		const app = initializeApp(firebaseConfig);
		const analytics = getAnalytics(app);
		const database = getDatabase(app);
		const auth = getAuth(app); // Get the auth object
		
	
		// Function to handle user registration with email and password
		document.getElementById('Register').addEventListener('submit', async function(e) {
			e.preventDefault();
	
			// Get form values
			const name = document.getElementById('name').value;
			const email = document.getElementById('email').value;
			const password = document.getElementById('password').value;
			const message = document.getElementById('message').value;
			localStorage.setItem('username',name);
	
			try {
				// Create user with email and password
				const userCredential = await createUserWithEmailAndPassword(auth, email, password);
				const user = userCredential.user;
	
				// Send email verification
				await sendEmailVerification(auth.currentUser);
	
				// Reference to the Firebase Realtime Database
				const databaseRef = ref(database, 'shoppers');
	
				// Push data to Firebase Realtime Database for shoppers collection
				const newShopperRef = push(databaseRef);
				set(newShopperRef, {
					userId: user.uid, // Add user ID to shopper data
					name: name,
					email: email,
					message: message
				}).then(() => {
					console.log("Shopper data added to Firebase Realtime Database");
					// Store email and username in local storage
					localStorage.setItem('userEmail', email);
					localStorage.setItem('username', name);
					console.log("User data stored in local storage");
					// Reset form
					document.getElementById('Register').reset();
				}).catch((error) => {
					console.error("Error adding shopper data to Firebase Realtime Database:", error);
				});
			} catch (error) {
				console.error("Error creating user:", error);
				// Check if the error is related to an invalid email
				if (error.code === "auth/invalid-email") {
					// Display an alert message indicating that the email is not valid
					alert("Invalid email. Please provide a valid email address.");
				}
			}
		});
	
		// Function to handle user login with email and password
		document.getElementById('Login').addEventListener('submit', async function(e) {
			e.preventDefault();
	
			// Get email and password from the form
			const email = document.getElementById('login-email').value;
			const password = document.getElementById('login-password').value;
	
			try {
				// Sign in user with email and password
				const userCredential = await signInWithEmailAndPassword(auth, email, password);
				const user = userCredential.user;
	
				// Check if the user's email is verified
				if (user.emailVerified) {
					// User is signed in and email is verified, allow access to protected pages
					// Redirect to the desired page
					window.location.href = '/';
				} else {
					// User's email is not verified, display an alert
					alert("Please verify your email address before logging in.");
				}
			} catch (error) {
				console.error("Error signing in:", error);
				// Display error message to the user
				alert("An error occurred during login. Please check your email and password and try again.");
			}
		});
	