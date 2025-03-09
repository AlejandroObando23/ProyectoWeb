<?php
include("../conexion.php");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["success" => false, "message" => "Datos no válidos"]);
    exit;
}

$sql = "INSERT INTO perfiles 
    (Nombre, Descripcion, PaginaIngresos, AgregarIngreso, AnularActivarIngreso, EditarIngreso, 
    PaginaReportes, PaginaGastos, AgregarGasto, AnularActivarGasto, EditarGasto, 
    PaginaCategorias, AgregarCategoria, EditarCategoria, AnularActivarCategoria, 
    PaginaUsuario, CrearUsuario, ActivarDesactivarUsuario, CrearRol, ActivarDesactivarRol) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param(
    "ssiiiiiiiiiiiiiiiiii",
    $data["nombreRol"], $data["descripcionRol"], $data["paginaIngresos"], $data["agregarIngresos"],
    $data["anularIngresos"], $data["editarIngresos"], $data["generarReportes"], 
    $data["paginaGastos"], $data["agregarGastos"], $data["anularGastos"], $data["editarGastos"],
    $data["paginaCategorias"], $data["agregarCategoria"], $data["editarCategoria"], 
    $data["desactivarCategoria"], $data["paginaUsuarios"], $data["crearUsuarios"], 
    $data["desactivarUsuarios"], $data["crearRoles"], $data["desactivarRoles"]
);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Error al guardar el perfil"]);
}

$stmt->close();
$conn->close();
?>
