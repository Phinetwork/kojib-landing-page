import { registerUser, loginUser } from './api.js';

// Handle registration
export async function handleRegister(event) {
    event.preventDefault(); // Prevent form submission from reloading the page

    const username = document.getElementById("register-username").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    try {
        const response = await registerUser(username, email, password);
        alert("Registration successful! You can now log in.");
        console.log("User ID:", response.userId);
        document.getElementById("register-form").reset();
    } catch (error) {
        alert(`Registration failed: ${error.message}`);
    }
}

// Handle login
export async function handleLogin(event) {
    event.preventDefault(); // Prevent form submission from reloading the page

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
        const response = await loginUser(email, password);
        localStorage.setItem("token", response.token); // Save token for future requests
        localStorage.setItem("userId", response.userId); // Save user ID
        alert("Login successful!");
        console.log("Token:", response.token);
        document.getElementById("login-form").reset();
    } catch (error) {
        alert(`Login failed: ${error.message}`);
    }
}
