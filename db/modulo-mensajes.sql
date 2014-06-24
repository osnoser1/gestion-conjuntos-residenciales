-- phpMyAdmin SQL Dump
-- version 4.1.6
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-06-2014 a las 17:34:55
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
-- Estructura de tabla para la tabla `mensaje`
--

CREATE TABLE IF NOT EXISTS `mensaje` (
  `idMensaje` int(11) NOT NULL AUTO_INCREMENT,
  `asunto` varchar(25) NOT NULL,
  `descripcion` text NOT NULL,
  `fecha` datetime NOT NULL,
  `leido` tinyint(1) NOT NULL,
  `para` varchar(50) NOT NULL,
  PRIMARY KEY (`idMensaje`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=30 ;

--
-- Volcado de datos para la tabla `mensaje`
--

INSERT INTO `mensaje` (`idMensaje`, `asunto`, `descripcion`, `fecha`, `leido`, `para`) VALUES
(28, 'Probando Mensaje 1', 'Probando Mensaje 1', '2014-06-10 10:39:15', 0, 'exosymmetry@hotmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensajesenviados`
--

CREATE TABLE IF NOT EXISTS `mensajesenviados` (
  `idMensaje` int(11) NOT NULL AUTO_INCREMENT,
  `para` varchar(25) NOT NULL,
  `asunto` varchar(25) NOT NULL,
  `descripcion` text NOT NULL,
  `fecha` datetime NOT NULL,
  PRIMARY KEY (`idMensaje`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=22 ;

--
-- Volcado de datos para la tabla `mensajesenviados`
--

INSERT INTO `mensajesenviados` (`idMensaje`, `para`, `asunto`, `descripcion`, `fecha`) VALUES
(20, 'exosymmetry@hotmail.com', 'Probando Mensaje 1', 'Probando Mensaje 1', '2014-06-10 10:39:15');



/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
