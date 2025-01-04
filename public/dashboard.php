<?php
require '../config.php'; // Load environment variables and constants
require '../src/TokenManager.php';
require '../src/UserManager.php';

// Check for the SSO token in cookies
$token = $_COOKIE['kojib_sso'] ?? '';
$tokenManager = new TokenManager();
$userId = $tokenManager->validateToken($token);

// Redirect to login page if token is invalid
if (!$userId) {
    header('Location: /login');
    exit;
}

// Fetch user details from the database
$userManager = new UserManager();
$user = $userManager->getUserById($userId);

// Handle case where the user is not found (unlikely if token is valid)
if (!$user) {
    setcookie('kojib_sso', '', time() - 3600, '/', '.kojib.com', true, true); // Clear the invalid cookie
    header('Location: /login');
    exit;
}

// Extract user details
$username = htmlspecialchars($user['username']);
$email = htmlspecialchars($user['email']); // Example additional detail
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kojib Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            background: #f4f7fc;
            font-family: Arial, sans-serif;
            padding: 2rem;
        }
        .dashboard-container {
            max-width: 800px;
            margin: 0 auto;
        }
        .card {
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        .btn-app {
            display: block;
            width: 100%;
            margin: 0.5rem 0;
        }
        .btn-logout {
            background-color: #ff6f61;
            border: none;
        }
        .btn-logout:hover {
            background-color: #ff8a75;
        }
    </style>
</head>
<body>
    <div class="dashboard-container">
        <h1 class="text-center">Welcome, <?php echo $username; ?>!</h1>
        <p class="text-center">Email: <?php echo $email; ?></p>
        <div class="card p-4 mt-4">
            <h2>Apps</h2>
            <a href="https://chat.kojib.com" class="btn btn-primary btn-app">Go to Kojib Chat</a>
            <a href="https://connect.kojib.com" class="btn btn-primary btn-app">Go to Kojib Connect</a>
        </div>
        <div class="text-center mt-4">
            <form action="/logout" method="POST">
                <button class="btn btn-logout">Logout</button>
            </form>
        </div>
    </div>
</body>
</html>
