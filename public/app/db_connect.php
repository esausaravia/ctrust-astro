<?php
// Configuración de la base de datos
$host = 'localhost';

//desarrollo
$db   = 'landing-trust';

//desarrollo
$user = 'root';

//desarrollo
$pass = '';

$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    // En un entorno de producción, es mejor no mostrar detalles del error
    die('Error de conexión a la base de datos: ' . $e->getMessage());
}