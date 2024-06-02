<?php
$host = getenv('DB_HOST');
$dbname = getenv('DB_NAME');
$username = getenv('DB_USERNAME');
$password = getenv('DB_PASSWORD');
$port = getenv('DB_PORT');

try {
    $dbh = new PDO("mysql:host=$host;port=$port;dbname=$dbname", $username, $password);
    echo "Connected to database successfully!";
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
