<?php
require_once 'Database.php';

class UserManager {
    private $db;

    public function __construct() {
        $this->db = (new Database())->getConnection();
    }

    public function authenticate($username, $password) {
        $stmt = $this->db->prepare("SELECT id, password_hash FROM users WHERE username = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows === 1) {
            $user = $result->fetch_assoc();
            if (password_verify($password, $user['password_hash'])) {
                return $user;
            }
        }

        return false;
    }

    public function getUserById($userId) {
        $stmt = $this->db->prepare("SELECT id, username FROM users WHERE id = ?");
        $stmt->bind_param("i", $userId);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }
}
?>
