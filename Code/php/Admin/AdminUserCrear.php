<?php
include '../conexion.php';
// Inicia la sesión
session_start();

// Verifica si el usuario está autenticado y tiene el rol de admin
if (!isset($_SESSION['usuario']) || $_SESSION['rol'] != 'admin') {
    // Si no es admin, redirige a otra página (por ejemplo, inicio de sesión o acceso denegado)
    header('Location: ../../html/Administrador/acceso_denegado.html');
    exit();
}

// Obtener los datos del usuario para mostrar el nombre, apellido y rol
$usuario = isset($_SESSION['cedula']) ? $_SESSION['cedula'] : 'Usuario no encontrado';
$nombre = isset($_SESSION['nombre']) ? $_SESSION['nombre'] : 'Nombre no disponible';
$apellido = isset($_SESSION['apellido']) ? $_SESSION['apellido'] : 'Apellido no disponible';
$rol = isset($_SESSION['rol']) ? $_SESSION['rol'] : 'Rol no disponible';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Captura los datos del formulario
    $cedula = $_POST["cedula"];
    $nombre = $_POST["nombre"];
    $apellido = $_POST["apellido"];
    $correo = $_POST["email"];
    $password = $_POST["password"];
    $rol = $_POST["rol"];

    // Validar que la contraseña y su confirmación coincidan
    if ($_POST["password"] !== $_POST["password2"]) {
        echo "<script>alert('Las contraseñas no coinciden');</script>";
        exit();
    }

    // Verifica si la cédula ya existe en la base de datos
    $stmt_check_cedula = $conn->prepare("SELECT * FROM usuarios WHERE Cedula = ?");
    $stmt_check_cedula->bind_param("s", $cedula);
    $stmt_check_cedula->execute();
    $result_check_cedula = $stmt_check_cedula->get_result();

    // Verifica si el correo ya existe en la base de datos
    $stmt_check_correo = $conn->prepare("SELECT * FROM usuarios WHERE Correo = ?");
    $stmt_check_correo->bind_param("s", $correo);
    $stmt_check_correo->execute();
    $result_check_correo = $stmt_check_correo->get_result();

    // Mensajes según el resultado
    if ($result_check_cedula->num_rows > 0 && $result_check_correo->num_rows > 0) {
        echo "<script>alert('Tanto la cédula como el correo ya están registrados.');</script>";
    } elseif ($result_check_cedula->num_rows > 0) {
        echo "<script>alert('La cédula ya está registrada.');</script>";
    } elseif ($result_check_correo->num_rows > 0) {
        echo "<script>alert('El correo ya está registrado.');</script>";
    } else {
        // Encriptar la contraseña
        $passwordHash = password_hash($password, PASSWORD_BCRYPT);

        // Insertar en la base de datos
        $stmt = $conn->prepare("INSERT INTO usuarios (Cedula, Nombre, Apellido, Correo, Password, Rol) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssss", $cedula, $nombre, $apellido, $correo, $passwordHash, $rol);

        if ($stmt->execute()) {
            echo "<script>alert('Usuario registrado exitosamente.');</script>";
        } else {
            echo "<script>alert('Error al registrar el usuario.');</script>";
        }

        $stmt->close();
    }

    // Redirigir después de mostrar el mensaje
    echo "<script>setTimeout(function() { window.location.href = 'AdminUserCrear.php'; }, 500);</script>";

    // Cierra las declaraciones y la conexión
    $conn->close();
    exit();
}
?>

