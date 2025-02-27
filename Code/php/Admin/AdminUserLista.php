<?php
// Inicia la sesión
session_start();

// Incluir el archivo de conexión a la base de datos
include('../conexion.php');

// Verifica si el usuario está autenticado y tiene el rol de admin
if (!isset($_SESSION['usuario']) || $_SESSION['rol'] != 'admin') {
    // Si no es admin, redirige a otra página (por ejemplo, inicio de sesión o acceso denegado)
    header('Location: ../../html/Administrador/acceso_denegado.html');
    exit();
}

// Obtener los usuarios
$sql = "SELECT Cedula, Nombre, Apellido, Correo FROM usuarios"; // Asegúrate de ajustar esta consulta según tu base de datos
$result = $conn->query($sql);
?>


<!doctype html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <title>Administrador</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="icon" type="image/x-icon" href="../../imagenes/logo.png">
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap" rel="stylesheet">
    <link href="../../css/menu.css" rel="stylesheet">
    <link href="../../css/adminusercrear.css" rel="stylesheet">
    <link href="../../css/normalize.css" rel="stylesheet" type="text/css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body>
<header class="navbar bg-light">
    <div class="container">
        <div class="d-flex justify-content-between align-items-center w-100">
            <div class="d-flex align-items-center">
                <h1 class="fs-3 my-2">MIECONOMIA</h1>
                <img class="mx-3 d-none d-md-flex" src="../../imagenes/logo.png" alt="Logo" width="50">
            </div>
            <div class="ms-auto d-flex align-items-center text-center">
                <span id="nombreUsuario" class="me-2 d-none d-md-flex">Nombre Apellido</span>
                <i class="fs-4" id="user-icon">
                    <img src="../../imagenes/iconoUser.png" alt="user" width="50">
                </i>
            </div>
        </div>
    </div>
</header>

<div class="navbar navbar-expand-lg navbar-light sticky-top shadow menu">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="menuNav">
                <ul class="navbar-nav mx-auto">
                    <li class="nav-item fw-bold"><a class="nav-link" href="../../php/Admin/AdminInicio.php"><i class="bi bi-house"></i> Inicio</a></li>
                    <li class="nav-item fw-bold"><a class="nav-link " href="../Servicios/ingresos.html"><i class="bi bi-cash-coin"></i> Ingresos</a></li>
                    <li class="nav-item fw-bold"><a class="nav-link" href="../Servicios/gastos.html"><i class="bi bi-credit-card"></i> Gastos</a></li>
                    <li class="nav-item fw-bold"><a class="nav-link" href="#"><i class="bi bi-info-square"></i> Reportes</a></li>
                    <li class="nav-item dropdown fw-bold">
                        <a class="nav-link dropdown-toggle" href="#" id="usuariosDropdown" role="button" data-bs-toggle="dropdown">
                            <i class="bi bi-people-fill active"></i> Usuarios
                        </a>
                        <ul class="dropdown-menu menu">
                            <li><a class="dropdown-item " href="AdminUserLista.php"><i class="bi bi-person-lines-fill active"></i> Lista de usuarios</a></li>
                            <li><a class="dropdown-item " href="AdminUserCrear.php"><i class="bi bi-person-fill-add"></i> Agregar usuario</a></li>
                            <li><a class="dropdown-item" href="AdminUserRoles.html"><i class="bi bi-person-check-fill"></i> Administrar permisos</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>

<div class="container mt-4">
    <h1 class="text-center">Lista de Usuarios</h1>
    <div class="table-responsive">
        <table class="table table-striped table-hover">
            <thead class="table-dark">
                <tr>
                    <th>Cédula</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Correo</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <?php if ($result && $result->num_rows > 0): ?>
                    <?php while ($row = $result->fetch_assoc()): ?>
                        <tr>
                            <td><?= htmlspecialchars($row["Cedula"]) ?></td>
                            <td><?= htmlspecialchars($row["Nombre"]) ?></td>
                            <td><?= htmlspecialchars($row["Apellido"]) ?></td>
                            <td><?= htmlspecialchars($row["Correo"]) ?></td>
                            <td>
                                <a href="eliminar_usuario.php?cedula=<?= urlencode($row["Cedula"]) ?>" class="btn btn-danger btn-sm" onclick="return confirm('¿Seguro que deseas eliminar este usuario?');">
                                    <i class="bi bi-trash"></i> Eliminar
                                </a>
                            </td>
                        </tr>
                    <?php endwhile; ?>
                <?php else: ?>
                    <tr><td colspan="5" class="text-center">No hay usuarios registrados</td></tr>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>

<?php 
if ($conn) {
    $conn->close(); 
}
?>
