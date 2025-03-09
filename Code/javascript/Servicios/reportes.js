function inicializarScriptReportes(){
    cargarAnios();
    consultarReporte();
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

function cargarAnios() {
    let selectAnios = document.getElementById("aniosSelect");
    selectAnios.innerHTML = "";

    fetch("Reporte/obtenerAnios.php")
        .then(response => response.json())
        .then(anios => {

            console.log("años recibidos: " +anios);           
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

function consultarReporte(){
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

            let variacion =  Number(data.variacion_porcentaje);
            let comparacion = "";

            if(variacion >= 0){
                comparacion = "<h5 class='text-success'>" + variacion + " % <i class='bi bi-caret-up-fill'></i></h5>";
            }else{
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
            document.getElementById("balance_anual").textContent = "$ " + (Number(data.ingreso_anual)-Number(data.gasto_anual));
        })
        .catch(error => console.error("Error:", error));
}