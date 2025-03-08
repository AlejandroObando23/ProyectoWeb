let ctx;
let meses;
let ingresos;

function inicializarScriptDashboard() {
    fetch("Ingreso/ingresosTotalesMensuales.php")
    .then(response => response.json())
    .then(data => {
        console.log("Datos recibidos:", data);
        if (data.error) {
            console.error("Error en la respuesta del servidor:", data.error);
        } else {
            const ingresoTotal = parseFloat(data.IngresoTotal);
            const ingresoEsteMes = parseFloat(data.IngresoEsteMes);

            console.log("Ingreso total:", ingresoTotal);
            console.log("Ingreso este mes:", ingresoEsteMes);

            if (!isNaN(ingresoTotal) && !isNaN(ingresoEsteMes)) {
                // Llamar la animación solo si los números son válidos
                animarNumero('ingresoTotal', ingresoTotal);
                animarNumero('ingresoMensual', ingresoEsteMes);
                dibujarGrafica();
            } else {
                console.error("Los datos de ingresos no son números válidos.");
            }
        }
    })
    .catch(error => console.error("Error en la solicitud fetch:", error));
}

function animarNumero(id, numeroFinal) {
    let numero = 0;
    const intervalo = setInterval(() => {
        const element = document.getElementById(id);

        if (!element) {
            clearInterval(intervalo);
            return;
        }

        // Mostrar los valores con dos decimales
        element.innerText = numero.toFixed(2);

        if (numero >= numeroFinal) {
            clearInterval(intervalo);
            // Asegurarse de que el número final se establezca correctamente
            element.innerText = numeroFinal.toFixed(2);
        } else {
            // Aumentar el valor de incremento para cargar más rápido
            numero += (numeroFinal - numero) / 5;  // Incremento más grande
        }
    }, 10);  // Intervalo más rápido, 10ms
}



function dibujarGrafica() {
    fetch('Ingreso/ingresosMensuales.php') 
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.error("Error:", data.error);
            return;
        }

        const meses = data.map(item => {
            const nombresMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
                                  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
            return nombresMeses[item.mes - 1];
        });

        const ingresos = data.map(item => item.total_ingresos);

        const gastos = ingresos.map(() => Math.floor(Math.random() * 50)); 

        console.log("Meses con ingresos:", meses);
        console.log("Ingresos:", ingresos);
        console.log("Gastos:", gastos);

        const ctx = document.getElementById("grafica").getContext("2d");

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: meses, 
                datasets: [
                    {
                        label: 'Ingresos',
                        data: ingresos,
                        backgroundColor: 'rgba(75, 192, 192, 0.5)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Gastos',
                        data: gastos,
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    })
    .catch(error => console.error("Error en la petición:", error));
}

