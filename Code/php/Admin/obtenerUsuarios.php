<?php
session_start();
include('../conexion.php');

if (!isset($_SESSION['usuario'])) {
    echo json_encode(["error" => "Acceso denegado"]);
    exit();
}

$mostrar_inactivos = isset($_GET['ver_inactivos']) && $_GET['ver_inactivos'] == '1';
$sql = "SELECT Cedula, Nombre, Apellido, Correo, Estado FROM usuarios";

if (!$mostrar_inactivos) {
    $sql .= " WHERE Estado = 'Activo'";
}

$result = $conn->query($sql);
$usuarios = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $usuarios[] = $row;
    }
}

echo json_encode($usuarios);
$conn->close();
?>
