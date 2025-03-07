-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-03-2025 a las 13:28:27
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
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
-- Estructura de tabla para la tabla `egresos`
--

CREATE TABLE `egresos` (
  `Id` int(11) NOT NULL,
  `Fecha` date NOT NULL,
  `IdTipo` int(11) NOT NULL,
  `Monto` float NOT NULL,
  `Metodo` varchar(64) NOT NULL,
  `Estado` varchar(64) NOT NULL DEFAULT 'Completado',
  `idUsuario` int(11) NOT NULL,
  `Descripcion` varchar(128) NOT NULL,
  `FechaRegistro` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `egresos`
--

INSERT INTO `egresos` (`Id`, `Fecha`, `IdTipo`, `Monto`, `Metodo`, `Estado`, `idUsuario`, `Descripcion`, `FechaRegistro`) VALUES
(1, '2025-02-06', 2, 23, 'Efectivo', 'Completado', 8, 'sdasd', '0000-00-00 00:00:00'),
(2, '2024-12-25', 4, 20, 'Efectivo', 'Completado', 8, 'Gasto Vivienda', '0000-00-00 00:00:00'),
(3, '2025-03-06', 2, 1.02, 'Efectivo', 'Completado', 8, 'Gasto Casa', '0000-00-00 00:00:00'),
(4, '2025-03-06', 2, 1.02, 'Efectivo', 'Completado', 8, 'Gasto Casa', '0000-00-00 00:00:00'),
(5, '2025-03-11', 4, 23, 'Transferencia', 'Completado', 8, 'Gasto Casa', '2025-03-01 21:46:11'),
(6, '2025-03-12', 2, 1.03, 'Transferencia', 'Completado', 8, 'Gasto Trabajo', '2025-03-03 08:27:09');

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

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `egresos`
--
ALTER TABLE `egresos`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `egresos`
--
ALTER TABLE `egresos`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
