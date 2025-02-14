document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("formUsuario");
    const campos = ["cedula", "nombre", "apellido", "correo", "password"];
    const mensajeError = document.getElementById("mensajeError");
    const botonEnviar = document.getElementById("btnEnviar");

    // Validar cada campo al perder el foco
    campos.forEach((campoId) => {
        const campo = document.getElementById(campoId);
        campo.addEventListener("blur", function () {
            validarCampoSecuencial(campoId);
            actualizarEstadoBoton();
        });
    });

    // Validación al enviar el formulario
    form.addEventListener("submit", function (event) {
        mensajeError.classList.add("d-none");
        mensajeError.innerHTML = "";

        let esValido = true;
        campos.forEach((campoId) => {
            if (!validarCampoSecuencial(campoId)) esValido = false;
        });

        if (!esValido) {
            event.preventDefault(); // Evitar el envío si hay errores
            mensajeError.classList.remove("d-none");
            mensajeError.innerHTML = "Por favor, corrige los campos marcados antes de continuar.";
        }
    });

    function validarCampoSecuencial(campoId) {
        const input = document.getElementById(campoId);
        let esValido = false;

        switch (campoId) {
            case "cedula":
                esValido = validarCedula(input);
                break;
            case "nombre":
                esValido = validarNombre(input);
                break;
            case "apellido":
                esValido = validarApellido(input);
                break;
            case "correo":
                esValido = validarCorreo(input);
                break;
            case "password":
                esValido = validarPassword(input);
                break;
        }

        return esValido;
    }

    function validarCedula(campo) {
        const regex = /^\d{10}$/;
        return aplicarValidacion(campo, regex, "La cédula debe tener 10 dígitos y solo números.");
    }

    function validarNombre(campo) {
        const regex = /^[A-Za-z]+$/;
        return aplicarValidacion(campo, regex, "El nombre no debe contener números ni espacios.");
    }

    function validarApellido(campo) {
        const regex = /^[A-Za-z]+$/;
        return aplicarValidacion(campo, regex, "El apellido no debe contener números ni espacios.");
    }

    function validarCorreo(campo) {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return aplicarValidacion(campo, regex, "Por favor, ingresa un correo electrónico válido.");
    }

    function validarPassword(campo) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
        return aplicarValidacion(campo, regex, "La contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula y un número.");
    }

    function aplicarValidacion(campo, regex, mensaje) {
        if (!regex.test(campo.value)) {
            marcarInvalido(campo, mensaje);
            return false;
        }
        marcarValido(campo);
        return true;
    }

    function marcarInvalido(campo, mensaje) {
        campo.classList.add("invalid-field");
        campo.setCustomValidity(mensaje); // Forzar el mensaje de error
        mensajeError.classList.remove("d-none");
        mensajeError.innerHTML = mensaje;
        campo.focus(); // Mantener el foco en el campo hasta que sea válido
    }

    function marcarValido(campo) {
        campo.classList.remove("invalid-field");
        campo.setCustomValidity("");
    }

    function actualizarEstadoBoton() {
        let hayErrores = campos.some((campoId) => {
            const campo = document.getElementById(campoId);
            return !campo.checkValidity();
        });
        botonEnviar.disabled = hayErrores;
    }
});
