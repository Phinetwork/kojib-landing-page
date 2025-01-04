<?php
require_once __DIR__ . '/vendor/autoload.php'; // Load Composer autoloader

// Load environment variables
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Database Configuration
define('DB_HOST', $_ENV['DB_HOST']);
define('DB_USER', $_ENV['DB_USER']);
define('DB_PASS', $_ENV['DB_PASS']);
define('DB_NAME', $_ENV['DB_NAME']);

// JWT Secret
define('JWT_SECRET', $_ENV['JWT_SECRET']);
?>
