<?php
include("../conexion.php");

$response = ["success" => false];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $tipo = $_POST["tipoIngreso"];
    $monto = $_POST["montoIngreso"];
    $fecha = $_POST["fechaIngreso"];
    $metodo = $_POST["metodoIngreso"];
    $descripcion = $_POST["descripcionIngreso"];
    $idUsuario = 8;

    $stmt = $conn->prepare("INSERT INTO ingresos (Fecha, IdTipo, Monto, Metodo, IdUsuario, Descripcion) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $fecha, $tipo, $monto, $metodo, $idUsuario, $descripcion);

    if ($stmt->execute()) {
        $response["success"] = true;
        // Puedes agregar más información a la respuesta si lo necesitas
    } else {
        $response["error"] = "No se pudo guardar el ingreso.";
    }

    $stmt->close();
    $conn->close();
}

// Enviar respuesta en formato JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
