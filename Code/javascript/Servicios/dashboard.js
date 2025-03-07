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
            animarNumero('ingresoTotal', data.IngresoTotal);
            animarNumero('ingresoMensual', data.IngresoEsteMes);
            dibujarGrafica();
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

        element.innerText = numero.toFixed(2);  

        if (numero >= numeroFinal) {
            clearInterval(intervalo);
        } else {
            numero += numeroFinal / 100;  
        }
    }, 7);  
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

