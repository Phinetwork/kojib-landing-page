// JavaScript code for chatbot functionality
const chatbotButton = document.getElementById("chatbot-button");
const chatbot = document.getElementById("chatbot");
const closeChatbot = document.getElementById("close-chatbot");
const sendMessage = document.getElementById("send-message");
const userInput = document.getElementById("user-input");
const chatbotMessages = document.getElementById("chatbot-messages");

// Backend API URL
const CHATBOT_API_URL = "https://chatbot-backend-ntxt.onrender.com/api/chat";

// Toggle Chatbot Visibility
chatbotButton.addEventListener("click", () => {
    chatbot.style.display = "flex";
    chatbotButton.style.display = "none";
});

closeChatbot.addEventListener("click", () => {
    chatbot.style.display = "none";
    chatbotButton.style.display = "flex";
});

// Handle Sending Messages
sendMessage.addEventListener("click", async () => {
    const message = userInput.value.trim();
    if (!message) return;

    // Display User Message
    addMessage(message, "user");
    userInput.value = "";

    // Call the Backend API
    const botReply = await getBotReply(message);
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

// Fetch Bot Reply from Backend
async function getBotReply(message) {
    try {
        const response = await fetch(CHATBOT_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message }),
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

// Optional: Handle 'Enter' Key for Sending Messages
userInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent newline in textarea
        sendMessage.click();
    }
});
