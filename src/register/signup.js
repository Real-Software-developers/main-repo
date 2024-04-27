// Initialize EmailJS
emailjs.init("_9cCImG_eM_ixRlo6");

// Add event listener to form submission
document.getElementById('signup-form').addEventListener('submit', async (e) => {
    // Prevent default form submission
    e.preventDefault();

    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const shopName = document.getElementById('shop-name').value;
    const location = document.getElementById('location').value;
    const description = document.getElementById('description').value;

    // Get error message element
    const errorMessage = document.getElementById('error-message');

    try {
        // Send email with user information
        await emailjs.send("service_a5itk56", "template_dc04a19", {
            ownerName: name,
            userEmail: email,
            shopName: shopName,
            location: location,
            description: description
        });

        // Log success message
        console.log('Email sent successfully!');
        
        // Redirect to a new page or show success message
        // Example: window.location.href = 'success.html';
    } catch (error) {
        // Display error message if sending email fails
        errorMessage.textContent = error.message;
    }
});



