<?php
// Configuración de conexión a la base de datos
$host = "localhost";
$usuario_db = "root";  // Usuario de MySQL en XAMPP
$password_db = "";  // Contraseña por defecto en XAMPP
$base_datos = "base_de_datos_web";  // Nombre de la base de datos

// Crear la conexión
$conn = new mysqli($host, $usuario_db, $password_db, $base_datos);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener los datos enviados desde el formulario
$usuario = $_POST['user'];
$password = $_POST['password'];

// Verificar si el usuario existe
$sql = "SELECT * FROM usuarios WHERE usuario = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $usuario);
$stmt->execute();
$result = $stmt->get_result();

// Comprobar si el usuario fue encontrado
if ($result->num_rows > 0) {
    $registro = $result->fetch_assoc(); // Obtener los datos del usuario

    // Verificar la contraseña
    if (password_verify($password, $registro['password'])) {
        // Inicio de sesión exitoso
        session_start();
        $_SESSION['usuario'] = $registro['usuario']; // Guardar el usuario en la sesión
        $_SESSION['nombre'] = $registro['nombre']; // Guardar el nombre en la sesión

        echo "<script>alert('Inicio de sesión exitoso. Bienvenido, " . $registro['nombre'] . "!');</script>";
        header("Location: ../inicio.php"); // Redirigir a la página de inicio
        exit();
    } else {
        // Contraseña incorrecta
        echo "<script>alert('Contraseña incorrecta.');</script>";
        echo "<script>window.history.back();</script>";
    }
} else {
    // Usuario no encontrado
    echo "<script>alert('El usuario no existe.');</script>";
    echo "<script>window.history.back();</script>";
}

// Cerrar la conexión
$stmt->close();
$conn->close();
?>
