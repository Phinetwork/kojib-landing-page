<?php
require '../config.php'; // Load environment variables and constants
require '../src/TokenManager.php';

// Check if the SSO token exists in the cookie
$token = $_COOKIE['kojib_sso'] ?? '';

if ($token) {
    // Invalidate the token (e.g., remove it from the database or cache if stored)
    $tokenManager = new TokenManager();
    $userId = $tokenManager->validateToken($token);

    if ($userId) {
        // Perform token invalidation if using a centralized storage like Redis or database
        // Example: removeTokenFromStorage($token);
    }
}

// Clear the token cookie
setcookie('kojib_sso', '', time() - 3600, '/', '.kojib.com', true, true);

// Redirect the user to the login page
header('Location: /login');
exit;
?>
