let botonAgregar = document.getElementById("agregar");
let modalAgregar = document.getElementById("modalAgregar");
let listaIngresos = [];
let listaTiposIngreso = [];
const tablaIngresos = document.getElementById("tablaIngresos").getElementsByTagName('tbody')[0];


//Cargar todos los datos de los ingresos en una lista
fetch("Ingreso/ingresosLista.php")
    .then(response => response.json())
    .then(data => {
        console.log("Datos recibidos:", data);
        if (data.error) {
            console.error("Error en la respuesta del servidor:", data.error);
        } else {
            listaIngresos = data;
            cargarTipos().then(() => cargarIngresos());
        }
    })
    .catch(error => console.error("Error en la solicitud fetch:", error));

//Cargar todos los datos de los tipos de ingresos en una lista
function cargarTipos(){
    return fetch(`Categoria/tipoIngresoLista.php`)
    .then(response => response.json())
    .then(data => {
        console.log("Datos recibidos:", data);
        if (data.error) {
            console.error("Error en la respuesta del servidor:", data.error);
        } else {
            listaTiposIngreso = data;
        }
    })
    .catch(error => console.error("Error en la solicitud fetch:", error));
}


function cargarIngresos() {
    tablaIngresos.innerHTML = ""; 

    listaIngresos.forEach((ingreso) => {

        let nuevaFila = tablaIngresos.insertRow();
        let estado = "";
        let editar = `<div class="d-grid">
                     <i style="color:red;font-size: 25px;" class="bi bi-x-circle"></i>
                    <i style="color:green;font-size: 25px;" class="bi bi-check-circle"></i>
                    </div>`;

        nuevaFila.insertCell(0).innerText = ingreso.Id;
        nuevaFila.insertCell(1).innerText = ingreso.Fecha;
        nuevaFila.insertCell(2).innerText = listaTiposIngreso.find(tipo => tipo.Id === ingreso.IdTipo)?.Nombre || "Tipo no encontrado";
        nuevaFila.insertCell(3).innerText = "$ " + ingreso.Monto;
        nuevaFila.insertCell(4).innerText = ingreso.Metodo;

        if(ingreso.Estado == "Completado"){
            estado = '<p class="bg-success-subtle text-center m-0 p-0">Completado</p>';
        }else if(ingreso.Estado == "Anulado"){
            estado = '<p class="bg-danger-subtle text-center m-0 p-0">Anulado</p>';
        }

        nuevaFila.insertCell(5).innerHTML = estado;

        nuevaFila.insertCell(6).innerHTML = "Mateo Medranda";

        nuevaFila.insertCell(7).innerHTML = '<div class="mx-auto bg-black d-flex justify-content-center align-items-center qr"></div>';
        nuevaFila.insertCell(8).innerHTML = editar;
    });
}

function abrirAgregarIngreso() {
    modalAgregar.showModal();
}