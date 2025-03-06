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
        document.getElementById(id).innerText = numero.toFixed(2);  
        
        if (numero >= numeroFinal) {
            clearInterval(intervalo);
        } else {
            numero += numeroFinal / 100;  
        }
    }, 20);  
}

function dibujarGrafica(){
    ctx = document.getElementById("grafica");
    meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    ingresos = [20, 40, 40, 30, 25, 19, 0, 0, 0, 0, 0, 0];

    const myChart = new Chart(ctx, {
        type: 'bar',  // Aquí debe ser una cadena de texto 'bar'
        data: {
            labels: meses,
            datasets: [{
                label: 'Ingreso',
                data: ingresos,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1.5
            }]
        }
    });
}