<?php
include("../conexion.php");

$response = ["success" => false];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $monto = $_POST["montoGasto"];
    $fecha = $_POST["fechaGasto"];
    $metodo = $_POST["metodoGasto"];
    $descripcion = $_POST["descripcionGasto"];
    $idUsuario = 8;

    $stmt = $conn->prepare("INSERT INTO egresos (Fecha, Monto, Metodo, idUsuario, Descripcion) VALUES ( ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $fecha, $monto, $metodo, $idUsuario, $descripcion);

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
