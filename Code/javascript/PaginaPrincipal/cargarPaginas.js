function cargarPagina(pagina, n) {
    const ids = ["inicio", "ingresos", "gastos", "reportes"];

    ids.forEach(id => {
        const elemento = document.getElementById(id);
        if (elemento) {
            elemento.classList.remove('active');
        }
    });

    const contenido = document.getElementById("contenido");
    contenido.style.opacity = 0;

    setTimeout(() => {
        fetch(pagina)
            .then(response => response.text())
            .then(data => {
                contenido.innerHTML = data;
                contenido.style.opacity = 1;

                let activarId = null;
                switch(n){
                    case 0: 
                        activarId = "inicio";
                        document.title = "Inicio | MIECONOMIA";
                        inicializarScriptDashboard();
                        break;
                    case 1: 
                        activarId = "ingresos";
                        inicializarScriptIngresos();
                        break;
                    case 2: 
                        activarId = "gastos";
                        gastoscript();
                        break;
                    case 3: 
                        activarId = "reportes";
                        break;
                    case 4:
                        
                        break;
                }

                if (activarId) {
                    const activarElemento = document.getElementById(activarId);
                    if (activarElemento) {
                        activarElemento.classList.add('active');
                    }
                }
            })
            .catch(error => console.error("Error al cargar la página:", error));
    }, 300); 
}

window.onload = () => cargarPagina('../html/Administrador/AdminInicio.html', 0);
