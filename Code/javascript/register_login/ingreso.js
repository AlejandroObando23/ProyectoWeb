document.addEventListener("DOMContentLoaded", function () {
    const togglePasswordBtn = document.getElementById("togglePassword");
    const passwordField = document.getElementById("password");
    const toggleIcon = document.getElementById("toggleIcon");
    const form = document.getElementById("formUsuario"); 
    const cedulaField = document.getElementById("cedula");
    const nombreField = document.getElementById("nombre");
    const apellidoField = document.getElementById("apellido");
    const correoField = document.getElementById("correo");
    const mensajeError = document.getElementById("mensajeError");

    // Alternar la visibilidad de la contraseña
    togglePasswordBtn.addEventListener("click", function () {
        const tipo = passwordField.type === "password" ? "text" : "password";
        passwordField.type = tipo;

        // Cambiar el icono del botón
        if (passwordField.type === "password") {
            toggleIcon.classList.replace("bi-eye", "bi-eye-slash");
        } else {
            toggleIcon.classList.replace("bi-eye-slash", "bi-eye");
        }
    });

    // Validación en tiempo real para resaltar los campos no válidos
    form.addEventListener("input", function () {
        // Limpiar los campos de error (en caso de que se corrijan)
        limpiarErrores();
    });

    // Validación antes del envío del formulario
    form.addEventListener("submit", function (event) {
        mensajeError.classList.add("d-none");
        mensajeError.innerHTML = "";

        let errores = [];

        // Validar cédula: solo números
        if (!/^\d+$/.test(cedulaField.value)) {
            errores.push("La cédula solo puede contener números.");
            cedulaField.classList.add("invalid-field");
        } else {
            cedulaField.classList.remove("invalid-field");
        }

        // Validar nombre: no debe tener números ni espacios
        if (!/^[A-Za-z]+$/.test(nombreField.value)) {
            errores.push("El nombre no debe contener números ni espacios.");
            nombreField.classList.add("invalid-field");
        } else {
            nombreField.classList.remove("invalid-field");
        }

        // Validar apellido: no debe tener números ni espacios
        if (!/^[A-Za-z]+$/.test(apellidoField.value)) {
            errores.push("El apellido no debe contener números ni espacios.");
            apellidoField.classList.add("invalid-field");
        } else {
            apellidoField.classList.remove("invalid-field");
        }

        // Validar correo: formato correcto
        const correoRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!correoRegex.test(correoField.value)) {
            errores.push("Por favor, ingresa un correo electrónico válido.");
            correoField.classList.add("invalid-field");
        } else {
            correoField.classList.remove("invalid-field");
        }

        // Validar contraseña: mínimo 6 caracteres, 1 mayúscula, 1 minúscula, 1 número
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(passwordField.value)) {
            errores.push("La contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula y un número.");
            passwordField.classList.add("invalid-field");
        } else {
            passwordField.classList.remove("invalid-field");
        }

        // Si hay errores, mostrar mensaje y cancelar envío
        if (errores.length > 0) {
            mensajeError.classList.remove("d-none");
            mensajeError.innerHTML = errores.join("<br>");
            event.preventDefault();
        }
    });

    // Función para limpiar los errores de los campos
    function limpiarErrores() {
        // Limpiar todos los campos con clase invalid-field
        const fields = [cedulaField, nombreField, apellidoField, correoField, passwordField];
        fields.forEach(field => {
            field.classList.remove("invalid-field");
        });
    }
});
