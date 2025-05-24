<?php
// Enable error reporting for debugging (remove in production)
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Allow cross-origin requests (adjust as needed for security)
header("Access-Control-Allow-Origin: https://condonestrust.com");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Include database connection and PHPMailer
require_once './db_connect.php';
require_once './PHPMailer/src/Exception.php';
require_once './PHPMailer/src/PHPMailer.php';
require_once './PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Function to send email
function sendEmail($data) {
    $mail = new PHPMailer(true);

    try {
        //Server settings

        $mail->isSMTP();                                            // Enviar usando SMTP
        $mail->Host       = 'smtp.gmail.com';                     // Servidor SMTP de Gmail
        $mail->SMTPAuth   = true;                                   // Habilitar autenticación SMTP
        $mail->Username   = 'daniel@palmera.marketing';                     // Tu correo electrónico de Google Workspace
        $mail->Password   = 'ABCD EFGH IJKL MNOP';                               // Tu contraseña de aplicación
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Habilitar encriptación TLS
        $mail->Port       = 587;

        // Destinatarios
        $mail->setFrom('daniel@palmera.marketing', 'Palm Era');
        $mail->addAddress("danielmolina956@gmail.com","Daniel Palmera");

        //Recipients
        //$mail->setFrom('from@example.com', 'Mailer');
        //$mail->addAddress('recipient@example.com', 'Recipient Name');

        // Content
        $mail->isHTML(true);
        $mail->Subject = 'Trust Nuevo Registro Langind page';
        $mail->Body    = "Nuevo registro recibido:<br>" .
                         "Nombre: {$data['nombre']}<br>" .
                         "Email: {$data['email']}<br>" .
                         "Teléfono: {$data['telefono']}<br>" .
                         "Edad: {$data['edad']}<br>" .
                         "Datos de ingreso por redes sociales (si aplica)<br>" .
                         "UTM Source: {$data['utm_source']}<br>" .
                         "UTM Medium: {$data['utm_medium']}<br>" .
                         "UTM Campaign: {$data['utm_campaign']}<br>" .
                         "UTM Term: {$data['utm_term']}<br>" .
                         "UTM Content: {$data['utm_content']}";

        $mail->send();
        return true;
    } catch (Exception $e) {
        error_log("Message could not be sent. Mailer Error: {$mail->ErrorInfo}");
        return false;
    }
}

// Handle POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve and sanitize input data
    @$data = [
        'nombre' => filter_input(INPUT_POST, 'nombre', FILTER_SANITIZE_STRING),
        'telefono' => filter_input(INPUT_POST, 'telefono', FILTER_SANITIZE_STRING),
        'email' => filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL),
        'edad' => filter_input(INPUT_POST, 'edad', FILTER_SANITIZE_NUMBER_INT),
        'utm_source' => filter_input(INPUT_POST, 'utm_source', FILTER_SANITIZE_STRING),
        'utm_medium' => filter_input(INPUT_POST, 'utm_medium', FILTER_SANITIZE_STRING),
        'utm_campaign' => filter_input(INPUT_POST, 'utm_campaign', FILTER_SANITIZE_STRING),
        'utm_term' => filter_input(INPUT_POST, 'utm_term', FILTER_SANITIZE_STRING),
        'utm_content' => filter_input(INPUT_POST, 'utm_content', FILTER_SANITIZE_STRING)
    ];

    // Prepare SQL statement
    $sql = "INSERT INTO registro (nombre, telefono, email, edad, utm_source, utm_medium, utm_campaign, utm_term, utm_content)
            VALUES (:nombre, :telefono, :email, :edad, :utm_source, :utm_medium, :utm_campaign, :utm_term, :utm_content)";

    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute($data);

        // Send email
        $emailSent = sendEmail($data);

        // Prepare response
        $response = [
            "status" => "success",
            "message" => "Data registered successfully",
            "email_sent" => $emailSent
        ];
        http_response_code(201);
    } catch(PDOException $e) {
        $response = [
            "status" => "error",
            "message" => "Database error: " . $e->getMessage()
        ];
        http_response_code(500);
    }

    // Send JSON response
    echo json_encode($response);
} else {
    // Handle non-POST requests
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
}