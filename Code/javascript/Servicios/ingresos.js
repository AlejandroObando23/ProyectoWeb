let botonAgregar;
let modalAgregar;
let listaIngresos = [];
let listaTiposIngreso = [];
let tablaIngresos;


//Cargar todos los datos de los ingresos en una lista
function inicializarScriptIngresos(){
    botonAgregar = document.getElementById("agregar");
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

//Cargar todos los datos de los tipos de ingresos en una lista
async function cargarTipos(){
    return fetch(`Categoria/tipoIngresoLista.php`)
    .then(response => response.json())
    .then(data => {
        console.log("Datos recibidos:", data);
        if (data.error) {
            console.error("Error en la respuesta del servidor:", data.error);
        } else {
            listaTiposIngreso = data;
            cargarTiposFormulario();
        }
    })
    .catch(error => console.error("Error en la solicitud fetch:", error));
}

function cargarTiposFormulario() {
    
    let select = document.getElementById("selectTipo");
    let opciones = '<option value="">Seleccione un tipo</option>';

    listaTiposIngreso.forEach(tipo => {
        opciones += `<option value="${tipo.Id}">${tipo.Nombre}</option>`;
    });

    console.log("Tipos de ingreso:", opciones);

    select.innerHTML = opciones;
}


function cargarIngresos() {
    tablaIngresos.innerHTML = ""; 

    listaIngresos.forEach((ingreso) => {

        let nuevaFila = tablaIngresos.insertRow();
        nuevaFila.classList.add("align-middle");
        let estado = "";
        let editar = `<div class="d-grid">
                     <i style="color:red;font-size: 25px;" class="bi bi-x-circle"></i>
                    <i style="color:green;font-size: 25px;" class="bi bi-check-circle"></i>
                    </div>`;

        nuevaFila.insertCell(0).innerText = ingreso.Id;
        nuevaFila.insertCell(1).innerText = ingreso.Fecha;
        nuevaFila.insertCell(2).innerText = ingreso.tipo;
        nuevaFila.insertCell(3).innerText = "$ " + ingreso.Monto;
        nuevaFila.insertCell(4).innerText = ingreso.Metodo;

        if(ingreso.Estado == "Completado"){
            estado = '<p class="bg-success-subtle text-center m-0 p-0">Completado</p>';
        }else if(ingreso.Estado == "Anulado"){
            estado = '<p class="bg-danger-subtle text-center m-0 p-0">Anulado</p>';
        }

        nuevaFila.insertCell(5).innerHTML = estado;

        nuevaFila.insertCell(6).innerHTML = ""+ ingreso.Nombre + " " + ingreso.Apellido;

        nuevaFila.insertCell(7).innerHTML = '<div class="mx-auto bg-black d-flex justify-content-center align-items-center qr"></div>';
        nuevaFila.insertCell(8).innerHTML = editar;
    });
}

//Para abrir y cerrar el dialog que permite agregar un nuevo ingreso
function abrirAgregarIngreso() {
    modalAgregar.showModal();
}

function cerrarAgregarIngreso(){
    modalAgregar.close();
}

function guardarDatos(event) {
    event.preventDefault(); // Evitar que se recargue la página

    let form = document.getElementById("registrarIngreso");

    // Crear un objeto FormData a partir del formulario
    const formData = new FormData(form);
    console.log("Datos enviados:", Array.from(formData.entries()));

    // Enviar los datos al archivo PHP
    fetch("Ingreso/registrarIngreso.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json()) // Suponiendo que el PHP devolverá un JSON
    .then(data => {
        // Manejar la respuesta del servidor
        if (data.success) {
            console.log("Ingreso guardado:", data); // O puedes actualizar la UI
        } else {
            console.error("Error al guardar el ingreso:", data.error);
        }
    })
    .catch(error => console.error("Error en la solicitud:", error));
}
