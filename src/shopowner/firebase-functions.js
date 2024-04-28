// Function to sign up a shop owner
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


    firebase.initializeApp(firebaseConfig);

    var messagesRef = firebase.database()
                                    .ref();

document.getElementById('contactForm')
.addEventListener('submit', submitForm);

function submitForm(e) {
e.preventDefault();

// Get values
var fname = getInputVal('fname');
var lname = getInputVal('lname');
var phone = getInputVal('phone');
var email = getInputVal('email');
var message = getInputVal("message");

saveMessage(fname, lname, phone, email, message);
document.getElementById('contactForm').reset();
}

// Function to get form values
function getInputVal(id) {
return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(fname, lname, phone, email, message) {
var newMessageRef = messagesRef.push();
newMessageRef.set({
 fname: fname,
 lname: lname,
 phone: phone,
 email: email,
 message: message,
});
}

function signUpShopOwner() {
    const name = document.getElementById('name').value;
    const shopName = document.getElementById('shopname').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const location = document.getElementById('Location').value;
    const description = document.getElementById('message').value;

    // Sign up the user using email and password
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // User signed up successfully
            const user = userCredential.user;
            console.log('User signed up:', user);

            // Store additional information in Firestore
            const db = firebase.firestore();
            db.collection("shopOwners").doc(user.uid).set({
                name: name,
                shopName: shopName,
                phone: phone,
                email: email,
                location: location,
                description: description
            })
            .then(() => {
                console.log("Shop owner data added to Firestore");
                // Redirect or perform any other action as needed
            })
            .catch((error) => {
                console.error("Error adding shop owner data:", error);
            });
        })
        .catch((error) => {
            // Handle errors
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Sign up error:', errorCode, errorMessage);
        });
}
