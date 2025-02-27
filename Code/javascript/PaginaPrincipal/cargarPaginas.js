function cargarPagina(pagina, n) {
    document.getElementById("inicio").classList.remove('active');
    document.getElementById("ingresos").classList.remove('active');
    document.getElementById("gastos").classList.remove('active');
    document.getElementById("reportes").classList.remove('active');

    const contenido = document.getElementById("contenido");

    // Iniciar la animación de ocultar
    contenido.style.opacity = 0;

    // Esperar la duración de la animación antes de cargar el nuevo contenido
    setTimeout(() => {
        fetch(pagina)
            .then(response => response.text())
            .then(data => {
                contenido.innerHTML = data;
                // Volver a mostrar el contenido con opacidad 1
                contenido.style.opacity = 1;
                switch(n){
                    case 0: document.getElementById("inicio").classList.add('active');break;
                    case 1: 
                        document.getElementById("ingresos").classList.add('active');
                        inicializarScriptIngresos();
                        break;
                    case 2: document.getElementById("gastos").classList.add('active'); 
                    gastoscript();break;
                    case 3: document.getElementById("reportes").classList.add('active'); break;
                }
            })
            .catch(error => console.error("Error al cargar la página:", error));
    }, 300); // Este tiempo debe coincidir con la duración de la transición CSS
}

window.onload = () => cargarPagina('../html/Administrador/AdminInicio.html', 0);
