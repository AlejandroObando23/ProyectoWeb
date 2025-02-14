<?php
require_once "conexion.php"; // Incluir la conexión

session_start(); // Iniciar sesión

// Obtener los datos enviados desde el formulario
$usuario = $_POST['Cedula'];
$password = $_POST['Password'];

// Verificar que los datos no estén vacíos
if (empty($usuario) || empty($password)) {
    echo "<script>alert('Debe ingresar usuario y contraseña.'); window.history.back();</script>";
    exit();
}

// Consultar si el usuario existe en la base de datos
$sql = "SELECT * FROM usuarios WHERE Cedula = ?";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    die("Error en la preparación de la consulta: " . $conn->error);
}

$stmt->bind_param("s", $usuario);
$stmt->execute();
$result = $stmt->get_result();

// Comprobar si el usuario fue encontrado
if ($result->num_rows > 0) {
    $registro = $result->fetch_assoc(); // Obtener los datos del usuario

    // Verificar la contraseña de manera segura
    if (password_verify($password, $registro['Password'])) { 
        $_SESSION['usuario'] = $registro['Cedula'];
        $_SESSION['nombre'] = $registro['Nombre'];
        $_SESSION['rol'] = $registro['Rol'];

        // Verificar si el usuario tiene un rol asignado
        if (empty($registro['Rol'])) {
            echo "<script>alert('No tiene un rol asignado. Pida al administrador que le asigne uno.'); window.history.back();</script>";
            exit();
        }

        // Redirigir según el rol
        switch ($registro['Rol']) {
            case 'admin':
                header("Location: ../Admin/AdminInicio.php");
                exit();
            case 'egreso':
                header("Location: ../../html/Servicios/gastos.html");
                exit();
            case 'ingreso':
                header("Location: ../../html/Servicios/ingresos.html");
                exit();
            default:
                echo "<script>alert('Rol no reconocido. Contacte al administrador.'); window.history.back();</script>";
                exit();
        }
    } else {
        echo "<script>alert('Contraseña incorrecta.'); window.history.back();</script>";
        exit();
    }
} else {
    echo "<script>alert('El usuario no existe.'); window.history.back();</script>";
    exit();
}

// Cerrar la conexión
$stmt->close();
$conn->close();
?>
