<?php
require_once "conexion.php"; // Incluir la conexión

session_start(); // Iniciar sesión

// Verificar si el usuario ya está logueado
if (isset($_SESSION['usuario'])) {
    // Redirigir al inicio según el rol del usuario
    header("Location: PaginaPrincipal.php");
    exit();
}

$mensaje = ''; // Variable para el mensaje de error

// Verificar si el formulario ha sido enviado
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener los datos enviados desde el formulario
    $usuario = $_POST['Cedula'];
    $password = $_POST['Password'];

    // Verificar que los datos no estén vacíos
    if (empty($usuario) || empty($password)) {
        $mensaje = 'Debe ingresar usuario y contraseña.';
    } else {
        // Consultar si el usuario existe en la base de datos
        $sql = "SELECT * FROM usuarios WHERE Cedula = ?";
        $stmt = $conn->prepare($sql);

        if (!$stmt) {
            die("Error en la preparación de la consulta: " . $conn->error);
        }

        $stmt->bind_param("s", $usuario);
        $stmt->execute();
        $result = $stmt->get_result();

        // Comprobar si el usuario fue encontrado
        if ($result->num_rows > 0) {
            $registro = $result->fetch_assoc(); // Obtener los datos del usuario

            // Depurar los datos de la base de datos

            // Verificar la contraseña de manera segura
            if (password_verify($password, $registro['Password'])) { 
                $_SESSION['id'] = $registro['Id'];
                $_SESSION['usuario'] = $registro['Cedula'];
                $_SESSION['nombre'] = $registro['Nombre'];
                $_SESSION['apellido'] = $registro['Apellido'];
                $_SESSION['rol'] = $registro['Rol'];

                var_dump($registro); // Verifica los datos recuperados

                // Verificar si el usuario tiene un rol asignado
                if (empty($registro['Rol'])) {
                    $mensaje = 'No tiene un rol asignado. Pida al administrador que le asigne uno.';
                } else {
                    // Redirigir según el rol
                    header("Location: PaginaPrincipal.php");
                    exit();
                }
            } else {
                // Si la contraseña no es correcta
                $mensaje = 'Usuario o contraseña incorrectos.';
            }
        } else {
            // Si el usuario no se encuentra
            $mensaje = 'Usuario o contraseña incorrectos.';
        }

        // Cerrar la conexión
        $stmt->close();
        $conn->close();
    }
}
?>
<!doctype html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <title>Login</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;700&display=swap" rel="stylesheet">
    <link href="../css/normalize.css" rel="stylesheet" type="text/css">
    <link href="../css/estiloLogin.css" rel="stylesheet" type="text/css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">
</head>
<body class="d-flex justify-content-center align-items-center vh-100">
    <div class="container w-75 bg-primary rounded shadow align-items-center">
        <div class="row align-items-stretch">
            <div class="col bg d-none d-lg-block col-md-5 col-lg-5 col-xl-6 rounded-start"></div>
            <div class="col bg-white p-5 rounded-end">
                <div class="text-center">
                    <img src="../imagenes/logo.png" alt="Logo" width="100">
                </div>
                <h1 class="fw-bold text-center">Bienvenido</h1>
                
                <!-- Mostrar mensaje de error si existe -->
                <?php if (!empty($mensaje)): ?>
                    <div class="alert alert-danger text-center"><?php echo $mensaje; ?></div>
                <?php endif; ?>

               <!-- LOGIN -->
               <form action="" method="POST" id="formLogin">
                    <div class="mb-4 mensaje">
                        <label for="usuario" class="form-label">Usuario</label>
                        <input type="text" id="user" maxlength="10" class="form-control shadow" placeholder="Ingresa tu nombre de usuario" name="Cedula" required>
                        <span class="mensajeTexto">Ej: miusuario91</span>
                    </div>
                    <div class="mb-4 mensaje">
                        <label for="clave" class="form-label">Contraseña</label>
                        <div class="input-group">
                            <input type="password" class="form-control shadow" id="password" placeholder="Ingresa tu contraseña" name="Password" required>
                            <button type="button" id="togglePassword" class="btn btn-outline-secondary">
                                <i id="toggleIcon" class="bi bi-eye-slash"></i> <!-- Icono de ojo tachado -->
                            </button>
                        </div>
                        <span class="mensajeTexto">Ingresa tu contraseña dada por el administrador</span>
                    </div>
                    
                    <div class="d-grid">
                        <button type="submit" class="btn btn-primary iniciar shadow">Iniciar Sesión</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="../javascript/register_login/scriptlogin.js"></script>
</body>
</html>
