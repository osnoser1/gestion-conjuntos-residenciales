-- phpMyAdmin SQL Dump
-- version 4.1.6
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-06-2014 a las 23:31:02
-- Versión del servidor: 5.6.16
-- Versión de PHP: 5.5.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `conjunto_residencial`
--
USE `conjunto_residencial`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gasto`
--

CREATE TABLE IF NOT EXISTS `gasto` (
  `idGasto` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `Descripcion` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idGasto`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=7 ;

--
-- Volcado de datos para la tabla `gasto`
--

INSERT INTO `gasto` (`idGasto`, `Nombre`, `Descripcion`) VALUES
(1, 'Vigilancia', NULL),
(2, 'Aseo urbano', NULL),
(3, 'Mantenimiento piscina', NULL),
(4, 'Mantenimiento ascensor', NULL),
(5, 'Luz residencia', NULL),
(6, 'Mantenimiento cancha de fútbol', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gasto_fecha`
--

CREATE TABLE IF NOT EXISTS `gasto_fecha` (
  `idGastoFecha` int(11) NOT NULL AUTO_INCREMENT,
  `Fecha` date NOT NULL,
  PRIMARY KEY (`idGastoFecha`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=2 ;

--
-- Volcado de datos para la tabla `gasto_fecha`
--

INSERT INTO `gasto_fecha` (`idGastoFecha`, `Fecha`) VALUES
(1, '2014-02-01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gasto_historial`
--

CREATE TABLE IF NOT EXISTS `gasto_historial` (
  `idGastoHistorial` int(11) NOT NULL AUTO_INCREMENT,
  `idGastoFecha` int(11) NOT NULL,
  `idGasto` int(11) NOT NULL,
  `Precio` int(11) NOT NULL,
  PRIMARY KEY (`idGastoHistorial`),
  UNIQUE KEY `idGastoFecha` (`idGastoFecha`,`idGasto`),
  KEY `idGasto` (`idGasto`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `gasto_historial`
--
ALTER TABLE `gasto_historial`
  ADD CONSTRAINT `gasto_historial_ibfk_2` FOREIGN KEY (`idGasto`) REFERENCES `gasto` (`idGasto`),
  ADD CONSTRAINT `gasto_historial_ibfk_1` FOREIGN KEY (`idGastoFecha`) REFERENCES `gasto_fecha` (`idGastoFecha`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
