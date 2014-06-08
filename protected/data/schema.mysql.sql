-- phpMyAdmin SQL Dump
-- version 4.1.6
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-05-2014 a las 15:06:26
-- Versión del servidor: 5.6.16
-- Versión de PHP: 5.5.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `encuesta`
--
CREATE DATABASE IF NOT EXISTS `encuesta` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `encuesta`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE IF NOT EXISTS `cliente` (
  `idCliente` int(10) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(40) DEFAULT NULL,
  `Correo` varchar(25) DEFAULT NULL,
  `Cedula` varchar(8) NOT NULL,
  `Estado` int(1) NOT NULL,
  PRIMARY KEY (`idCliente`),
  UNIQUE KEY `Cedula` (`Cedula`),
  UNIQUE KEY `Cedula_2` (`Cedula`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`idCliente`, `Nombre`, `Correo`, `Cedula`, `Estado`) VALUES
(1, NULL, NULL, '12457854', 0),
(2, NULL, NULL, '16478963', 0),
(3, NULL, NULL, '18965321', 0),
(4, NULL, NULL, '20503457', 0),
(5, 'Nora Molina', 'isabel_504@hotmail.com', '15252457', 1),
(6, 'María Josefa', 'mariajosefa@hotmail.com', '13090827', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clienteopcionhorario`
--

CREATE TABLE IF NOT EXISTS `clienteopcionhorario` (
  `idClienteOpcionHorario` int(10) NOT NULL AUTO_INCREMENT,
  `idCliente` int(10) NOT NULL,
  `idOpcionHorario` int(10) NOT NULL,
  PRIMARY KEY (`idClienteOpcionHorario`),
  KEY `FKClienteOpc609523` (`idCliente`),
  KEY `FKClienteOpc42673` (`idOpcionHorario`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `clienteopcionhorario`
--

INSERT INTO `clienteopcionhorario` (`idClienteOpcionHorario`, `idCliente`, `idOpcionHorario`) VALUES
(1, 5, 7),
(2, 5, 9),
(3, 5, 11),
(6, 6, 18);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horarioseleccion`
--

CREATE TABLE IF NOT EXISTS `horarioseleccion` (
  `idHorarioSeleccion` int(10) NOT NULL AUTO_INCREMENT,
  `idSeleccion` int(10) NOT NULL,
  PRIMARY KEY (`idHorarioSeleccion`),
  KEY `FKHorarioSel734015` (`idSeleccion`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `horarioseleccion`
--

INSERT INTO `horarioseleccion` (`idHorarioSeleccion`, `idSeleccion`) VALUES
(1, 2),
(2, 4),
(3, 4),
(4, 4),
(5, 5),
(6, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `opcionhorario`
--

CREATE TABLE IF NOT EXISTS `opcionhorario` (
  `idOpcionHorario` int(10) NOT NULL AUTO_INCREMENT,
  `Hora` time NOT NULL,
  `idHorarioSeleccion` int(10) NOT NULL,
  `Fecha` date NOT NULL,
  PRIMARY KEY (`idOpcionHorario`),
  KEY `FKOpcionHora173632` (`idHorarioSeleccion`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `opcionhorario`
--

INSERT INTO `opcionhorario` (`idOpcionHorario`, `Hora`, `idHorarioSeleccion`, `Fecha`) VALUES
(2, '08:00:00', 1, '2014-06-01'),
(3, '08:45:00', 1, '2014-06-01'),
(4, '09:30:00', 1, '2014-06-01'),
(5, '08:00:00', 2, '2014-06-01'),
(6, '08:45:00', 2, '2014-06-01'),
(7, '09:30:00', 2, '2014-06-01'),
(8, '08:00:00', 3, '2014-06-01'),
(9, '08:45:00', 3, '2014-06-01'),
(10, '09:30:00', 3, '2014-06-01'),
(11, '08:00:00', 4, '2014-06-01'),
(12, '08:45:00', 4, '2014-06-01'),
(13, '09:30:00', 4, '2014-06-01'),
(14, '08:00:00', 5, '2014-06-01'),
(15, '08:45:00', 5, '2014-06-01'),
(16, '09:30:00', 5, '2014-06-01'),
(17, '08:00:00', 6, '2014-06-01'),
(18, '08:45:00', 6, '2014-06-01'),
(19, '09:30:00', 6, '2014-06-01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `seleccion`
--

CREATE TABLE IF NOT EXISTS `seleccion` (
  `idSeleccion` int(10) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(25) DEFAULT NULL,
  `idSeleccionPadre` int(10) DEFAULT NULL,
  PRIMARY KEY (`idSeleccion`),
  KEY `FKSeleccion639563` (`idSeleccionPadre`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `seleccion`
--

INSERT INTO `seleccion` (`idSeleccion`, `Nombre`, `idSeleccionPadre`) VALUES
(2, 'Peluquería', NULL),
(3, 'Spa', NULL),
(4, 'Masaje', 3),
(5, 'Exfoliación', 3),
(6, 'Baño chocolate', 3);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `clienteopcionhorario`
--
ALTER TABLE `clienteopcionhorario`
  ADD CONSTRAINT `FKClienteOpc42673` FOREIGN KEY (`idOpcionHorario`) REFERENCES `opcionhorario` (`idOpcionHorario`),
  ADD CONSTRAINT `FKClienteOpc609523` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`idCliente`);

--
-- Filtros para la tabla `horarioseleccion`
--
ALTER TABLE `horarioseleccion`
  ADD CONSTRAINT `FKHorarioSel734015` FOREIGN KEY (`idSeleccion`) REFERENCES `seleccion` (`idSeleccion`);

--
-- Filtros para la tabla `opcionhorario`
--
ALTER TABLE `opcionhorario`
  ADD CONSTRAINT `FKOpcionHora173632` FOREIGN KEY (`idHorarioSeleccion`) REFERENCES `horarioseleccion` (`idHorarioSeleccion`);

--
-- Filtros para la tabla `seleccion`
--
ALTER TABLE `seleccion`
  ADD CONSTRAINT `FKSeleccion639563` FOREIGN KEY (`idSeleccionPadre`) REFERENCES `seleccion` (`idSeleccion`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
