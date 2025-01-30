document.getElementById('formRegistro').addEventListener('submit', function(event) {
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var usuario = document.getElementById('usuario').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmarPassword = document.getElementById('confirmarPassword').value;

    // Validación de contraseñas
    if (password !== confirmarPassword) {
        alert('Las contraseñas no coinciden.');
        event.preventDefault();
        return;
    }

    // Validar que el correo tenga un formato correcto
    var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        alert('Por favor ingrese un correo electrónico válido.');
        event.preventDefault();
        return;
    }

    // Validación de longitud de la contraseña
    if (password.length < 6 || password.length > 15) {
        alert('La contraseña debe tener entre 6 y 15 caracteres.');
        event.preventDefault();
        return;
    }
});
