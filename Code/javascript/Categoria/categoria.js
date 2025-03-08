function inicializarScriptCategoria(){
    tipoCategoria  = document.getElementById("tipoCategoria");
    imagenCategoria = document.getElementById("imagenCategoria");
    
    

}


function guardarDatosCategoria(event) {
    event.preventDefault(); // Evita que el formulario recargue la página
    let formCategoria = document.getElementById("formCategoria");
    let formData = new FormData(formCategoria); // Obtiene los datos del formulario
   
    fetch("Categoria/registrarCategoria.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json()) // Cambia a .json() si el servidor devuelve JSON
    .then(data => {
        if (data.success) {
            // Muestra un mensaje de éxito en la misma página
            alert("Dato correctamente ingresado: " + data.message);
        } else {
            // Muestra un mensaje de error en la misma página
            alert("Error: " + data.error);
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Hubo un error al enviar el formulario.");
    });
};