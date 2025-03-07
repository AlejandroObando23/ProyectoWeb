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

<div class="container mt-4">
    <fieldset class="border p-2 shadow bg-light rounded">
        <div class="d-flex">
            <div class="col">
                <h3 class="titulo">Lista De Usuarios</h3>
            </div>
        </div>
        <hr>
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
            <hr>
        </div>
    </fieldset>
</div>