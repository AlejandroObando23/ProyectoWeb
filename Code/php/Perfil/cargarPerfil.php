<?php
session_start(); // Asegúrate de iniciar la sesión

// Verificar si el ID de usuario está en la sesión
if (isset($_SESSION['id'])) {
    $userId = $_SESSION['id'];

    // Incluir la conexión a la base de datos
    include("../conexion.php");

    // Preparar la consulta para obtener los datos del usuario
    $stmt = $conn->prepare("SELECT Cedula, Nombre, Apellido, Correo FROM usuarios WHERE Id = ?");
    $stmt->bind_param("i", $userId); // "i" para indicar que es un entero

    if ($stmt->execute()) {
        $result = $stmt->get_result();

        // Si se encuentra el usuario con el ID proporcionado
        if ($result->num_rows > 0) {
            $userData = $result->fetch_assoc();
            $response["success"] = true;
            $response["data"] = $userData; // Devuelve los datos del usuario
        } else {
            $response["error"] = "No se encontró el usuario.";
        }
    } else {
        $response["error"] = "Error en la consulta: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
} else {
    $response["error"] = "No se encontró el ID de usuario en la sesión.";
}

// Establecer el encabezado para indicar que la respuesta es JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
