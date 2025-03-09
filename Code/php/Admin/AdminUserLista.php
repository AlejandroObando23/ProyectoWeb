<?php
// Inicia la sesión
session_start();
include('../conexion.php');

// Verifica si el usuario está autenticado y tiene el rol de admin
if (!isset($_SESSION['usuario']) ) {
    header('Location: ../../html/Administrador/acceso_denegado.html');
    exit();
}

// Si se recibe una solicitud AJAX para cambiar estado
if (isset($_POST['cedula']) && isset($_POST['estado'])) {
    $cedula = $_POST['cedula'];
    $nuevo_estado = $_POST['estado'];

    // Preparar la consulta SQL para actualizar el estado
    $sql = "UPDATE usuarios SET Estado = ? WHERE Cedula = ?";
    $stmt = $conn->prepare($sql);

    if ($stmt) {
        $stmt->bind_param("ss", $nuevo_estado, $cedula);
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
    exit(); // Termina el script si se ejecutó una solicitud AJAX
}

// Verificar si se deben mostrar solo los activos
$mostrar_inactivos = isset($_GET['ver_inactivos']) && $_GET['ver_inactivos'] == '1';

// Consulta para obtener los usuarios
$sql = "SELECT Cedula, Nombre, Apellido, Correo, Estado FROM usuarios";
if (!$mostrar_inactivos) {
    $sql .= " WHERE Estado = 'Activo'";
}
$result = $conn->query($sql);
?>

<div class="container mt-4">
    <fieldset class="border p-2 shadow bg-light rounded">
        <div class="d-flex justify-content-between align-items-center">
            <h3 class="titulo">Lista De Usuarios</h3>

            <!-- Switch para mostrar/ocultar inactivos -->
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="toggleInactivos" <?= $mostrar_inactivos ? 'checked' : '' ?>>
                <label class="form-check-label" for="toggleInactivos">Mostrar Inactivos</label>
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
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if ($result && $result->num_rows > 0): ?>
                        <?php while ($row = $result->fetch_assoc()): ?>
                            <tr id="usuario-<?= htmlspecialchars($row["Cedula"]) ?>">
                                <td><?= htmlspecialchars($row["Cedula"]) ?></td>
                                <td><?= htmlspecialchars($row["Nombre"]) ?></td>
                                <td><?= htmlspecialchars($row["Apellido"]) ?></td>
                                <td><?= htmlspecialchars($row["Correo"]) ?></td>
                                <td>
                                    <span class="badge bg-<?= $row["Estado"] == 'Activo' ? 'success' : 'secondary' ?>" id="estado-<?= htmlspecialchars($row["Cedula"]) ?>">
                                        <?= htmlspecialchars($row["Estado"]) ?>
                                    </span>
                                </td>
                                <td>
                                    <!-- Botón para cambiar estado con AJAX -->
                                    <button class="btn btn-warning btn-sm cambiar-estado" 
                                            data-cedula="<?= htmlspecialchars($row["Cedula"]) ?>" 
                                            data-estado="<?= $row["Estado"] == 'Activo' ? 'Inactivo' : 'Activo' ?>">
                                        <?= $row["Estado"] == 'Activo' ? 'Desactivar' : 'Activar' ?>
                                    </button>
                                </td>
                            </tr>
                        <?php endwhile; ?>
                    <?php else: ?>
                        <tr><td colspan="6" class="text-center">No hay usuarios registrados</td></tr>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
    </fieldset>
</div>
<script src="../../javascript/Servicios/usuarios_inactivos.js"></script>
