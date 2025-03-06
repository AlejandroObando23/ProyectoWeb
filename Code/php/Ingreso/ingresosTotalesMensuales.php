<?php
    include("../conexion.php");
    $consulta = 'SELECT 
    SUM(Monto) AS "IngresoTotal",
    SUM(CASE 
        WHEN YEAR(Fecha) = YEAR(CURRENT_DATE) AND MONTH(Fecha) = MONTH(CURRENT_DATE)
        THEN Monto
        ELSE 0
    END) AS "IngresoEsteMes"
FROM ingresos;
';

    $resultado = mysqli_query($conn,$consulta);

    if ($resultado) {
        $datos = $resultado->fetch_assoc();  
        echo json_encode($datos); 
    } else {
        echo json_encode(["error" => "Error en la consulta"]);
    }
?>