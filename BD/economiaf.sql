-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 10-03-2025 a las 02:18:34
-- Versión del servidor: 8.0.17
-- Versión de PHP: 7.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `economiaf`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(64) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `CodigoQR` varchar(250) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `tipo` varchar(64) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`Id`, `Nombre`, `CodigoQR`, `tipo`) VALUES
(1, 'Salario', '../codigosQR/QRsalario.jpeg', 'ingreso'),
(2, 'Serivicio_basico', '../codigosQR/QRServicioBasico.jpeg', 'egreso'),
(3, 'Extra', '../codigosQR/QRIngreso.jpeg', 'ingreso'),
(4, 'Alimento', '../codigosQR/QRAlimento.jpeg', 'egreso');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `egresos`
--

CREATE TABLE `egresos` (
  `Id` int(11) NOT NULL,
  `Fecha` date NOT NULL,
  `IdTipo` int(11) NOT NULL,
  `Monto` float NOT NULL,
  `Metodo` varchar(64) NOT NULL,
  `Estado` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'Completado',
  `idUsuario` int(11) NOT NULL,
  `Descripcion` varchar(128) NOT NULL,
  `FechaRegistro` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `egresos`
--

INSERT INTO `egresos` (`Id`, `Fecha`, `IdTipo`, `Monto`, `Metodo`, `Estado`, `idUsuario`, `Descripcion`, `FechaRegistro`) VALUES
(1, '2025-02-06', 2, 23, 'Efectivo', 'Completado', 8, 'sdasd', '0000-00-00 00:00:00'),
(2, '2024-12-25', 4, 20, 'Efectivo', 'Completado', 8, 'Gasto Vivienda', '0000-00-00 00:00:00'),
(3, '2025-02-06', 4, 10, 'Efectivo', 'Completado', 8, 'Gasto Casa', '0000-00-00 00:00:00'),
(4, '2025-03-06', 2, 1.02, 'Efectivo', 'Completado', 8, 'Gasto Casa', '0000-00-00 00:00:00'),
(5, '2025-03-11', 2, 23, 'Transferencia', 'Completado', 8, 'Gasto Casa', '2025-03-01 21:46:11'),
(6, '2025-03-12', 2, 1.03, 'Transferencia', 'Completado', 8, 'Gasto Trabajo', '2025-03-03 08:27:09'),
(7, '2025-03-12', 4, 50, 'Efectivo', 'Completado', 38, 'comida', '2025-03-08 21:59:53');

--
-- Disparadores `egresos`
--
DELIMITER $$
CREATE TRIGGER `insertar_fecha_registro` BEFORE INSERT ON `egresos` FOR EACH ROW BEGIN
    -- Asigna la hora actual a la columna FechaIngreso
    SET NEW.FechaRegistro = NOW();
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ingresos`
--

CREATE TABLE `ingresos` (
  `Id` int(11) NOT NULL,
  `Fecha` date NOT NULL,
  `FechaRegistro` datetime NOT NULL,
  `IdTipo` int(11) NOT NULL,
  `Monto` float(8,2) NOT NULL,
  `Metodo` varchar(64) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `Estado` varchar(64) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL DEFAULT 'Completado',
  `idUsuario` int(11) NOT NULL,
  `Descripcion` varchar(250) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `ingresos`
--

INSERT INTO `ingresos` (`Id`, `Fecha`, `FechaRegistro`, `IdTipo`, `Monto`, `Metodo`, `Estado`, `idUsuario`, `Descripcion`) VALUES
(1, '2025-02-20', '0000-00-00 00:00:00', 1, 20.00, 'Efectivo', 'Anulado', 8, 'No hay en este momento nada'),
(3, '2025-02-08', '0000-00-00 00:00:00', 1, 22.00, 'Transferencia', 'Completado', 8, 'sadsadasdsad'),
(4, '2025-02-16', '0000-00-00 00:00:00', 1, 40.50, 'Cheque', 'Completado', 8, 'Pago por inmuebles'),
(18, '2025-03-12', '2025-03-01 17:28:37', 1, 2222.00, 'Transferencia', 'Completado', 38, 'sadsadasdsd'),
(19, '2025-03-16', '2025-03-01 18:18:24', 1, 155.00, 'Cheque', 'Completado', 38, 'Recibí por mi mamá'),
(20, '2025-03-06', '2025-03-01 20:43:35', 1, 24.00, 'Efectivo', 'Completado', 38, 'Pago por inmuebles');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfiles`
--

CREATE TABLE `perfiles` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(64) COLLATE utf8_spanish_ci NOT NULL,
  `Descripcion` varchar(250) COLLATE utf8_spanish_ci NOT NULL,
  `PaginaIngresos` tinyint(1) NOT NULL,
  `AgregarIngreso` tinyint(1) NOT NULL,
  `AnularActivarIngreso` tinyint(1) NOT NULL,
  `EditarIngreso` tinyint(1) NOT NULL,
  `PaginaReportes` tinyint(1) NOT NULL,
  `PaginaGastos` tinyint(1) NOT NULL,
  `AgregarGasto` tinyint(1) NOT NULL,
  `AnularActivarGasto` tinyint(1) NOT NULL,
  `EditarGasto` tinyint(1) NOT NULL,
  `PaginaCategorias` tinyint(1) NOT NULL,
  `AgregarCategoria` tinyint(1) NOT NULL,
  `EditarCategoria` tinyint(1) NOT NULL,
  `PaginaUsuario` tinyint(1) NOT NULL,
  `CrearUsuario` tinyint(1) NOT NULL,
  `ActivarDesactivarUsuario` tinyint(1) NOT NULL,
  `CrearRol` tinyint(1) NOT NULL,
  `PaginaAuditoria` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `perfiles`
--

INSERT INTO `perfiles` (`Id`, `Nombre`, `Descripcion`, `PaginaIngresos`, `AgregarIngreso`, `AnularActivarIngreso`, `EditarIngreso`, `PaginaReportes`, `PaginaGastos`, `AgregarGasto`, `AnularActivarGasto`, `EditarGasto`, `PaginaCategorias`, `AgregarCategoria`, `EditarCategoria`, `PaginaUsuario`, `CrearUsuario`, `ActivarDesactivarUsuario`, `CrearRol`, `PaginaAuditoria`) VALUES
(1, 'Admin', 'Controla todo dentro del sistema', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0),
(3, 'Ingreso', 'Controla solo la página de ingresos', 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(4, 'Egresos', 'Controla solo la página de gastos', 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `Id` int(11) NOT NULL,
  `Cedula` bigint(10) NOT NULL,
  `Nombre` varchar(64) COLLATE utf8mb4_general_ci NOT NULL,
  `Apellido` varchar(64) COLLATE utf8mb4_general_ci NOT NULL,
  `Correo` varchar(128) COLLATE utf8mb4_general_ci NOT NULL,
  `Password` varchar(64) COLLATE utf8mb4_general_ci NOT NULL,
  `Rol` int(11) NOT NULL,
  `Estado` enum('Activo','Inactivo') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`Id`, `Cedula`, `Nombre`, `Apellido`, `Correo`, `Password`, `Rol`, `Estado`) VALUES
(8, 1726621830, 'Bryan', 'Quispe', 'asfsafasf@afasfasf.com', '$2y$10$/umyUyF/tUkKeqD03.87/uvdx7Wlc/psgBQaBcp/dbcH9eN.DmzwS', 1, 'Inactivo'),
(38, 2222222222, 'Juan Polainas', 'Perez Salcedo', 'rquisper406@gmail.com', '$2y$10$IBjN5RAJztsLyGMIzUeN5e5Eb9JjT3W7EgXK/bGI.M7e2tVxBVsO2', 1, 'Activo'),
(39, 4534564564, 'dsadsad', 'asdsad', 'fjuj_djsrn32@juaxe.com', '$2y$10$vYNZDpqzgpwhFWO.0MZ6k.vFThPtrgVnv7yf/pMIiH4FKK4C92IaO', 1, 'Activo'),
(40, 1111111111, 'dsadad', 'sadassadsa', 'Mateo406@sdadd.com', '$2y$10$1He7mT5EpD/QmipvyMf5S.CJdEiLEg97E.1AVZg5y/YzzbOJpCNdG', 3, 'Activo'),
(42, 1234567890, 'Admin', 'Administrador', 'admin@admin.com', '$2y$10$00Z/FBydxbR1Mev4AftmGu9i2rH61MrODMegFy9QgVHvmcFH5bxm.', 3, 'Inactivo'),
(44, 1755281399, 'Mateo', 'Medranda', 'matemedranda15@gmail.com', '$2y$10$mgWy9yNnUi2VP6RPDYKyR.qVIyRmgm9SAJ9kK6dCiVbfgFC8XzKjy', 4, 'Activo');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `egresos`
--
ALTER TABLE `egresos`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `FK_GASTA` (`idUsuario`),
  ADD KEY `FK_ACCEDE` (`IdTipo`);

--
-- Indices de la tabla `ingresos`
--
ALTER TABLE `ingresos`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `FK_INGRESA` (`idUsuario`),
  ADD KEY `FK_PERTENECE` (`IdTipo`);

--
-- Indices de la tabla `perfiles`
--
ALTER TABLE `perfiles`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Correo` (`Correo`),
  ADD UNIQUE KEY `Cedula` (`Cedula`),
  ADD KEY `FK_PERMITE` (`Rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `egresos`
--
ALTER TABLE `egresos`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `ingresos`
--
ALTER TABLE `ingresos`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `perfiles`
--
ALTER TABLE `perfiles`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `egresos`
--
ALTER TABLE `egresos`
  ADD CONSTRAINT `FK_ACCEDE` FOREIGN KEY (`IdTipo`) REFERENCES `categorias` (`Id`),
  ADD CONSTRAINT `FK_GASTA` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`Id`);

--
-- Filtros para la tabla `ingresos`
--
ALTER TABLE `ingresos`
  ADD CONSTRAINT `FK_INGRESA` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_PERTENECE` FOREIGN KEY (`IdTipo`) REFERENCES `categorias` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `FK_PERMITE` FOREIGN KEY (`Rol`) REFERENCES `perfiles` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
