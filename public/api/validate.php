<?php
require '../../src/TokenManager.php';

header('Content-Type: application/json');

$token = $_GET['token'] ?? '';
$tokenManager = new TokenManager();

$userId = $tokenManager->validateToken($token);

if ($userId) {
    echo json_encode(['status' => 'success', 'user_id' => $userId]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid token']);
}
?>
