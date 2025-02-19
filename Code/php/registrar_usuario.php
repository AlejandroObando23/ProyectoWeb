<?php
include("conexion.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $cedula = $_POST["cedula"];
    $nombre = $_POST["nombre"];
    $apellido = $_POST["apellido"];
    $correo = $_POST["correo"];
    $password = $_POST["password"];

    // Encriptar la contraseña
    $passwordHash = password_hash($password, PASSWORD_BCRYPT);

    // Insertar en la base de datos
    $stmt = $conn->prepare("INSERT INTO usuarios (Cedula, Nombre, Apellido, Correo, Password) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $cedula, $nombre, $apellido, $correo, $passwordHash);

    if ($stmt->execute()) {
        echo "<script>alert('Usuario registrado correctamente'); window.location.href='AdminUserLista.php';</script>";
    } else {
        echo "<script>alert('Error al registrar usuario'); window.history.back();</script>";
    }

    $stmt->close();
    $conn->close();
}
?>
