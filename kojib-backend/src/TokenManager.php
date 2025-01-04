<?php
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class TokenManager {
    private $secret;

    public function __construct() {
        $this->secret = $_ENV['JWT_SECRET'];
    }

    public function generateToken($userId) {
        $payload = [
            'iss' => 'kojib.com',
            'sub' => $userId,
            'iat' => time(),
            'exp' => time() + 3600 * 24 * 7 // 7 days expiry
        ];
        return JWT::encode($payload, $this->secret, 'HS256');
    }

    public function validateToken($token) {
        try {
            $decoded = JWT::decode($token, new Key($this->secret, 'HS256'));
            return $decoded->sub;
        } catch (Exception $e) {
            return false;
        }
    }
}
?>
