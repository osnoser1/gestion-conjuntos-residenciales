-- phpMyAdmin SQL Dump
-- version 4.1.4
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-06-2014 a las 03:14:59
-- Versión del servidor: 5.6.15-log
-- Versión de PHP: 5.4.24

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
-- Estructura de tabla para la tabla `mensaje`
--

CREATE TABLE IF NOT EXISTS `mensaje` (
  `idMensaje` int(11) NOT NULL AUTO_INCREMENT,
  `asunto` varchar(25) NOT NULL,
  `descripcion` text NOT NULL,
  `fecha` datetime NOT NULL,
  `leido` tinyint(1) NOT NULL,
  `para` varchar(50) NOT NULL,
  `de` varchar(50) NOT NULL,
  PRIMARY KEY (`idMensaje`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=47 ;

--
-- Volcado de datos para la tabla `mensaje`
--

INSERT INTO `mensaje` (`idMensaje`, `asunto`, `descripcion`, `fecha`, `leido`, `para`, `de`) VALUES
(29, 'Prueba n+1', 'sdfdsf', '2014-06-22 12:17:58', 0, 'exosymmetry@hotmail.com', ''),
(30, 'Prueba n+2', 'Prueba n+2', '2014-06-22 12:18:32', 1, 'exosymmetry@hotmail.com', ''),
(31, 'Prueba n+3', 'Prueba n+3          \n        ', '2014-06-22 12:19:03', 0, 'exosymmetry@hotmail.com', ''),
(34, 'hjjhgjhgjhg', '<div style="text-align: center;"><span style="line-height: 1.42857143; font-weight: bold;">gfcfgdgfdgdfgfd fdgfd gfd gfd</span></div>', '2014-06-24 12:40:12', 0, 'exosymmetry@hotmail.com', ''),
(35, 'asdasdasdasd', 'asdasdasdasd', '2014-06-24 18:14:22', 1, 'exosymmetry@hotmail.com', ''),
(36, 'dddddddddddddd', 'ddddssssssssssssssssssssssssssssssssss', '2014-06-24 18:14:33', 1, 'exosymmetry@hotmail.com', ''),
(37, 'asdasdasdasd', 'asdasddffgdfgcvbcvbcvb', '2014-06-24 18:15:08', 1, 'exosymmetry@hotmail.com', ''),
(41, 'sdfsdfsdfxcvxcv', 'xcvxcvxcvsdfsdf', '2014-06-24 18:15:50', 1, 'exosymmetry@hotmail.com', ''),
(44, 'yjuujhjmghmgm', 'hvngnvbnbvn', '2014-06-24 18:16:28', 1, 'exosymmetry@hotmail.com', '');

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
  `de` varchar(50) NOT NULL,
  PRIMARY KEY (`idMensaje`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=38 ;

--
-- Volcado de datos para la tabla `mensajesenviados`
--

INSERT INTO `mensajesenviados` (`idMensaje`, `para`, `asunto`, `descripcion`, `fecha`, `de`) VALUES
(20, 'exosymmetry@hotmail.com', 'Probando Mensaje 1', 'Probando Mensaje 1', '2014-06-10 10:39:15', ''),
(21, 'exosymmetry@hotmail.com', 'Prueba n+1', 'sdfdsf', '2014-06-22 12:17:58', ''),
(22, 'exosymmetry@hotmail.com', 'Prueba n+2', 'Prueba n+2', '2014-06-22 12:18:32', ''),
(23, 'exosymmetry@hotmail.com', 'Prueba n+3', 'Prueba n+3          \n        ', '2014-06-22 12:19:03', ''),
(24, 'exosymmetry@hotmail.com', 'Prueba n+4', 'prueba n+4', '2014-06-22 12:19:26', ''),
(25, 'exosymmetry@hotmail.com', 'jhgjhgjhgjhgjh', 'cgfgfcgcgfcgfcgfcgfcgdfgsfdasfdsfdsfsfds', '2014-06-23 17:24:59', ''),
(26, 'exosymmetry@hotmail.com', 'hjjhgjhgjhg', '<div style="text-align: center;"><span style="line-height: 1.42857143; font-weight: bold;">gfcfgdgfdgdfgfd fdgfd gfd gfd</span></div>', '2014-06-24 12:40:12', ''),
(27, 'exosymmetry@hotmail.com', 'asdasdasdasd', 'asdasdasdasd', '2014-06-24 18:14:22', ''),
(28, 'exosymmetry@hotmail.com', 'dddddddddddddd', 'ddddssssssssssssssssssssssssssssssssss', '2014-06-24 18:14:33', ''),
(29, 'exosymmetry@hotmail.com', 'asdasdasdasd', 'asdasddffgdfgcvbcvbcvb', '2014-06-24 18:15:08', ''),
(30, 'exosymmetry@hotmail.com', 'sdfsdfsdf', 'zxczxczxczc', '2014-06-24 18:15:17', ''),
(31, 'exosymmetry@hotmail.com', 'zxczxczxczx', 'asdasdasdasdasd', '2014-06-24 18:15:27', ''),
(32, 'exosymmetry@hotmail.com', 'zxczxcasdasd', 'xcvxcvxcvxc32213', '2014-06-24 18:15:39', ''),
(33, 'exosymmetry@hotmail.com', 'sdfsdfsdfxcvxcv', 'xcvxcvxcvsdfsdf', '2014-06-24 18:15:50', ''),
(35, 'exosymmetry@hotmail.com', 'fffffffffffffffffffffffff', 'fffffffffffffddddddddddddddddddd', '2014-06-24 18:16:14', '');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
