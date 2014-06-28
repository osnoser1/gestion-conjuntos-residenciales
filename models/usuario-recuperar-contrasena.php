<?php
include("conector.php");
require 'PHPMailer-5.2.8/PHPMailerAutoload.php';
$correo = $_POST['correo'];

$mysqli = new mysqli(Host, User, Pass, BasedeDatos);
$tupla = "SELECT * FROM usuario WHERE  Correo = '$correo'";
$resultado = $mysqli->query($tupla);
$contrasena = "";
$usuario = "";
if($db_resultado = mysqli_fetch_array($resultado, MYSQLI_ASSOC))
{
	$contrasena = $db_resultado['Contrasena'];
	$usuario = $db_resultado['Nombre'].' '.$db_resultado['Apellido'];
}
else{
	echo 'false';
	return;
}

$mysqli->close();


$mail = new PHPMailer;
$mail->CharSet = "UTF-8";

$mail->IsSMTP(); // telling the class to use SMTP
$mail->SMTPAuth = true; // enable SMTP authentication
$mail->SMTPSecure = "ssl"; // sets the prefix to the servier
$mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Port = 465;
$mail->Username = 'gestionconjuntoresidencial@gmail.com';                 // SMTP username
$mail->Password = '123asd456fgh789jkl';                           // SMTP password
//$mail->SMTPSecure = 'tls';                            // Enable encryption, 'ssl' also accepted

$mail->From = 'gestionconjuntoresidencial@gmail.com';
$mail->FromName = 'Conjunto Residencial: Recuperar contraseña';
$mail->addAddress($correo, $usuario);     // Add a recipient
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');

$mail->WordWrap = 50;                                 // Set word wrap to 50 characters
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Recuperar contraseña';
$mail->Body    = '<h1>Recuperar contraseña</h1><br>Has solicitado tu contraseña desde la web.<br><h2>Usuario:</h2> '.$usuario.'<h2> Contraseña:</h2> '.$contrasena.'<br><small> Si no has solicitado este mensaje ponte en contacto con el administrador</small>';
$mail->AltBody = 'Usuario: '.$usuario.' Contraseña: '.$contrasena;

if(!$mail->send()) {
    //echo 'Message could not be sent.';
    //echo 'Mailer Error: ' . $mail->ErrorInfo;
    echo 'false';
} else {
    //echo 'Message has been sent';
    echo 'true';
}