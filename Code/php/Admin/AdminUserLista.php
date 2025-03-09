<?php
// Inicia la sesión
session_start();

// Verifica si el usuario está autenticado y tiene el rol de admin
if (!isset($_SESSION['usuario']) ) {
    header('Location: ../../html/Administrador/acceso_denegado.html');
    exit();
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