<!doctype html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <title>Administrador - Crear Usuario</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="icon" type="image/x-icon" href="../../imagenes/logo.png">
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap" rel="stylesheet">
    <link href="../../css/menu.css" rel="stylesheet">
    <link href="../../css/adminusercrear.css" rel="stylesheet">
    <link href="../../css/normalize.css" rel="stylesheet" type="text/css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <header class="navbar bg-light navbar-expand-lg">
        <div class="container">
            <div class="d-flex justify-content-between align-items-center w-100">
                <div class="d-flex align-items-center">
                    <h1 class="fs-3 my-2">MIECONOMIA</h1>
                    <img class="mx-3 d-none d-md-flex" src="../../imagenes/logo.png" alt="Logo" width="50">
                </div>
                <div class="ms-auto d-flex align-items-center text-center">
                <span id="nombreUsuario" class="me-2 d-none d-md-flex"><?php echo $_SESSION['usuario']; ?></span>
                <!-- Mostrar el rol directamente desde la sesión -->
                <span id="rolUsuario" class="me-2 d-none d-md-flex">(<?php echo ucfirst($_SESSION['rol']); ?>)</span>
                <i class="fs-4" id="user-icon">
                    <img src="../../imagenes/iconoUser.png" alt="user" width="50">
                </i>
            </div>
            </div>
        </div>
    </header>

    <div class="navbar navbar-expand-lg navbar-light sticky-top shadow menu">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="menuNav">
                <ul class="navbar-nav mx-auto">
                    <li class="nav-item fw-bold"><a class="nav-link" href="../../php/Admin/AdminInicio.php"><i class="bi bi-house"></i> Inicio</a></li>
                    <li class="nav-item fw-bold"><a class="nav-link " href="../Servicios/ingresos.html"><i class="bi bi-cash-coin"></i> Ingresos</a></li>
                    <li class="nav-item fw-bold"><a class="nav-link" href="../Servicios/gastos.html"><i class="bi bi-credit-card"></i> Gastos</a></li>
                    <li class="nav-item fw-bold"><a class="nav-link" href="#"><i class="bi bi-info-square"></i> Reportes</a></li>
                    <li class="nav-item dropdown fw-bold">
                        <a class="nav-link dropdown-toggle" href="#" id="usuariosDropdown" role="button" data-bs-toggle="dropdown">
                            <i class="bi bi-people-fill active"></i> Usuarios
                        </a>
                        <ul class="dropdown-menu menu">
                            <li><a class="dropdown-item" href="AdminUserLista.php"><i class="bi bi-person-lines-fill"></i> Lista de usuarios</a></li>
                            <li><a class="dropdown-item " href="AdminUserCrear.php"><i class="bi bi-person-fill-add active"></i> Agregar usuario</a></li>
                            <li><a class="dropdown-item" href="AdminUserRoles.html"><i class="bi bi-person-check-fill"></i> Administrar permisos</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>

    <h1 class="text-center mt-4">Crear Nuevo Usuario</h1>

    <div class="container mt-4">

        <form id="formUsuario" method="POST" action="../../php/registrar_usuario.php"
            class="p-4 bg-light rounded shadow">
            <div class="row d-flex">
                <div class="campo-contenedor col-md-3 mb-3" id="grupo__cedula">
                    <label for="cedula" class="form-label">Cédula:</label>
                    <input type="text" name="cedula" id="cedula" class="form-control shadow" required placeholder="1721623369"
                        maxlength="10">
                    <p class="formulario__input-error text-danger">La cédula debe contener solo números.</p>
                </div>

                <div class="campo-contenedor col-md-3 mb-3" id="grupo__nombre">
                    <label for="nombre" class="form-label">Nombre:</label>
                    <input type="text" name="nombre" id="nombre" class="form-control shadow" required placeholder="Alejandro">
                    <p class="formulario__input-error text-danger">El nombre debe contener solo letras y espacios.</p>
                </div>

                <div class="campo-contenedor col-md-3 mb-3" id="grupo__apellido">
                    <label for="apellido" class="form-label">Apellido:</label>
                    <input type="text" name="apellido" id="apellido" class="form-control shadow" required placeholder="Gómez">
                    <p class="formulario__input-error text-danger">El apellido debe contener solo letras y espacios.</p>
                </div>

                <div class="campo-contenedor col-md-3 mb-3" id="grupo__correo">
                    <label for="email" class="form-label">Correo:</label>
                    <input type="email" name="email" id="email" class="form-control shadow" required
                        placeholder="correo@dominio.com">
                    <p class="formulario__input-error text-danger">El correo debe ser válido (ejemplo@sitio.com).</p>
                </div>

                <div class="campo-contenedor col-md-3 mb-4" id="grupo__password">
                    <label for="password" class="form-label">Contraseña:</label>
                    <div class="input-group">
                        <input type="password" name="password" id="password" class="form-control shadow" required
                            placeholder="Contraseña123">
                        <button type="button" id="togglePassword" class="btn btn-outline-secondary">
                            <i id="toggleIcon" class="bi bi-eye-slash"></i> <!-- Icono de ojo tachado -->
                        </button>
                        <p class="formulario__input-error text-danger">La contraseña debe tener al menos 8 caracteres.
                        </p>
                    </div>
                </div>

                <div class="campo-contenedor col-md-3 mb-4" id="grupo__password2">
                    <label for="password2" class="form-label">Repita Contraseña:</label>
                    <div class="formulario__grupo-input input-group">
                        <input type="password" name="password2" id="password2" class="form-control shadow" placeholder="Repite la contraseña"
                            required>
                    </div>
                    <p class="formulario__input-error text-danger">La contraseña no coincide</p>
                </div>

                <!-- El campo rol no tiene validación -->
                <div class="campo-contenedor col-md-3 mb-3">
                    <label for="rol" class="form-label">Rol:</label>
                    <select name="rol" id="rol" class="form-select shadow" required>
                        <option value="" disabled selected>Selecciona un rol</option>
                        <option value="admin">Administrador</option>
                        <option value="ingreso">Ingreso</option>
                        <option value="egreso">Egreso</option>
                    </select>
                </div>

                <button type="submit" id="btnEnviar" class="btn btn-primary w-100">Registrar Usuario</button>
                <div id="mensajeError" class="text-danger d-none mt-2"></div>
                <p class="formulario__mensaje-exito" id="formulario__mensaje-exito">Formulario enviado exitosamente!</p>
            </div>
        </form>

    </div>

    <script src="../../javascript/register_login/ingreso.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
