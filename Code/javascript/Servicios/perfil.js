function inicializarScriptPerfil() {
    const Nombre = document.getElementById("nombreP");
    const Apellido = document.getElementById("apellidoP");
    const Correo = document.getElementById("correoP");
    const Cedula = document.getElementById("cedulaP");

    fetch("Perfil/cargarPerfil.php")
    .then(response => response.json())
    .then(data => {
        console.log("Datos recibidos:", data);
        if (data.error) {
            console.error("Error en la respuesta del servidor:", data.error);
        } else {
            Nombre.value = data.data.Nombre;
            Apellido.value = data.data.Apellido;
            Correo.value = data.data.Correo;
            Cedula.value = data.data.Cedula;

        }
    })
    .catch(error => console.error("Error en la solicitud fetch:", error));
}
