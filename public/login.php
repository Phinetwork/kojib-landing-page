<?php
// Load backend dependencies
require '../config.php'; // Load environment variables and constants
require '../src/UserManager.php';
require '../src/TokenManager.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitize user input
    $username = htmlspecialchars(strip_tags($_POST['username']));
    $password = htmlspecialchars(strip_tags($_POST['password']));

    try {
        // Authenticate the user
        $userManager = new UserManager();
        $user = $userManager->authenticate($username, $password);

        if ($user) {
            // Generate a secure token
            $tokenManager = new TokenManager();
            $token = $tokenManager->generateToken($user['id']);

            // Set the token as a secure cookie, accessible across all subdomains
            setcookie('kojib_sso', $token, time() + 3600 * 24 * 7, '/', '.kojib.com', true, true);

            // Redirect to the dashboard
            header('Location: /dashboard');
            exit;
        } else {
            // Invalid credentials
            $error = "Invalid username or password.";
        }
    } catch (Exception $e) {
        // Handle unexpected errors
        $error = "An error occurred. Please try again later.";
        error_log($e->getMessage()); // Log the error for debugging
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kojib Login</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            background: linear-gradient(135deg, #1e3c72, #2a5298);
            color: #fff;
            font-family: Arial, sans-serif;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .login-container {
            background: rgba(255, 255, 255, 0.1);
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            width: 100%;
            max-width: 400px;
        }
        .login-container h1 {
            margin-bottom: 1.5rem;
            text-align: center;
        }
        .btn-primary {
            background-color: #ff6f61;
            border: none;
        }
        .btn-primary:hover {
            background-color: #ff8a75;
        }
        .error {
            color: #ff6f61;
            text-align: center;
            margin-bottom: 1rem;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <h1>Welcome to Kojib</h1>
        <?php if (!empty($error)): ?>
            <div class="error"><?php echo htmlspecialchars($error); ?></div>
        <?php endif; ?>
        <form action="/login" method="POST">
            <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" id="username" name="username" required>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" name="password" required>
            </div>
            <button type="submit" class="btn btn-primary w-100">Login</button>
        </form>
    </div>
</body>
</html>
