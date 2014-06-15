-- phpMyAdmin SQL Dump
-- version 4.1.6
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-06-2014 a las 10:03:50
-- Versión del servidor: 5.6.16
-- Versión de PHP: 5.5.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `constructora`
--

-- --------------------------------------------------------
USE `conjunto_residencial`;
--
-- Estructura de tabla para la tabla `apartamento`
--

CREATE TABLE IF NOT EXISTS `apartamento` (
  `idApartamento` int(11) NOT NULL AUTO_INCREMENT,
  `Direccion` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Tipo` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Tamaño` int(3) NOT NULL,
  `numBaños` int(1) NOT NULL,
  `numHab` int(1) NOT NULL,
  `Sala` tinyint(1) NOT NULL,
  `Cocina` tinyint(1) NOT NULL,
  `Comedor` tinyint(1) NOT NULL,
  `numEst` int(1) NOT NULL,
  `Maletero` int(1) NOT NULL,
  `Casillero` tinyint(1) NOT NULL,
  `Alícuota` int(5) NOT NULL,
  PRIMARY KEY (`idApartamento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
