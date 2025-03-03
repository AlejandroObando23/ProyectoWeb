
let form;


let listaEgresos = [];
let listaTiposEgresos = [];
let tablaEgresos;
//Cargar todos los datos de los ingresos en una lista

function abrirAgregarGasto() {
    modalAgregargasto.showModal();
}
function cerrarAgregarGasto(){
    modalAgregargasto.close();
    
}
function guardarDatosEgreso(event){
    // Evitar que se recargue la página
    event.preventDefault();
    let form = document.getElementById("registrarIngreso");
    const formData = new FormData(form);
    console.log("Datos enviados:", Array.from(formData.entries()));

    // Enviar los datos al archivo PHP
    fetch("Gasto/registrarGastos.php", {
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
    

//Cargar todos los datos de los tipos de ingresos en una lista
function gastoscript(){
    let modalAgregargasto = document.getElementById("modalAgregargasto");
    
    tablaEgresos = document.getElementById("tablaEgresos").getElementsByTagName('tbody')[0];
   
    console.log(document.title);
    document.title = "Gastos | MIECONOMIA";
    fetch("Gasto/gastosLista.php")
    .then(response => response.json())
    .then(data => {
        console.log("Datos recibidos:", data);
        if (data.error) {
            
            console.error("Error en la respuesta del servidor:", data.error);
           
        } else {
            listaEgresos = data;
            cargarEgresos();
            cargarTiposEgresos();
            
            
            
           

        }
    })
    
    .catch(error => console.error("Error en la solicitud fetch:", error));
    
    
}

async function cargarTiposEgresos(){
    return fetch(`Categoria/tipoIngresoLista.php`)
    .then(response => response.json())
    .then(data => {
        console.log("Datos recibidos:", data);
        if (data.error) {
            
            console.error("Error en la respuesta del servidor:", data.error);
            
        } else {
            listaEgresos = data;
           
            cargarTiposFormularioEgreso();
            cerrarAgregarGasto();
        }
    })
    .catch(error => console.error("Error en la solicitud fetch:", error));
}

function cargarTiposFormularioEgreso() {
    
    let select = document.getElementById("selectTipo");
    let opciones = '<option value="">Seleccione un tipo</option>';

    listaTiposIngreso.forEach(tipo => {
        opciones += `<option value="${tipo.Id}">${tipo.Nombre}</option>`;
    });

    console.log("Tipos de ingreso:", opciones);

    select.innerHTML = opciones;
}

function cargarEgresos() {
    tablaEgresos.innerHTML = ""; 
    
    listaEgresos.forEach((ingreso) => {

        let nuevaFila = tablaEgresos.insertRow();
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
    
    renderizarTable();
    
   
}


function mostrarQR(imagen) {
    document.getElementById("codigoQr").style.display = "flex";
    document.getElementById("cargarQr").src=imagen;
}

function cerrarQR() {
    document.getElementById("codigoQr").style.display = "none";
}


let itemsPorPagina = 5;
let actualPagina = 1;

function renderizarTable() {
    const tableBody = document.getElementById("table-body");
   
    const rows = tableBody.getElementsByTagName("tr");
    
    let start = (actualPagina - 1) * itemsPorPagina;
    let end = start + itemsPorPagina;
    
    for (let i = 0; i < rows.length; i++) {
        rows[i].style.display = (i >= start && i < end) ? "" : "none";
    }
    
    renderizarPagination();
   
}

function renderizarPagination() {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";
    let totalPages = Math.ceil(listaIngresos.length / itemsPorPagina);
    
    pagination.innerHTML += `<li class='page-item ${actualPagina === 1 ? "disabled" : ""}'>
                                <a class='page-link' href='#' onclick='changePage(${actualPagina - 1})'>Anterior</a>
                            </li>`;
    
    for (let i = 1; i <= totalPages; i++) {
        pagination.innerHTML += `<li class='page-item ${actualPagina === i ? "active" : ""}'>
                                    <a class='page-link' href='#' onclick='changePage(${i})'>${i}</a>
                                </li>`;
    }
    
    pagination.innerHTML += `<li class='page-item ${actualPagina === totalPages ? "disabled" : ""}'>
                                <a class='page-link' href='#' onclick='changePage(${actualPagina + 1})'>Siguiente</a>

                                </li>`;
                                
                            }

function changePage(page) {
    const totalPages = Math.ceil(listaIngresos.length / itemsPorPagina);
    if (page < 1 || page > totalPages) return;
    actualPagina = page;
    renderizarTable();
}

function updateItemsPerPage() {
    itemsPorPagina = parseInt(document.getElementById("itemsPerPage").value);
    actualPagina = 1;
    renderizarTable();
}