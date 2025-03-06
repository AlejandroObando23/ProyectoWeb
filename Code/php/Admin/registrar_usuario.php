<?php
include("../conexion.php");

$response = ["success" => false];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $cedula = $_POST["cedula"];
    $nombre = $_POST["nombre"];
    $apellido = $_POST["apellido"];
    $correo = $_POST["email"];
    $password = $_POST["password"];
    $rol = $_POST["rol"]; // Se añade la captura del rol

    // Encriptar la contraseña
    $passwordHash = password_hash($password, PASSWORD_BCRYPT);

    // Insertar en la base de datos
    $stmt = $conn->prepare("INSERT INTO usuarios (Cedula, Nombre, Apellido, Correo, Password, Rol) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $cedula, $nombre, $apellido, $correo, $passwordHash, $rol);

    if ($stmt->execute()) {
        $response["success"] = true;
    } else {
        // En lugar de die(), almacenamos el error y continuamos
        $response["error"] = "Error en la consulta: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}

header('Content-Type: application/json');
echo json_encode($response);
?>
