<?php
include("conexion.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $cedula = $_POST["cedula"];
    $nombre = $_POST["nombre"];
    $apellido = $_POST["apellido"];
    $correo = $_POST["correo"];
    $password = $_POST["password"];
    $rol = $_POST["rol"]; // Se añade la captura del rol

    // Validaciones del lado del servidor
    $errores = [];

    if (!preg_match('/^\d+$/', $cedula)) {
        $errores[] = "La cédula solo puede contener números.";
    }

    if (!preg_match('/^[A-Za-z]+$/', $nombre)) {
        $errores[] = "El nombre no debe contener números ni espacios.";
    }

    if (!preg_match('/^[A-Za-z]+$/', $apellido)) {
        $errores[] = "El apellido no debe contener números ni espacios.";
    }

    if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
        $errores[] = "El correo no es válido.";
    }

    if (!preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/', $password)) {
        $errores[] = "La contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula y un número.";
    }

    if (!in_array($rol, ["admin", "ingreso", "egreso"])) {
        $errores[] = "Rol no válido.";
    }

    if (count($errores) > 0) {
        echo "<script>alert('" . implode("\\n", $errores) . "'); window.history.back();</script>";
        exit();
    }

    // Encriptar la contraseña
    $passwordHash = password_hash($password, PASSWORD_BCRYPT);

    // Insertar en la base de datos
    $stmt = $conn->prepare("INSERT INTO usuarios (Cedula, Nombre, Apellido, Correo, Password, Rol) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $cedula, $nombre, $apellido, $correo, $passwordHash, $rol);

    if ($stmt->execute()) {
        // Redirección según el rol
        $redirectPage = "../../html/login.html"; // Por defecto
        
        echo "<script>alert('Usuario registrado correctamente'); window.location.href='$redirectPage';</script>";
    } else {
        echo "<script>alert('Error al registrar usuario'); window.history.back();</script>";
    }

    $stmt->close();
    $conn->close();
}
?>
