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
            cerrarAgregarIngreso();
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
        nuevaFila.insertCell(2).innerText = ingreso.Descripcion;
        nuevaFila.insertCell(3).innerText = "$ " + ingreso.Monto;
        nuevaFila.insertCell(4).innerText = ingreso.tipo;
        nuevaFila.insertCell(5).innerText = ingreso.Metodo;

        if(ingreso.Estado == "Completado"){
            estado = '<p class="bg-success-subtle text-center m-0 p-0">Completado</p>';
        }else if(ingreso.Estado == "Anulado"){
            estado = '<p class="bg-danger-subtle text-center m-0 p-0">Anulado</p>';
        }

        nuevaFila.insertCell(6).innerHTML = estado;

        nuevaFila.insertCell(7).innerHTML = ""+ ingreso.Nombre + " " + ingreso.Apellido;
        nuevaFila.insertCell(8).innerHTML = ingreso.FechaRegistro;

        let url = ""+ingreso.CodigoQR;

        console.log(url);

        nuevaFila.insertCell(9).innerHTML = `<div class="shadow mx-auto bg-black d-flex justify-content-center align-items-center qr botonQr" onclick="mostrarQR('`+url+`')"></div>`;
        nuevaFila.insertCell(10).innerHTML = editar;
    });
    renderTable();
}

//Para abrir y cerrar el dialog que permite agregar un nuevo ingreso
function abrirAgregarIngreso() {
    modalAgregar.showModal();
}

function cerrarAgregarIngreso(){
    let form = document.getElementById("registrarIngreso");
    form.reset();
    modalAgregar.close();
}

//Permite llamar al archivo php que realiza el ingreso de los datos en MYSQL
function guardarDatos(event) {
    event.preventDefault(); 

    let form = document.getElementById("registrarIngreso");

    const formData = new FormData(form);
    console.log("Datos enviados:", Array.from(formData.entries()));

    fetch("Ingreso/registrarIngreso.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json()) 
    .then(data => {
        if (data.success) {
            console.log("Ingreso guardado:", data);
            inicializarScriptIngresos();
        } else {
            console.error("Error al guardar el ingreso:", data.error);
        }
    })
    .catch(error => console.error("Error en la solicitud:", error));
}

function mostrarQR(imagen) {
    document.getElementById("codigoQr").style.display = "flex";
    document.getElementById("cargarQr").src=imagen;
}

function cerrarQR() {
    document.getElementById("codigoQr").style.display = "none";
}

//para la paginación
let itemsPerPage = 5;
let currentPage = 1;

function renderTable() {
    const tableBody = document.getElementById("table-body");
    const rows = tableBody.getElementsByTagName("tr");
    let start = (currentPage - 1) * itemsPerPage;
    let end = start + itemsPerPage;
    
    for (let i = 0; i < rows.length; i++) {
        rows[i].style.display = (i >= start && i < end) ? "" : "none";
    }
    
    renderPagination();
}

function renderPagination() {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";
    let totalPages = Math.ceil(listaIngresos.length / itemsPerPage);
    
    pagination.innerHTML += `<li class='page-item ${currentPage === 1 ? "disabled" : ""}'>
                                <a class='page-link' href='#' onclick='changePage(${currentPage - 1})'>Anterior</a>
                            </li>`;
    
    for (let i = 1; i <= totalPages; i++) {
        pagination.innerHTML += `<li class='page-item ${currentPage === i ? "active" : ""}'>
                                    <a class='page-link' href='#' onclick='changePage(${i})'>${i}</a>
                                </li>`;
    }
    
    pagination.innerHTML += `<li class='page-item ${currentPage === totalPages ? "disabled" : ""}'>
                                <a class='page-link' href='#' onclick='changePage(${currentPage + 1})'>Siguiente</a>
                            </li>`;
}

function changePage(page) {
    const totalPages = Math.ceil(listaIngresos.length / itemsPerPage);
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderTable();
}

function updateItemsPerPage() {
    itemsPerPage = parseInt(document.getElementById("itemsPerPage").value);
    currentPage = 1;
    renderTable();
}