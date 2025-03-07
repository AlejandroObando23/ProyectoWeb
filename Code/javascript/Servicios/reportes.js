function inicializarScriptReportes(){
    const ingresos = 5000;
    const gastos = 3200;
    const balance = ingresos - gastos;

    const ingresosPorTipo = {
        "Salario": 3000,
        "Freelance": 1500,
        "Inversiones": 500
    };

    const gastosPorTipo = {
        "Alquiler": 1200,
        "Comida": 800,
        "Transporte": 600,
        "Otros": 600
    };


    new Chart(document.getElementById("graficoIngresos"), {
        type: "doughnut",
        data: {
            labels: Object.keys(ingresosPorTipo),
            datasets: [{
                data: Object.values(ingresosPorTipo),
                backgroundColor: ["#28a745", "#17a2b8", "#ffc107"]
            }]
        }
    });

    new Chart(document.getElementById("graficoGastos"), {
        type: "doughnut",
        data: {
            labels: Object.keys(gastosPorTipo),
            datasets: [{
                data: Object.values(gastosPorTipo),
                backgroundColor: ["#dc3545", "#fd7e14", "#6f42c1", "#20c997"]
            }]
        }
    });

    const ctxPastel = document.getElementById("graficoPastel").getContext("2d");
    new Chart(ctxPastel, {
        type: "pie",
        data: {
            labels: ["Ingresos", "Gastos"],
            datasets: [{
                data: [ingresos, gastos],
                backgroundColor: ["rgba(75, 192, 192, 0.5)", "rgba(255, 99, 132, 0.5)"],
                borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"]
            }]
        }
    });

    const ctxBarras = document.getElementById("graficoBarras").getContext("2d");
    const canvas = document.getElementById("graficoBarras");

    canvas.width = 400; 
    canvas.height = 400; 

    new Chart(ctxBarras, {
        type: "bar",
        data: {
            labels: ["Ingresos", "Gastos", "Balance"],
            datasets: [{
                label: "Monto en dólares",
                data: [ingresos, gastos, balance],
                backgroundColor: ["#28a745", "#dc3545", "#007bff"]
            }]
        }
    });
}
