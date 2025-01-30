<?php
// Configuración de conexión a la base de datos
$host = "localhost";
$usuario = "root";  // Usuario de MySQL en XAMPP
$password_db = "";  // Contraseña por defecto en XAMPP
$base_datos = "base_de_datos_web";  // Nombre de la base de datos

// Crear la conexión
$conn = new mysqli($host, $usuario, $password_db, $base_datos);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener los datos del formulario
$nombre = filter_var($_POST['nombre'], FILTER_SANITIZE_STRING);
$apellido = filter_var($_POST['apellido'], FILTER_SANITIZE_STRING);
$usuario = filter_var($_POST['usuario'], FILTER_SANITIZE_STRING);
$email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
$password = $_POST['password'];
$confirmarPassword = $_POST['confirmarPassword'];

// Validar email
if (!$email) {
    echo "El email ingresado no es válido.";
    exit;
}

// Validar si las contraseñas coinciden
if ($password !== $confirmarPassword) {
    echo "Las contraseñas no coinciden.";
    exit;
}

// Verificar si el usuario o el email ya existen
$sql_verificar = "SELECT * FROM usuarios WHERE usuario = ? OR email = ?";
$stmt_verificar = $conn->prepare($sql_verificar);
$stmt_verificar->bind_param("ss", $usuario, $email);
$stmt_verificar->execute();
$result = $stmt_verificar->get_result();

if ($result->num_rows > 0) {
    echo "El usuario o email ya están registrados.";
    exit;
}

$stmt_verificar->close();

// Encriptar la contraseña
$passwordHash = password_hash($password, PASSWORD_DEFAULT);

// Preparar la consulta para insertar los datos
$sql = "INSERT INTO usuarios (nombre, apellido, usuario, email, password) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssss", $nombre, $apellido, $usuario, $email, $passwordHash);

// Ejecutar la consulta
if ($stmt->execute()) {
    echo "Registro exitoso. <a href='../html/login.html'>Iniciar sesión</a>";
} else {
    echo "Error al registrar: " . $stmt->error;
}

// Cerrar la conexión
$stmt->close();
$conn->close();
?>
