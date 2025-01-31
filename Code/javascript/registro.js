document.getElementById('formRegistro').addEventListener('submit', function(event) {
    let nombre = document.getElementById('nombre').value.trim();
    let apellido = document.getElementById('apellido').value.trim();
    let usuario = document.getElementById('usuario').value.trim();
    let email = document.getElementById('email').value.trim();
    let password = document.getElementById('password').value;
    let confirmarPassword = document.getElementById('confirmarPassword').value;

    // Limpiar mensaje de error
    let mensajeError = "";

    // Validación de Nombre (solo letras, sin números, sin espacios en blanco completos, sin caracteres especiales)
    let nombreApellidoRegex = /^[A-Za-záéíóúÁÉÍÓÚüÜ]+$/;  // Permitir solo letras, incluyendo tildes y caracteres especiales
    if (nombre === '' || !nombreApellidoRegex.test(nombre)) {
        mensajeError = 'El nombre solo debe contener letras, no puede contener números ni caracteres especiales, y no puede estar vacío.';
        alert(mensajeError);
        event.preventDefault();
        return;
    }

    // Validación de Apellido (solo letras, sin números, sin espacios en blanco completos, sin caracteres especiales)
    if (apellido === '' || !nombreApellidoRegex.test(apellido)) {
        mensajeError = 'El apellido solo debe contener letras, no puede contener números ni caracteres especiales, y no puede estar vacío.';
        alert(mensajeError);
        event.preventDefault();
        return;
    }

    // Validación de Usuario (solo alfanumérico, sin espacios ni caracteres especiales)
    let usuarioRegex = /^[A-Za-z0-9]+$/;
    if (!usuarioRegex.test(usuario) || usuario.length === 0) {
        mensajeError = 'El usuario solo debe contener letras y números, sin espacios ni caracteres especiales.';
        alert(mensajeError);
        event.preventDefault();
        return;
    }

    // Validación de correo electrónico
    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        mensajeError = 'Por favor, ingrese un correo electrónico válido.';
        alert(mensajeError);
        event.preventDefault();
        return;
    }

    // Validación de contraseñas
    if (password !== confirmarPassword) {
        mensajeError = 'Las contraseñas no coinciden.';
        alert(mensajeError);
        event.preventDefault();
        return;
    }

    // Validación de longitud de la contraseña
    if (password.length < 6 || password.length > 15) {
        mensajeError = 'La contraseña debe tener entre 6 y 15 caracteres.';
        alert(mensajeError);
        event.preventDefault();
        return;
    }
});
