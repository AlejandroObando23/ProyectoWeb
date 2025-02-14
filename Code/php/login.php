<?php
require_once "conexion.php"; // Incluir la conexión

session_start(); // Iniciar sesión

// Obtener los datos enviados desde el formulario
$usuario = $_POST['Cedula'];
$password = $_POST['Password'];



// Consultar si el usuario existe en la base de datos
$sql = "SELECT * FROM usuarios WHERE cedula = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $usuario);
$stmt->execute();
$result = $stmt->get_result();

// Comprobar si el usuario fue encontrado
if ($result->num_rows > 0) {
    $registro = $result->fetch_assoc(); // Obtener los datos del usuario

    // Verificar la contraseña de manera segura
    if (password_verify($password, $registro['Contraseña'])) {
        $_SESSION['usuario'] = $registro['cedula'];
        $_SESSION['nombre'] = $registro['Nombre'];
        $_SESSION['rol'] = $registro['Rol'];

        // Verificar si el usuario tiene un rol asignado
        if (empty($registro['Rol'])) {
            echo "<script>alert('No tiene un rol asignado. Pida al administrador que le asigne uno.'); window.history.back();</script>";
            exit();
        }

        // Redirigir según el rol
        switch ($registro['Rol']) {
            case 'Administrador':
                header("Location: ../html/Administrador/AdminInicio.html");
                exit();
            case 'Egreso':
                header("Location: ../html/Servicios/gastos.html");
                exit();
            case 'Ingreso':
                header("Location: ../html/Servicios/ingresos.html");
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
