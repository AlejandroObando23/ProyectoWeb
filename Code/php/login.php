<?php
require_once "conexion.php";

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

$mensaje = ""; // Variable para almacenar el mensaje de error

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $usuario = trim($_POST['Cedula']);
    $password = trim($_POST['Password']);

    if (!empty($usuario) && !empty($password)) {
        $sql = "SELECT * FROM usuarios WHERE cedula = ?";
        $stmt = $conn->prepare($sql);

        if ($stmt) {
            $stmt->bind_param("s", $usuario);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                $registro = $result->fetch_assoc();

                if (isset($registro['Contraseña']) && password_verify($password, $registro['Contraseña'])) {

                    $_SESSION['usuario'] = htmlspecialchars($registro['cedula'], ENT_QUOTES, 'UTF-8');
                    $_SESSION['nombre'] = htmlspecialchars($registro['Nombre'], ENT_QUOTES, 'UTF-8');
                    $_SESSION['rol'] = htmlspecialchars($registro['Rol'], ENT_QUOTES, 'UTF-8');

                    if (empty($registro['Rol'])) {
                        $mensaje = "No tiene un rol asignado. Contacte al administrador.";
                    } else {
                        switch ($registro['Rol']) {
                            case 'Administrador':
                                header("Location: ../html/Administrador/AdminInicio.html");
                                exit();
                            case 'Egreso':
                                header("Location: ../html/Servicios/gastos.html");
                                exit();
                            case 'Ingreso':
                                header("Location: ../html/Servicios/ingresos.html");
                                exit();
                        }
                    }
                } else {
                    $mensaje = "Usuario o contraseña incorrecta.";
                }
            } else {
                $mensaje = "Usuario o contraseña incorrecta.";
            }
            $stmt->close();
        }
    } else {
        $mensaje = "Por favor, complete todos los campos.";
    }
    $conn->close();
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
               <form action="../php/Conexion_register_login/login.php" method="POST" id="formLogin">
                    <div class="mb-4 mensaje">
                        <label for="usuario" class="form-label">Usuario</label>
                        <input type="text" id="user"   maxlength="10"  class="form-control shadow" placeholder="Ingresa tu nombre de usuario" name="Cedula" required>
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
                    <p id="mensajeError" class="text-danger mt-3 d-none"></p>
                </form>
            </div>
        </div>
    </div>
    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="../javascript/scriptlogin.js"></script>
</body>
</html>
