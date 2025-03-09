function inicializarScriptReportes() {
    cargarAnios();
    consultarReporte();
    cargarGrafico();

    document.getElementById("ingresoGastoTipo").style.display = "none";
    document.getElementById("ingresoVSgasto").style.display = "none";

}

function cargarAnios() {
    let selectAnios = document.getElementById("aniosSelect");
    selectAnios.innerHTML = "";

    fetch("Reporte/obtenerAnios.php")
        .then(response => response.json())
        .then(anios => {

            console.log("años recibidos: " + anios);
            selectAnios.innerHTML = '<option value="">Seleccione una opción</option>';

            anios.forEach(anio => {
                let option = document.createElement("option");
                option.value = anio;
                option.textContent = anio;
                selectAnios.appendChild(option);
            });
        })
        .catch(error => console.error("Error cargando los años:", error));
}

function consultarReporte() {
    let anio = document.getElementById("aniosSelect").value;
    let mes = document.getElementById("mesesSelect").value;

    console.log(1);

    anio = anio === "Seleccione una opcion" ? 0 : anio;
    mes = mes === "" ? 0 : mes;

    fetch(`Reporte/obtenerReporte.php?anio=${anio}&mes=${mes}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
                return;
            }
            console.log("reporte: ");
            console.log(data);

            let variacion = Number(data.variacion_porcentaje);
            let comparacion = "";

            if (variacion >= 0) {
                comparacion = "<h5 class='text-success'>" + variacion + " % <i class='bi bi-caret-up-fill'></i></h5>";
            } else {
                comparacion = "<h5 class='text-danger'>" + variacion + " % <i class='bi bi-caret-down-fill'></i></h5>";
            }



            document.getElementById("ingreso_mensual").textContent = `$ ${data.ingreso_total}`;
            document.getElementById("gasto_mensual").textContent = `$ ${data.gasto_total}`;
            document.getElementById("balance_mensual").textContent = `$ ${data.balance_neto}`;
            document.getElementById("categoriaMayorIngreso").textContent = data.categoria_mayor_ingreso;
            document.getElementById("categoriaMayorGasto").textContent = data.categoria_mayor_gasto;
            document.getElementById("comparacion").innerHTML = comparacion;
            document.getElementById("cantidadIngresos").textContent = data.cantidad_ingresos;
            document.getElementById("cantidadGastos").textContent = data.cantidad_gastos;
            document.getElementById("cantidadTransacciones").textContent = Number(data.cantidad_gastos) + Number(data.cantidad_ingresos);
            document.getElementById("ingreso_anual").textContent = `$ ${data.ingreso_anual}`;
            document.getElementById("gasto_anual").textContent = `$ ${data.gasto_anual}`;
            document.getElementById("balance_anual").textContent = "$ " + (Number(data.ingreso_anual) - Number(data.gasto_anual));
            destruirTodosLosGraficos();
            cargarGrafico();
        })
        .catch(error => console.error("Error:", error));
}

function abrirGrafico(){
    let opcion = Number(document.getElementById("graficoSelect").value);

    switch (opcion){
        case 0:
            document.getElementById("ingresoGastoTipo").style.display = "none";
            document.getElementById("ingresoVSgasto").style.display = "none";
            break;
        case 1:
            document.getElementById("ingresoGastoTipo").style.display = "flex";
            document.getElementById("ingresoVSgasto").style.display = "none";
            break;
        case 2:
            document.getElementById("ingresoVSgasto").style.display = "flex";
            document.getElementById("ingresoGastoTipo").style.display = "none";
            break;
    }
}

function cargarGrafico() {
    let anio = document.getElementById("aniosSelect").value;
    let mes = document.getElementById("mesesSelect").value;

    anio = anio === "Seleccione una opcion" ? 0 : anio;
    mes = mes === "" ? 0 : mes;

    fetch(`Reporte/datosGraficos.php?anio=${anio}&mes=${mes}`) 
        .then(response => response.json())
        .then(data => {
            const ingresos = data.ingreso_total; 
            const gastos = data.gasto_total;  

            const ingresosPorTipo = data.ingresos_por_tipo;  
            const gastosPorTipo = data.gastos_por_tipo;  

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

            new Chart(document.getElementById("graficoPastel"), {
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

            const fechas = [];
            let ingresosMonto = [];
            let egresosMonto = [];

            const allDates = [
                ...data.ingresos_por_fecha.map(item => item.fecha),
                ...data.gastos_por_fecha.map(item => item.fecha)
            ];

            const uniqueDates = [...new Set(allDates)].sort();

            let lastIngreso = 0;
            let lastEgreso = 0;

            uniqueDates.forEach(fecha => {
                const ingreso = data.ingresos_por_fecha.find(item => item.fecha === fecha);
                if (ingreso) {
                    lastIngreso = parseFloat(ingreso.monto);
                }

                const egreso = data.gastos_por_fecha.find(item => item.fecha === fecha);
                if (egreso) {
                    lastEgreso = parseFloat(egreso.monto);
                }

                fechas.push(fecha);
                ingresosMonto.push(lastIngreso);
                egresosMonto.push(lastEgreso);
            });

            new Chart(document.getElementById("graficoLineas"), {
                type: "line",
                data: {
                    labels: fechas,
                    datasets: [
                        {
                            label: "Ingresos",
                            data: ingresosMonto,
                            borderColor: "rgba(75, 192, 192, 1)",
                            backgroundColor: "rgba(75, 192, 192, 0.2)",
                            fill: true
                        },
                        {
                            label: "Egresos",
                            data: egresosMonto,
                            borderColor: "rgba(255, 99, 132, 1)",
                            backgroundColor: "rgba(255, 99, 132, 0.2)",
                            fill: true
                        }
                    ]
                },
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Fecha'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Monto'
                            }
                        }
                    }
                }
            });
        })
        .catch(error => console.error("Error al cargar los datos:", error));
}

function destruirTodosLosGraficos() {
    const canvases = document.querySelectorAll("canvas");
    canvases.forEach(canvas => {
        if (canvas.chart) {
            canvas.chart.destroy(); 
        }
    });
}