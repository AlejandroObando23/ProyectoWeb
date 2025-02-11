document.addEventListener("DOMContentLoaded", function () {
    const togglePasswordBtn = document.getElementById("togglePassword");
    const passwordField = document.getElementById("password");
    const toggleIcon = document.getElementById("toggleIcon");
    const form = document.getElementById("formLogin");
    const userField = document.getElementById("user");
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

    // Validación antes del envío del formulario
    form.addEventListener("submit", function (event) {
        mensajeError.classList.add("d-none");
        mensajeError.innerHTML = "";

        let errores = [];

        // Validar usuario: solo letras y números
        if (!/^[A-Za-z0-9]+$/.test(userField.value)) {
            errores.push("El usuario solo puede contener letras y números.");
        }

        // Validar contraseña: mínimo 6 caracteres, 1 mayúscula, 1 minúscula, 1 número
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(passwordField.value)) {
            errores.push("La contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula y un número.");
        }

        // Si hay errores, mostrar mensaje y cancelar envío
        if (errores.length > 0) {
            mensajeError.classList.remove("d-none");
            mensajeError.innerHTML = errores.join("<br>");
            event.preventDefault();
        }
    });
});
