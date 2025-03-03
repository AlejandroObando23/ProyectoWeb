<?php
    include("../conexion.php");
    $consulta = 'SELECT i.Id, i.Fecha, c.Nombre AS "tipo", i.Monto, i.Metodo,i.Estado, u.Nombre, u.Apellido,c.CodigoQR, i.FechaRegistro, i.Descripcion FROM egresos i INNER JOIN usuarios u INNER JOIN categorias c ON i.idUsuario =u.Id';
    $resultado = mysqli_query($conn,$consulta);

    if($resultado){
        $datos = $resultado->fetch_all(MYSQLI_ASSOC);
        echo json_encode($datos);
    }else {
        echo json_encode(["error" => "Error en la consulta"]);
    }
?>