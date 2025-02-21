-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-02-2025 a las 04:35:14
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
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `Id` int(11) NOT NULL,
  `Cedula` bigint(10) NOT NULL,
  `Nombre` varchar(64) NOT NULL,
  `Apellido` varchar(64) NOT NULL,
  `Correo` varchar(128) NOT NULL,
  `Password` varchar(64) NOT NULL,
  `Rol` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`Id`, `Cedula`, `Nombre`, `Apellido`, `Correo`, `Password`, `Rol`) VALUES
(8, 1726621830, 'Bryan', 'Quispe', 'asfsafasf@afasfasf.com', '$2y$10$/umyUyF/tUkKeqD03.87/uvdx7Wlc/psgBQaBcp/dbcH9eN.DmzwS', 'admin'),
(38, 2222222222, 'Juan Roberto', 'Perez Salazar', 'rquisper406@gmail.com', '$2y$10$NFBeHMQsGrWnU7RInA7/2OMxjtmp5CzdfVEc/wMS75DBGUzY78HP.', 'ingreso'),
(39, 4534564564, 'dsadsad', 'asdsad', 'fjuj_djsrn32@juaxe.com', '$2y$10$vYNZDpqzgpwhFWO.0MZ6k.vFThPtrgVnv7yf/pMIiH4FKK4C92IaO', 'egreso'),
(40, 1111111111, 'dsadad', 'sadassadsa', 'Mateo406@sdadd.com', '$2y$10$1He7mT5EpD/QmipvyMf5S.CJdEiLEg97E.1AVZg5y/YzzbOJpCNdG', 'egreso');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Correo` (`Correo`),
  ADD UNIQUE KEY `Cedula` (`Cedula`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
