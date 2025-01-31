document.getElementById('formRegistro').addEventListener('submit', function(event) {
    let nombre = document.getElementById('nombre').value.trim();
    let apellido = document.getElementById('apellido').value.trim();
    let usuario = document.getElementById('usuario').value.trim();
    let email = document.getElementById('email').value.trim();
    let password = document.getElementById('password').value;
    let confirmarPassword = document.getElementById('confirmarPassword').value;

    // Limpiar mensaje de error
    let errores = [];

    // Expresión regular para nombre y apellido (solo letras, incluyendo tildes y caracteres especiales)
    let nombreApellidoRegex = /^[A-Za-záéíóúÁÉÍÓÚüÜ]+$/;

    // Validación de Nombre
    if (nombre === '' || !nombreApellidoRegex.test(nombre)) {
        errores.push('El nombre solo debe contener letras, no puede contener números ni caracteres especiales, y no puede estar vacío.');
        document.getElementById('nombre').classList.add("error");
    } else {
        document.getElementById('nombre').classList.remove("error");
    }

    // Validación de Apellido
    if (apellido === '' || !nombreApellidoRegex.test(apellido)) {
        errores.push('El apellido solo debe contener letras, no puede contener números ni caracteres especiales, y no puede estar vacío.');
        document.getElementById('apellido').classList.add("error");
    } else {
        document.getElementById('apellido').classList.remove("error");
    }

    // Validación de Usuario (solo alfanumérico)
    let usuarioRegex = /^[A-Za-z0-9]+$/;
    if (!usuarioRegex.test(usuario) || usuario.length === 0) {
        errores.push('El usuario solo debe contener letras y números, sin espacios ni caracteres especiales.');
        document.getElementById('usuario').classList.add("error");
    } else {
        document.getElementById('usuario').classList.remove("error");
    }

    // Validación de correo electrónico
    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        errores.push('Por favor, ingrese un correo electrónico válido.');
        document.getElementById('email').classList.add("error");
    } else {
        document.getElementById('email').classList.remove("error");
    }

    // Validación de contraseñas
    if (password !== confirmarPassword) {
        errores.push('Las contraseñas no coinciden.');
        document.getElementById('password').classList.add("error");
        document.getElementById('confirmarPassword').classList.add("error");
    } else {
        document.getElementById('password').classList.remove("error");
        document.getElementById('confirmarPassword').classList.remove("error");
    }

    // Validación de longitud de la contraseña
    if (password.length < 6 || password.length > 15) {
        errores.push('La contraseña debe tener entre 6 y 15 caracteres.');
        document.getElementById('password').classList.add("error");
    } else {
        document.getElementById('password').classList.remove("error");
    }

    // Validación de al menos una mayúscula en la contraseña
    let mayusculaRegex = /[A-Z]/;
    if (!mayusculaRegex.test(password)) {
        errores.push('La contraseña debe contener al menos una letra mayúscula.');
        document.getElementById('password').classList.add("error");
    } else {
        document.getElementById('password').classList.remove("error");
    }

    // Si hay errores, mostramos todos y prevenimos el envío
    if (errores.length > 0) {
        let mensajeError = errores.join('\n');
        alert(mensajeError);
        event.preventDefault();
    }
});
