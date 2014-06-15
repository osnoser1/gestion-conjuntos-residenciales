-- phpMyAdmin SQL Dump
-- version 4.1.6
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-06-2014 a las 09:09:19
-- Versión del servidor: 5.5.36
-- Versión de PHP: 5.4.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `conjunto_residencial`
--
CREATE DATABASE IF NOT EXISTS `conjunto_residencial` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `conjunto_residencial`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `edificio`
--

DROP TABLE IF EXISTS `edificio`;
CREATE TABLE IF NOT EXISTS `edificio` (
  `idEdificio` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `NroDePisos` int(11) NOT NULL,
  PRIMARY KEY (`idEdificio`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `edificio`
--

INSERT INTO `edificio` (`idEdificio`, `Nombre`, `NroDePisos`) VALUES
(1, 'La palma', 8),
(2, 'Las flores', 16);


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
