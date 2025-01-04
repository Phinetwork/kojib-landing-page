<?php
require '../../config.php'; // Load environment variables and constants
require '../../src/UserManager.php';
require '../../src/TokenManager.php';

// Set the response type to JSON
header('Content-Type: application/json');

// Check the request method
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['status' => 'error', 'message' => 'Only GET method is allowed.']);
    exit;
}

// Check if the token is provided in the request
$token = $_GET['token'] ?? '';
if (empty($token)) {
    http_response_code(400); // Bad Request
    echo json_encode(['status' => 'error', 'message' => 'Token is required.']);
    exit;
}

// Validate the token
$tokenManager = new TokenManager();
$userId = $tokenManager->validateToken($token);

if (!$userId) {
    http_response_code(401); // Unauthorized
    echo json_encode(['status' => 'error', 'message' => 'Invalid or expired token.']);
    exit;
}

// Fetch user details from the database
$userManager = new UserManager();
$user = $userManager->getUserById($userId);

if (!$user) {
    http_response_code(404); // Not Found
    echo json_encode(['status' => 'error', 'message' => 'User not found.']);
    exit;
}

// Return user details (exclude sensitive information like password hash)
echo json_encode([
    'status' => 'success',
    'data' => [
        'id' => $user['id'],
        'username' => $user['username'],
        'email' => $user['email']
    ]
]);
