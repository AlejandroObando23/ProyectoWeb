function cargarPagina(pagina, n) {
    document.getElementById("inicio").classList.remove('active');
    document.getElementById("ingresos").classList.remove('active');
    document.getElementById("gastos").classList.remove('active');
    document.getElementById("reportes").classList.remove('active');

    const contenido = document.getElementById("contenido");
    
    contenido.style.opacity = 0;

    switch(n){
        case 0: document.getElementById("inicio").classList.add('active');break;
        case 1: document.getElementById("ingresos").classList.add('active');break;
        case 2: document.getElementById("gastos").classList.add('active');break;
        case 3: document.getElementById("reportes").classList.add('active');break;
    }

    fetch(pagina)
        .then(response => response.text())
        .then(data => {
            setTimeout(() => {
                contenido.innerHTML = data;
                contenido.style.opacity = 1;

                // Cargar y ejecutar scripts
                let scripts = contenido.querySelectorAll("script");
                scripts.forEach(script => {
                    let nuevoScript = document.createElement("script");
                    if (script.src) {
                        nuevoScript.src = script.src;
                    } else {
                        nuevoScript.textContent = script.innerHTML;
                    }
                    document.body.appendChild(nuevoScript);
                });

                // Cargar CSS si no está agregado
                let links = contenido.querySelectorAll("link[rel='stylesheet']");
                links.forEach(link => {
                    if (!document.querySelector(`link[href="${link.href}"]`)) {
                        let nuevoLink = document.createElement("link");
                        nuevoLink.rel = "stylesheet";
                        nuevoLink.href = link.href;
                        document.head.appendChild(nuevoLink);
                    }
                });
            }, 300);
        })
        .catch(error => console.error("Error al cargar la página:", error));
}

window.onload = () => cargarPagina('../html/Inicio/inicio.html', 0);
