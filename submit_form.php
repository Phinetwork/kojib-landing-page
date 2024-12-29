<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Capture form data
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);

    // Validate email address
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "<script>alert('Invalid email address. Please try again.'); window.history.back();</script>";
        exit;
    }

    // Email setup
    $to = "contact@kojib.com"; // Replace with your desired recipient email
    $email_subject = "New Inquiry from $name: $subject";
    $email_body = "You have received a new message from your website contact form.\n\n" .
                  "Here are the details:\n" .
                  "Name: $name\n" .
                  "Email: $email\n" .
                  "Subject: $subject\n" .
                  "Message:\n$message\n";
    $headers = "From: $email\r\n" .
               "Reply-To: $email\r\n";

    // Send email
    if (mail($to, $email_subject, $email_body, $headers)) {
        // Success response
        echo "<script>alert('Thank you, $name! Your message has been successfully sent. We will get back to you shortly.'); window.location.href='index.html';</script>";
    } else {
        // Failure response
        echo "<script>alert('There was an error sending your message. Please try again later.'); window.history.back();</script>";
    }
} else {
    // Redirect to the contact form if accessed directly
    header("Location: index.html");
    exit;
}
?>
