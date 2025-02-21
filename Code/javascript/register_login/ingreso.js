const formulario = document.getElementById('formUsuario');
const inputs = document.querySelectorAll("#formUsuario input");
const togglePasswordBtn = document.getElementById("togglePassword");
const passwordField = document.getElementById("password");
const toggleIcon = document.getElementById("toggleIcon");

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

const expresiones = {
    username: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{8,}$/, // Al menos 8 caracteres.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // formato nombre@server.com
    cedula: /^\d{10}$/ // 10 numeros.
};
const campos = {
    nombre: false,
    apellido: false,
    cedula: false,
    password: false,
    email: false
};

const validarFormulario = (e) => {
    const input = e.target;
    const nombreCampo = input.name;

    switch (nombreCampo) {
        case "nombre":
            validarCampo(expresiones.nombre, input, nombreCampo);
            break;
        case "apellido":
            validarCampo(expresiones.apellido, input, nombreCampo);
            break;
        case "cedula":
            validarCampo(expresiones.cedula, input, nombreCampo);
            break;
        case "password":
            validarCampo(expresiones.password, input, nombreCampo);
            break;
        case "password2":
            validarPassword2();
        break;
        case "email":
            validarCampo(expresiones.email, input, nombreCampo);
            break;
    }
};

const validarCampo = (expresion, input, campo) => {
    const contenedor = input.closest('.campo-contenedor');
    const mensajeError = contenedor.querySelector('.formulario__input-error');
    if (expresion.test(input.value)) {
        contenedor.classList.remove('formulario__grupo-incorrecto');
        contenedor.classList.add('formulario__grupo-correcto');
        mensajeError.classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    } else {
        contenedor.classList.add('formulario__grupo-incorrecto');
        contenedor.classList.remove('formulario__grupo-correcto');
        mensajeError.classList.add('formulario__input-error-activo');
        campos[campo] = false;
    }
};
const validarPassword2 = () => {
	const inputPassword1 = document.getElementById('password');
	const inputPassword2 = document.getElementById('password2');
	if(inputPassword1.value !== inputPassword2.value){ //si no es el valor de password1
		document.getElementById(`grupo__password2`).classList.add(`formulario__grupo-incorrecto`);
		document.getElementById(`grupo__password2`).classList.remove(`formulario__grupo-correcto`);
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add(`formulario__input-error-activo`);
		campos['password'] = false;
	}else{
		document.getElementById(`grupo__password2`).classList.remove(`formulario__grupo-incorrecto`);
		document.getElementById(`grupo__password2`).classList.add(`formulario__grupo-correcto`);
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove(`formulario__input-error-activo`);
		campos['password'] = true;
	}
}
inputs.forEach(input => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const mensajeError = document.getElementById("mensajeError");
    mensajeError.classList.add("d-none");
    mensajeError.innerHTML = "";

    let esValido = true;
    Object.keys(campos).forEach(campo => {
        if (!campos[campo]) esValido = false;
    });

    if (esValido) {
        // Aquí envías el formulario y lo registras en la base de datos
        formulario.submit();  // Esto permite que el formulario se envíe al servidor
        formulario.reset();
        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
        setTimeout(() => {
            document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
        }, 5000);
        document.querySelectorAll('.formulario__grupo-correcto').forEach(icono => {
            icono.classList.remove('formulario__grupo-correcto');
        });
    } else {
        mensajeError.classList.remove('d-none');
        mensajeError.innerHTML = "Por favor, corrige los campos marcados antes de continuar.";
    }
});
    

