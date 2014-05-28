-- phpMyAdmin SQL Dump
-- version 4.0.4.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-05-2014 a las 01:53:51
-- Versión del servidor: 5.6.11
-- Versión de PHP: 5.5.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `conjunto_residenciales`
--
CREATE DATABASE IF NOT EXISTS `conjunto_residenciales` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `conjunto_residenciales`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `apartamento`
--

CREATE TABLE IF NOT EXISTS `apartamento` (
  `idapartamento` int(7) NOT NULL,
  `nrodepiso` int(2) NOT NULL,
  `idedificio` int(7) NOT NULL,
  PRIMARY KEY (`idapartamento`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `edificio`
--

CREATE TABLE IF NOT EXISTS `edificio` (
  `idedificio` int(7) NOT NULL,
  `nombre` varchar(7) NOT NULL,
  `cantpisos` int(2) NOT NULL,
  PRIMARY KEY (`idedificio`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `post`
--

CREATE TABLE IF NOT EXISTS `post` (
  `idpost` int(7) NOT NULL,
  `contenido` varchar(500) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  ` titulo` varchar(30) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `edif` set('','','','','','','','','','') CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `pisos` set('','','','','','','','','') CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `aptos` set('','','','','','','','','','','','','') CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `fecha` datetime NOT NULL,
  PRIMARY KEY (`idpost`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
