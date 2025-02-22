<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../vendor/autoload.php'; // This loads the Composer autoload file

$response = []; // Initialize the response array

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $full_name = htmlspecialchars($_POST["full_name"]);
    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $phone = htmlspecialchars($_POST["phone"]);
    $address = htmlspecialchars($_POST["address"]);
    $metal_type = htmlspecialchars($_POST["metal_type"]);
    $budget = htmlspecialchars($_POST["budget"]);
    $shape = htmlspecialchars($_POST["shape"]);
    $timeframe = htmlspecialchars($_POST["timeframe"]);
    $message = htmlspecialchars($_POST["message"]);

    // Instantiate PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Server settings for SSL
        $mail->isSMTP();
        $mail->Host = 'mail.naturalborndiamonds.com'; // SMTP server
        $mail->SMTPAuth = true;
        $mail->Username = 'damian@naturalborndiamonds.com'; // SMTP username
        $mail->Password = '_0ja!u*tMmi&'; // SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // Use SSL for security
        $mail->Port = 465; // SSL port

        // Enable debug output
        $mail->SMTPDebug = 0; // Set this to 2 for detailed debugging output
        $mail->Debugoutput = function ($str, $level) {
            echo "SMTP Debug: $str\n";
        }; // Capture debug output and display

        // Recipients
        $mail->setFrom('damian@naturalborndiamonds.com', 'NATURAL BORN');
        $mail->addAddress('info@naturalborndiamonds.com', $full_name); // Recipient email
        $mail->addReplyTo($email, $full_name); // Reply-to address

        // Content
        $mail->isHTML(true);
        $mail->Subject = 'New Contact Form Submission';
        $mail->Body = "
        <h2>New Contact Form Submission</h2>
        <p><strong>Full Name:</strong> $full_name</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Phone:</strong> $phone</p>
        <p><strong>Address:</strong> $address</p>
        <p><strong>Metal Type:</strong> $metal_type</p>
        <p><strong>Budget:</strong> $budget</p>
        <p><strong>Shape:</strong> $shape</p>
        <p><strong>Timeframe:</strong> $timeframe</p>
        <p><strong>Message:</strong> $message</p>
        ";

        // Send the email
        if ($mail->send()) {
            $response['status'] = 'success';
            $response['message'] = 'Email has been sent successfully!';
        } else {
            $response['status'] = 'error';
            $response['message'] = 'Error sending email: ' . $mail->ErrorInfo;
        }
    } catch (Exception $e) {
        $response['status'] = 'error';
        $response['message'] = 'Message could not be sent. Mailer Error: ' . $mail->ErrorInfo;
    }
} else {
    $response['status'] = 'error';
    $response['message'] = 'Invalid request.';
}

// Return the response as JSON
echo json_encode($response);
