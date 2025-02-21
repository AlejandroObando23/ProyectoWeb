let botonAgregar = document.getElementById("agregar");
let modalAgregar = document.getElementById("modalAgregar");
let listaIngresos = [];

fetch(`../../php/Ingreso/mostrarIngresos.php`)
    .then(response => response.json())
    .then(data => {
        console.log("Datos recibidos:", data);
        if (data.error) {
            console.error("Error en la respuesta del servidor:", data.error);
        } else {
            listaIngresos = data;
            cargarIngresos();
        }
    })
    .catch(error => console.error("Error en la solicitud fetch:", error));

function abrirAgregarIngreso() {
    modalAgregar.showModal();
}

function cargarIngresos() {

    listaIngresos.forEach((ingreso) => {
        let fila = `<tr class="align-middle">
                    <th scope="row">`+ ingreso.Id + `</th>
                     <td>`+ingreso.Fecha+`</td>
                     <td>`+ingreso.Tipo+`</td>
                    <td>$ 100</td>
                    <td>Efectivo</td>
                    <td><p class="bg-success-subtle text-center m-0 p-0">Completado</p></td>
                    <td>Mateo Medranda</td>
                    <td><div class="mx-auto bg-black d-flex justify-content-center align-items-center qr"></div></td>
                    <td>
                    <div class="d-grid">
                     <i style="color:red;font-size: 25px;" class="bi bi-x-circle"></i>
                    <i style="color:green;font-size: 25px;" class="bi bi-check-circle"></i>
                    </div>
                    </td>
                    </tr>`;
    });


}