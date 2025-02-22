function cargarPagina(pagina, n) {
    document.getElementById("inicio").classList.remove('active');
    document.getElementById("ingresos").classList.remove('active');
    document.getElementById("gastos").classList.remove('active');
    document.getElementById("reportes").classList.remove('active');

    const contenido = document.getElementById("contenido");
    
    contenido.style.opacity = 0;

    fetch(pagina)
        .then(response => response.text())
        .then(data => {
            setTimeout(() => {
                contenido.innerHTML = data;
                contenido.style.opacity = 1;
                switch(n){
                    case 0: document.getElementById("inicio").classList.add('active');break;
                    case 1: 
                        document.getElementById("ingresos").classList.add('active');
                        inicializarScriptIngresos();
                        break;
                    case 2: document.getElementById("gastos").classList.add('active');break;
                    case 3: document.getElementById("reportes").classList.add('active');break;
                }
                
            }, 300);
        })
        .catch(error => console.error("Error al cargar la página:", error));

        
}

window.onload = () => cargarPagina('../html/Inicio/inicio.html', 0);
