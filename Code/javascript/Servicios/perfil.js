

function inicializarScriptIngresos(){
    Nombre = document.getElementById("agregar");
    Apellido = document.getElementById("agregar");
    Correo = document.getElementById("agregar");
    Cedula = document.getElementById("agregar");
    Contraseña = document.getElementById("agregar");

    modalAgregar = document.getElementById("modalAgregar");
    tablaIngresos = document.getElementById("tablaIngresos").getElementsByTagName('tbody')[0];
    console.log(document.title);
    document.title = "Ingresos | MIECONOMIA";

    fetch("Ingreso/ingresosLista.php")
    .then(response => response.json())
    .then(data => {
        console.log("Datos recibidos:", data);
        if (data.error) {
            console.error("Error en la respuesta del servidor:", data.error);
        } else {
            listaIngresos = data;
            cargarIngresos();
            cargarTipos();
        }
    })
    .catch(error => console.error("Error en la solicitud fetch:", error));
}