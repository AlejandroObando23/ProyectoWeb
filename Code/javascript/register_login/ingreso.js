document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("formUsuario");
    const campos = ["cedula", "nombre", "apellido", "correo", "password"];
    const mensajeError = document.getElementById("mensajeError");
    const botonEnviar = document.getElementById("btnEnviar");

    campos.forEach((campoId) => {
        const campo = document.getElementById(campoId);

        // Cuando el campo recibe foco, resaltar el campo
        campo.addEventListener("focus", function () {
            resaltarCampo(campoId);
        });

        // Cuando el campo pierde el foco, validarlo
        campo.addEventListener("blur", function () {
            validarCampoSecuencial(campoId);
            actualizarEstadoBoton();
        });
    });

    form.addEventListener("submit", function (event) {
        mensajeError.classList.add("d-none");
        mensajeError.innerHTML = "";

        let esValido = true;
        campos.forEach((campoId) => {
            if (!validarCampoSecuencial(campoId)) esValido = false;
        });

        if (!esValido) {
            event.preventDefault();
            mensajeError.classList.remove("d-none");
            mensajeError.innerHTML = "Por favor, corrige los campos marcados antes de continuar.";
        }
    });

    function resaltarCampo(campoId) {
        // Agregar clase para resaltar el campo con foco
        const contenedor = document.getElementById(campoId).closest('.campo-contenedor');
        contenedor.classList.add("focused-field");  // Añadir una clase CSS para el enfoque
    }

    function validarCampoSecuencial(campoId) {
        const input = document.getElementById(campoId);
        const contenedor = input.closest('.campo-contenedor');

        let esValido = false;
        switch (campoId) {
            case "cedula":
                esValido = validarCedula(input, contenedor);
                break;
            case "nombre":
                esValido = validarNombre(input, contenedor);
                break;
            case "apellido":
                esValido = validarApellido(input, contenedor);
                break;
            case "correo":
                esValido = validarCorreo(input, contenedor);
                break;
            case "password":
                esValido = validarPassword(input, contenedor);
                break;
        }
        return esValido;
    }

    function validarCedula(campo, contenedor) {
        const regex = /^\d{10}$/;
        return aplicarValidacion(campo, regex, "La cédula debe tener 10 dígitos y solo números.", contenedor);
    }

    function validarNombre(campo, contenedor) {
        const regex = /^[A-Za-z]+$/;
        return aplicarValidacion(campo, regex, "El nombre no debe contener números ni espacios.", contenedor);
    }

    function validarApellido(campo, contenedor) {
        const regex = /^[A-Za-z]+$/;
        return aplicarValidacion(campo, regex, "El apellido no debe contener números ni espacios.", contenedor);
    }

    function validarCorreo(campo, contenedor) {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return aplicarValidacion(campo, regex, "Por favor, ingresa un correo electrónico válido.", contenedor);
    }

    function validarPassword(campo, contenedor) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
        return aplicarValidacion(campo, regex, "La contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula y un número.", contenedor);
    }

    function aplicarValidacion(campo, regex, mensaje, contenedor) {
        if (!regex.test(campo.value)) {
            marcarInvalido(contenedor, mensaje);
            return false;
        }
        marcarValido(contenedor);
        return true;
    }

    function marcarInvalido(contenedor, mensaje) {
        // Resaltar campo en rojo y mostrar el mensaje de error
        contenedor.classList.add("invalid-field");
        mensajeError.classList.remove("d-none");
        mensajeError.innerHTML = mensaje;
        
        // Enfocar el campo para que el usuario vea el error y lo corrija
        const input = contenedor.querySelector('input, select, textarea');
        if (input) {
            input.focus();
        }
    }

    function marcarValido(contenedor) {
        // Eliminar la clase invalid-field cuando el campo es corregido
        contenedor.classList.remove("invalid-field");
    }

    function actualizarEstadoBoton() {
        let hayErrores = campos.some((campoId) => {
            const campo = document.getElementById(campoId);
            return !campo.checkValidity();
        });
        botonEnviar.disabled = hayErrores;
    }
});
