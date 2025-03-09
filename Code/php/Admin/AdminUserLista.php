<?php
// Inicia la sesión
session_start();

// Verifica si el usuario está autenticado y tiene el rol de admin
if (!isset($_SESSION['usuario']) ) {
    header('Location: ../../html/Administrador/acceso_denegado.html');
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener datos del formulario
    $cedula = $_POST['cedula'];
    $rol = $_POST['rol'];
    $estado = $_POST['estado'];

    // Conexión a la base de datos
    require_once('conexion.php');

    // Actualizar los datos del usuario
    $sql = "UPDATE usuarios SET rol = ?, estado = ? WHERE cedula = ?";
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param('sss', $rol, $estado, $cedula);
    $resultado = $stmt->execute();

    if ($resultado) {
        echo "success";
    } else {
        echo "error";
    }
}

?>

<div class="container mt-4">
    <fieldset class="border p-2 shadow bg-light rounded">
        <div class="d-flex justify-content-between align-items-center">
            <h3 class="titulo">Lista De Usuarios</h3>
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="toggleInactivos">
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
                        <th>Rol</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="usuariosTabla">
                    <!-- Filas generadas dinámicamente -->
                </tbody>
            </table>
        </div>
    </fieldset>
</div>

<!-- Formulario para editar usuario -->
<div id="editarUsuarioModal" class="modal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Editar Usuario</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <form id="formEditarUsuario">
                    <div class="mb-3">
                        <label for="cedulaEditar" class="form-label">Cédula</label>
                        <input type="text" class="form-control" id="cedulaEditar" maxlength="10" >
                    </div>
                    <div class="mb-3">
                        <label for="rolEditar" class="form-label">Rol</label>
                        <select class="form-select" id="rolEditar">
                            <option value="1">Admin</option>
                            <option value="3">Ingreso</option>
                            <option value="4">Egreso</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="estadoEditar" class="form-label">Estado</label>
                        <select class="form-select" id="estadoEditar">
                            <option value="Activo">Activo</option>
                            <option value="Inactivo">Inactivo</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary">Guardar cambios</button>
                </form>
            </div>
        </div>
    </div>
</div>

