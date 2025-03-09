document.addEventListener("DOMContentLoaded", function () {
    let toggleInactivos = document.getElementById("toggleInactivos");

    // Verifica si el checkbox está presente en la página
    if (toggleInactivos) {
        toggleInactivos.addEventListener("change", function () {
            let url = window.location.pathname + "?ver_inactivos=" + (this.checked ? "1" : "0");
            window.location.href = url;
        });
    } else {
        console.warn("El elemento toggleInactivos no está presente en la página.");
    }

    // Delegación de eventos para cambiar el estado del usuario
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("cambiar-estado")) {
            let boton = event.target;
            let cedula = boton.getAttribute("data-cedula");
            let nuevoEstado = boton.getAttribute("data-estado");

            // Enviar la solicitud AJAX para cambiar el estado
            fetch("/web/WebProyecto/ProyectoWeb/Code/php/Admin/usuarios_inactivos.php", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `cedula=${cedula}&estado=${nuevoEstado}`
            })
            .then(response => response.text())
            .then(data => {
                console.log("Respuesta del servidor:", data);
                if (data === "success") {
                    // Actualizar visualmente el estado
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
    });
});
