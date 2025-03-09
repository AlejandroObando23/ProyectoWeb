function inicializarScriptUsuarios() {
    cargarUsuarios();

    document.getElementById("toggleInactivos").addEventListener("change", function () {
        cargarUsuarios(this.checked);
    });

    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("editar-usuario")) {
            mostrarFormularioEditar(event.target);
        }
    });

    document.getElementById("formEditarUsuario").addEventListener("submit", function (event) {
        event.preventDefault();
        guardarCambiosUsuario();
    });
}

function cargarUsuarios(mostrarInactivos = false) {
    let url = `Admin/ObtenerUsuarios.php?ver_inactivos=${mostrarInactivos ? "1" : "0"}`;

    fetch(url)
        .then(response => response.json())
        .then(usuarios => {
            let tbody = document.getElementById("usuariosTabla");
            tbody.innerHTML = "";

            if (usuarios.length > 0) {
                usuarios.forEach(usuario => {
                    let fila = document.createElement("tr");
                    fila.id = `usuario-${usuario.Cedula}`;
                    fila.innerHTML = `
                        <td>${usuario.Cedula}</td>
                        <td>${usuario.Nombre}</td>
                        <td>${usuario.Apellido}</td>
                        <td>${usuario.Correo}</td>
                        <td>${usuario.Rol}</td>
                        <td>
                            <span class="badge ${usuario.Estado === 'Activo' ? 'bg-success' : 'bg-secondary'}" id="estado-${usuario.Cedula}">
                                ${usuario.Estado}
                            </span>
                        </td>
                        <td>
                            <button class="btn btn-warning btn-sm editar-usuario" data-cedula="${usuario.Cedula}" data-nombre="${usuario.Nombre}" data-apellido="${usuario.Apellido}" data-correo="${usuario.Correo}" data-rol="${usuario.Rol}" data-estado="${usuario.Estado}">
                                Editar
                            </button>
                        </td>
                    `;
                    tbody.appendChild(fila);
                });
            } else {
                tbody.innerHTML = '<tr><td colspan="7" class="text-center">No hay usuarios registrados</td></tr>';
            }
        })
        .catch(error => console.error("Error cargando usuarios:", error));
}

function mostrarFormularioEditar(boton) {
    let cedula = boton.getAttribute("data-cedula");
    let nombre = boton.getAttribute("data-nombre");
    let apellido = boton.getAttribute("data-apellido");
    let correo = boton.getAttribute("data-correo");
    let rol = boton.getAttribute("data-rol");
    let estado = boton.getAttribute("data-estado");

    // Llenar el formulario con los datos actuales del usuario
    document.getElementById("cedulaEditar").value = cedula;
    document.getElementById("rolEditar").value = rol;
    document.getElementById("estadoEditar").value = estado;

    // Mostrar el modal
    new bootstrap.Modal(document.getElementById('editarUsuarioModal')).show();
}

function guardarCambiosUsuario() {
    let cedula = document.getElementById("cedulaEditar").value;
    let rol = document.getElementById("rolEditar").value;
    let estado = document.getElementById("estadoEditar").value;

    fetch("../php/Admin/AdminUserLista.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `cedula=${cedula}&rol=${rol}&estado=${estado}`
    })
    .then(response => response.text())
    .then(data => {
        if (data === "success") {
            // Actualizar la vista en la tabla
            let fila = document.getElementById(`usuario-${cedula}`);
            fila.querySelector(".badge").classList.replace(
                fila.querySelector(".badge").classList.contains("bg-success") ? "bg-success" : "bg-secondary",
                estado === "Activo" ? "bg-success" : "bg-secondary"
            );
            fila.querySelector(".badge").innerText = estado;
            fila.querySelector(".btn").innerText = "Editar";

            // Cerrar el modal
            bootstrap.Modal.getInstance(document.getElementById('editarUsuarioModal')).hide();
        } else {
            alert("Error al guardar los cambios");
        }
    })
    .catch(error => console.error("Error en la solicitud AJAX:", error));
}
