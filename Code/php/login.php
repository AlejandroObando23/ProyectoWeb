<?php
// Configuración de conexión a la base de datos
$host = "localhost";
$usuario_db = "root";  // Usuario de MySQL en XAMPP
$password_db = "";  // Contraseña por defecto en XAMPP
$base_datos = "ECONOMIAF";  // Nombre de la base de datos

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
$sql = "SELECT * FROM usuarios WHERE Usuario = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $usuario);
$stmt->execute();
$result = $stmt->get_result();

// Comprobar si el usuario fue encontrado
if ($result->num_rows > 0) {
    $registro = $result->fetch_assoc(); // Obtener los datos del usuario

    // Comparar la contraseña directamente
    if ($password === $registro['Contraseña']) {
        // Inicio de sesión exitoso
        session_start();
        $_SESSION['usuario'] = $registro['Usuario']; // Guardar el usuario en la sesión
        $_SESSION['nombre'] = $registro['Nombre']; // Guardar el nombre en la sesión
        $_SESSION['rol'] = $registro['Rol']; // Guardar el rol en la sesión

        // Verificar si el usuario tiene un rol asignado
        if (is_null($registro['Rol']) || empty($registro['Rol'])) {
            echo "<script>alert('No tiene un rol asignado. Pida al administrador que le asigne uno.');</script>";
            echo "<script>window.history.back();</script>";
            exit();
        }

        // Redirigir según el rol
        switch ($registro['Rol']) {
            case 'Administrador':
                header("Location: ../html/Administrador/AdminInicio.html");
                break;
            case 'Egreso':
                header("Location: ../html/Servicios/gastos.html");
                break;
            case 'Ingreso':
                header("Location: ../html/Servicios/ingresos.html");
                break;
            default:
                echo "<script>alert('Rol no reconocido. Contacte al administrador.');</script>";
                echo "<script>window.history.back();</script>";
                exit();
        }
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
