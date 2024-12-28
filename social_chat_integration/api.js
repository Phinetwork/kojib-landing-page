const BASE_URL = "https://social-backend-tsg5.onrender.com";

// Helper function to make API requests
async function apiRequest(endpoint, method = "GET", body = null, token = null) {
    const headers = {
        "Content-Type": "application/json",
    };
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const options = {
        method,
        headers,
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Something went wrong");
    }

    return response.json();
}

// Example API functions
export async function registerUser(username, email, password) {
    return apiRequest("/api/register", "POST", { username, email, password });
}

export async function loginUser(email, password) {
    return apiRequest("/api/login", "POST", { email, password });
}

export async function getProfile(userId, token) {
    return apiRequest(`/api/profile/${userId}`, "GET", null, token);
}

export async function followUser(followerId, followingId, token) {
    return apiRequest("/api/follow", "POST", { followerId, followingId }, token);
}
