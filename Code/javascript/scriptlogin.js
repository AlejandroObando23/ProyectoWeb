function validarEntrada(texto, regex) {
    return regex.test(texto);
}

document.getElementById("user").addEventListener("input", function () {
    if (!validarEntrada(this.value, /^[A-Za-z0-9]+$/)) {
        this.classList.add("error");
    } else {
        this.classList.remove("error");
    }
});

    document.getElementById("password").addEventListener("input", function () {
        if (!validarEntrada(this.value, /^[A-Za-z0-9]{1,15}$/)) {
            this.classList.add("error");
        } else {
            this.classList.remove("error");
        }
    });

document.getElementById("form1").addEventListener("submit", function (event) {
    var usuario = document.getElementById("user");
    var contrasena = document.getElementById("password");
    var errores = [];

    if (!validarEntrada(usuario.value, /^[A-Za-z0-9]+$/)) {
        errores.push(usuario);
    }

    if (!validarEntrada(contrasena.value, /^[A-Za-z0-9]{1,15}$/)) {
        errores.push(contrasena);
    }

    if (errores.length > 0) {
        event.preventDefault(); // Evita el envío del formulario
        alert("Corrige los errores en los campos resaltados.");
        errores[0].focus(); // Hace focus en el primer campo con error
    }
});
