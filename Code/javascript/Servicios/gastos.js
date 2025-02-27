
let form;
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
     
    
}

