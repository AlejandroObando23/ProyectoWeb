function inicializarScriptUsuarios(){
    cargarUsuarios();

    document.getElementById("toggleInactivos").addEventListener("change", function () {
        cargarUsuarios(this.checked);
    });

    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("cambiar-estado")) {
            cambiarEstado(event.target);
        }
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
                        <td>
                            <span class="badge ${usuario.Estado === 'Activo' ? 'bg-success' : 'bg-secondary'}" id="estado-${usuario.Cedula}">
                                ${usuario.Estado}
                            </span>
                        </td>
                        <td>
                            <button class="btn btn-warning btn-sm cambiar-estado" 
                                    data-cedula="${usuario.Cedula}" 
                                    data-estado="${usuario.Estado === 'Activo' ? 'Inactivo' : 'Activo'}">
                                ${usuario.Estado === 'Activo' ? 'Desactivar' : 'Activar'}
                            </button>
                        </td>
                    `;
                    tbody.appendChild(fila);
                });
            } else {
                tbody.innerHTML = '<tr><td colspan="6" class="text-center">No hay usuarios registrados</td></tr>';
            }
        })
        .catch(error => console.error("Error cargando usuarios:", error));
}

function cambiarEstado(boton) {
    let cedula = boton.getAttribute("data-cedula");
    let nuevoEstado = boton.getAttribute("data-estado");

    fetch("Admin/usuarios_inactivos.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `cedula=${cedula}&estado=${nuevoEstado}`
    })
    .then(response => response.text())
    .then(data => {
        if (data === "success") {
            let estadoSpan = document.getElementById("estado-" + cedula);
            if (nuevoEstado === "Activo") {
                estadoSpan.classList.replace("bg-secondary", "bg-success");
                estadoSpan.innerText = "Activo";
                boton.innerText = "Desactivar";
                boton.setAttribute("data-estado", "Inactivo");
            } else {
                estadoSpan.classList.replace("bg-success", "bg-secondary");
                estadoSpan.innerText = "Inactivo";
                boton.innerText = "Activar";
                boton.setAttribute("data-estado", "Activo");
            }
        } else {
            alert("Error al cambiar el estado");
        }
    })
    .catch(error => console.error("Error en la solicitud AJAX:", error));
}
