function abrirAgregarPerfil() {
    let modalAgregarPerfil = document.getElementById("modalAgregarPerfiles");

    modalAgregarPerfil.showModal();
}

function cerrarAgregarPerfil() {
    let modalAgregarPerfil = document.getElementById("modalAgregarPerfiles");

    modalAgregarPerfil.close();
}


function guardarPerfilNuevo(){
    event.preventDefault();

    let nombreRol = document.getElementById("nombreRol").value;
    let descripcion = document.getElementById("descripcion").value;
    let permisos = [];

    document.querySelectorAll(".form-check-input").forEach(input => {
        if (input.checked) {
            permisos.push(input.nextElementSibling.innerText);
        }
    });

    let tableBody = document.getElementById("perfilTableBody");
    let row = tableBody.insertRow();
    row.insertCell(0).innerText = nombreRol;
    row.insertCell(1).innerText = descripcion;
    row.insertCell(2).innerText = permisos.join(", ");

    document.getElementById("perfilForm").reset();
}
