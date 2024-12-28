// JavaScript code for chatbot functionality
const chatbotButton = document.getElementById("chatbot-button");
const chatbot = document.getElementById("chatbot");
const closeChatbot = document.getElementById("close-chatbot");
const aiTab = document.getElementById("ai-tab");
const userChatTab = document.getElementById("user-chat-tab");
const aiChat = document.getElementById("ai-chat");
const userChat = document.getElementById("user-chat");

// AI Assistant elements
const sendMessage = document.getElementById("send-message");
const userInput = document.getElementById("user-input");
const chatbotMessages = document.getElementById("chatbot-messages");
const loadingIndicator = document.createElement("div");

// User chat elements
const guestLogin = document.getElementById("guest-login");
const registerButton = document.getElementById("register-button");
const registerSection = document.getElementById("user-chat-register");
const loginSection = document.getElementById("user-chat-login");
const backToLogin = document.getElementById("back-to-login");
const createAccountButton = document.getElementById("create-account");
const registerUsername = document.getElementById("register-username");
const registerEmail = document.getElementById("register-email");
const registerPassword = document.getElementById("register-password");
const chatRooms = document.getElementById("user-chat-rooms");
const chatInputSection = document.getElementById("user-chat-input");
const roomInput = document.getElementById("room-input");
const sendRoomMessage = document.getElementById("send-room-message");

// Backend API URLs
const CHATBOT_API_URL = "https://chatbot-backend-ntxt.onrender.com/api/chat";
const GUEST_LOGIN_API = "https://your-backend/api/guest-login";
const REGISTER_API = "https://your-backend/api/register";

// Conversation history to maintain AI Assistant context
let conversationHistory = [];

// Initialize loading indicator
loadingIndicator.id = "loading-indicator";
loadingIndicator.innerHTML = `
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
`;
chatbotMessages.appendChild(loadingIndicator);

// Hide loading indicator initially
loadingIndicator.style.display = "none";

// Toggle Chatbot Visibility
chatbotButton.addEventListener("click", () => {
    chatbot.style.display = "flex";
    chatbotButton.style.display = "none";
});

closeChatbot.addEventListener("click", () => {
    chatbot.style.display = "none";
    chatbotButton.style.display = "flex";
});

// Switch Tabs
aiTab.addEventListener("click", () => {
    aiTab.classList.add("active");
    userChatTab.classList.remove("active");
    aiChat.classList.add("active");
    userChat.classList.remove("active");
});

userChatTab.addEventListener("click", () => {
    userChatTab.classList.add("active");
    aiTab.classList.remove("active");
    userChat.classList.add("active");
    aiChat.classList.remove("active");
});

// Guest Login
guestLogin.addEventListener("click", async () => {
    try {
        const response = await fetch(GUEST_LOGIN_API, { method: "POST" });
        const data = await response.json();

        if (data.username) {
            alert(`Welcome, ${data.username}!`);
            loginSection.style.display = "none";
            chatRooms.style.display = "block";
            chatInputSection.style.display = "block";
        }
    } catch (error) {
        console.error("Guest Login Error:", error);
    }
});

// Show Registration Form
registerButton.addEventListener("click", () => {
    loginSection.style.display = "none";
    registerSection.style.display = "flex";
});

// Back to Login
backToLogin.addEventListener("click", () => {
    registerSection.style.display = "none";
    loginSection.style.display = "flex";
});

// Create Account
createAccountButton.addEventListener("click", async () => {
    const username = registerUsername.value.trim();
    const email = registerEmail.value.trim();
    const password = registerPassword.value.trim();

    if (!username || !email || !password) {
        alert("All fields are required.");
        return;
    }

    try {
        const response = await fetch(REGISTER_API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();

        if (data.success) {
            alert("Account created successfully! Please log in.");
            backToLogin.click();
        } else {
            alert(data.error || "Failed to create account.");
        }
    } catch (error) {
        console.error("Registration Error:", error);
    }
});

// Handle AI Assistant Message Sending
sendMessage.addEventListener("click", async () => {
    const message = userInput.value.trim();
    if (!message) return;

    // Display User Message
    addMessage(message, "user");
    userInput.value = "";

    // Add user message to conversation history
    conversationHistory.push({ role: "user", content: message });

    // Show loading indicator
    loadingIndicator.style.display = "block";

    // Call the Backend API
    const botReply = await getBotReply(message);

    // Hide loading indicator
    loadingIndicator.style.display = "none";

    // Display Bot Reply
    addMessage(botReply, "bot");

    // Add bot reply to conversation history
    conversationHistory.push({ role: "assistant", content: botReply });
});

// Add Message to Chat Window
function addMessage(text, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);
    messageDiv.innerText = text;
    chatbotMessages.appendChild(messageDiv);

    // Auto-scroll to the latest message
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Fetch Bot Reply from Backend
async function getBotReply(message) {
    try {
        const response = await fetch(CHATBOT_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message,
                history: conversationHistory, // Send conversation history for context
            }),
        });

        if (!response.ok) {
            console.error("Backend error:", response.statusText);
            return "Sorry, there was an issue connecting to the chatbot.";
        }

        const data = await response.json();
        return data.reply || "No response received.";
    } catch (error) {
        console.error("Network error:", error.message);
        return "Sorry, I encountered a network error. Please try again.";
    }
}

// Optional: Handle 'Enter' Key for Sending AI Assistant Messages
userInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent newline in textarea
        sendMessage.click();
    }
});

// Optional: Handle Room Messages (Placeholder)
sendRoomMessage.addEventListener("click", () => {
    const roomMessage = roomInput.value.trim();
    if (roomMessage) {
        console.log("Message sent to the room:", roomMessage); // Replace with backend integration
        roomInput.value = "";
    }
});
