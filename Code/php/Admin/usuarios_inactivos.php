<?php
header("Content-Type: text/plain"); // Responde en texto plano

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (isset($_POST["cedula"]) && isset($_POST["estado"])) {
        include('../conexion.php');
        $cedula = $_POST["cedula"];
        $estado = $_POST["estado"];

        // Preparar el nuevo estado basado en el valor actual
        $nuevoEstado = ($estado === "Activo") ? "Inactivo" : "Activo";

        // Consulta SQL para actualizar el estado
        $sql = "UPDATE usuarios SET Estado = ? WHERE Cedula = ?";
        $stmt = $conn->prepare($sql);

        if ($stmt) {
            $stmt->bind_param("ss", $nuevoEstado, $cedula);
            if ($stmt->execute()) {
                echo "success"; // Si la actualización es exitosa
            } else {
                echo "error"; // Si ocurre algún error en la ejecución
            }
            $stmt->close();
        } else {
            echo "error"; // Error en la preparación de la consulta
        }

        $conn->close();
    } else {
        echo "error"; // Si los parámetros no están presentes
    }
} else {
    echo "Método no permitido"; // Si no es una solicitud POST
}
