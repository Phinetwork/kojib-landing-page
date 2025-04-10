// JavaScript code for chatbot functionality

// Elements
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
const CHATBOT_API_URL = "https://asterion-chatbackend.vercel.app/api/chat";
const SOCIAL_BACKEND_URL = "https://social-backend-tsg5.onrender.com";

// Conversation history to maintain AI Assistant context
let conversationHistory = [];

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

// Show Registration Form
registerButton.addEventListener("click", () => {
    loginSection.style.display = "none";
    registerSection.style.display = "flex";
});

// Back to Login Form
backToLogin.addEventListener("click", () => {
    registerSection.style.display = "none";
    loginSection.style.display = "flex";
});

// Registration Logic
createAccountButton.addEventListener("click", async () => {
    const username = registerUsername.value.trim();
    const email = registerEmail.value.trim();
    const password = registerPassword.value.trim();

    if (!username || !email || !password) {
        alert("All fields are required.");
        return;
    }

    try {
        const response = await fetch(`${SOCIAL_BACKEND_URL}/api/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
        });

        if (response.ok) {
            alert("Account created successfully! Please log in.");
            backToLogin.click();
        } else {
            const error = await response.json();
            alert(error.error || "Failed to create account.");
        }
    } catch (error) {
        console.error("Registration Error:", error);
        alert("An error occurred during registration. Please try again.");
    }
});

// Guest Login Logic
guestLogin.addEventListener("click", async () => {
    try {
        const response = await fetch(`${SOCIAL_BACKEND_URL}/api/guest-login`, { method: "POST" });
        const data = await response.json();

        if (response.ok && data.username) {
            alert(`Welcome, ${data.username}!`);
            loginSection.style.display = "none";
            chatRooms.style.display = "block";
            chatInputSection.style.display = "block";
        } else {
            alert(data.error || "Guest login failed.");
        }
    } catch (error) {
        console.error("Guest Login Error:", error);
        alert("An error occurred. Please try again.");
    }
});

// AI Assistant Message Handling
sendMessage.addEventListener("click", async () => {
    const message = userInput.value.trim();
    if (!message) return;

    // Display User Message
    addMessage(message, "user");
    userInput.value = "";

    // Add user message to conversation history
    conversationHistory.push({ role: "user", content: message });

    // Show thinking bubbles
    showThinkingBubbles();

    // Call the Backend API
    const botReply = await getBotReply(message);

    // Remove thinking bubbles
    removeThinkingBubbles();

    // Display Bot Reply
    addMessage(botReply, "bot");
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

function addMessage(text, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);
    messageDiv.innerText = text;
    chatbotMessages.appendChild(messageDiv);

    // Scroll to the bottom of the container
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}


// Show Thinking Bubbles
function showThinkingBubbles() {
    const thinkingDiv = document.createElement("div");
    thinkingDiv.id = "thinking-bubbles";
    thinkingDiv.classList.add("message", "bot"); // Style it as a bot message
    thinkingDiv.innerHTML = `
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
    `;
    chatbotMessages.appendChild(thinkingDiv);

    // Auto-scroll to the latest message
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Remove Thinking Bubbles
function removeThinkingBubbles() {
    const thinkingDiv = document.getElementById("thinking-bubbles");
    if (thinkingDiv) {
        chatbotMessages.removeChild(thinkingDiv);
    }
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
            const error = await response.text();
            console.error("Backend error:", error);
            return "Sorry, there was an issue connecting to the chatbot.";
        }

        const data = await response.json();
        return data.reply || "No response received.";
    } catch (error) {
        console.error("Network error:", error.message);
        return "Sorry, I encountered a network error. Please try again.";
    }
}

// Handle Enter Key for Sending Messages
userInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault(); // Prevent adding a newline
        sendMessage.click(); // Trigger the Send button programmatically
    }
});




// Optional: Handle Room Messages
sendRoomMessage.addEventListener("click", () => {
    const roomMessage = roomInput.value.trim();
    if (roomMessage) {
        console.log("Message sent to the room:", roomMessage); // Placeholder for backend integration
        roomInput.value = "";
    }
});
