<?php
require_once "conexion.php"; 

session_start(); 

if (isset($_SESSION['usuario'])) {
    header("Location: PaginaPrincipal.php");
    exit();
}

$mensaje = ''; 

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $usuario = $_POST['Cedula'];
    $password = $_POST['Password'];

    if (empty($usuario) || empty($password)) {
        $mensaje = 'Debe ingresar usuario y contraseña.';
    } else {
        $sql = "
            SELECT u.*, r.Nombre AS rol_nombre, r.Descripcion AS rol_descripcion, 
                   r.PaginaIngresos, r.AgregarIngreso, r.AnularActivarIngreso, r.EditarIngreso,
                   r.PaginaReportes, r.PaginaGastos, r.AgregarGasto, r.AnularActivarGasto, r.EditarGasto,
                   r.PaginaCategorias, r.AgregarCategoria, r.EditarCategoria,
                   r.PaginaUsuario, r.CrearUsuario, r.ActivarDesactivarUsuario, r.CrearRol
            FROM usuarios u
            LEFT JOIN perfiles r ON u.Rol = r.Id
            WHERE u.Cedula = ?";
        
        $stmt = $conn->prepare($sql);

        if (!$stmt) {
            die("Error en la preparación de la consulta: " . $conn->error);
        }

        $stmt->bind_param("s", $usuario);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $registro = $result->fetch_assoc(); 

            if (password_verify($password, $registro['Password'])) { 
                $_SESSION['id'] = $registro['Id'];
                $_SESSION['usuario'] = $registro['Cedula'];
                $_SESSION['nombre'] = $registro['Nombre'];
                $_SESSION['apellido'] = $registro['Apellido'];
                $_SESSION['rol'] = $registro['rol_nombre'];

                $permisos = [
                    'rol_nombre' => $registro['rol_nombre'],
                    'rol_descripcion' => $registro['rol_descripcion'],
                    'PaginaIngresos' => $registro['PaginaIngresos'],
                    'AgregarIngreso' => $registro['AgregarIngreso'],
                    'AnularActivarIngreso' => $registro['AnularActivarIngreso'],
                    'EditarIngreso' => $registro['EditarIngreso'],
                    'PaginaReportes' => $registro['PaginaReportes'],
                    'PaginaGastos' => $registro['PaginaGastos'],
                    'AgregarGasto' => $registro['AgregarGasto'],
                    'AnularActivarGasto' => $registro['AnularActivarGasto'],
                    'EditarGasto' => $registro['EditarGasto'],
                    'PaginaCategorias' => $registro['PaginaCategorias'],
                    'AgregarCategoria' => $registro['AgregarCategoria'],
                    'EditarCategoria' => $registro['EditarCategoria'],
                    'PaginaUsuario' => $registro['PaginaUsuario'],
                    'CrearUsuario' => $registro['CrearUsuario'],
                    'ActivarDesactivarUsuario' => $registro['ActivarDesactivarUsuario'],
                    'CrearRol' => $registro['CrearRol'],
                    'PaginaAuditoria' => $registro['PaginaAuditoria']
                ];

                $_SESSION['permisos'] = $permisos;

                if (empty($registro['Rol'])) {
                    $mensaje = 'No tiene un rol asignado. Pida al administrador que le asigne uno.';
                } else {
                    header("Location: PaginaPrincipal.php");
                    exit();
                }
            } else {
                $mensaje = 'Usuario o contraseña incorrectos.';
            }
        } else {
            $mensaje = 'Usuario o contraseña incorrectos.';
        }

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
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body class="d-flex justify-content-center align-items-center vh-100">
    <div class="container w-75 bg-primary rounded shadow align-items-center">
        <div class="row align-items-stretch">
            <div class="col bg d-none d-lg-block col-md-5 col-lg-5 col-xl-6 rounded-start"></div>
            <div class="col bg-white p-sm-2 pb-4 pt-4 p-md-5 rounded-end">
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
