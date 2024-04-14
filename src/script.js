function toggleForms() {
    var loginForm = document.getElementById('login-form');
    var signupForm = document.getElementById('signup-form');

    if (loginForm.style.display === "none") {
        loginForm.style.display = "block";
        signupForm.style.display = "none";
    } else {
        loginForm.style.display = "none";
        signupForm.style.display = "block";
    }
}