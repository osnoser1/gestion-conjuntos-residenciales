-- phpMyAdmin SQL Dump
-- version 4.1.6
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-06-2014 a las 16:22:41
-- Versión del servidor: 5.6.16
-- Versión de PHP: 5.5.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `conjuntoresidencial`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `apartamentos`
--

CREATE TABLE IF NOT EXISTS `apartamentos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idApartamento` int(11) NOT NULL,
  `idPiso` int(11) NOT NULL,
  `idEdificio` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Volcado de datos para la tabla `apartamentos`
--

INSERT INTO `apartamentos` (`id`, `idApartamento`, `idPiso`, `idEdificio`, `idUsuario`) VALUES
(1, 1, 1, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `edificio`
--

CREATE TABLE IF NOT EXISTS `edificio` (
  `idEdificio` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(25) NOT NULL,
  PRIMARY KEY (`idEdificio`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `edificio`
--

INSERT INTO `edificio` (`idEdificio`, `nombre`) VALUES
(1, 'Edificio A'),
(2, 'Edificio B'),
(3, 'Edificio B');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=19 ;

--
-- Volcado de datos para la tabla `mensaje`
--

INSERT INTO `mensaje` (`idMensaje`, `asunto`, `descripcion`, `fecha`, `leido`, `para`) VALUES
(10, 'xvxcvxcvxcvxcvxv', '<span style="font-weight: bold;">xcvxcvxvxv</span>', '2014-06-08 02:26:23', 1, 'cheche338@gmail.com'),
(11, 'sdfdsfdsf', 'sdfdsfsdfsf    \n  ', '2014-06-08 08:32:30', 1, 'cheche338@gmail.com'),
(12, 'cgbhcvbncvb', 'dfgdfgdfgdfg', '2014-06-08 08:32:47', 1, 'cheche338@gmail.com'),
(13, 'dfgdfgdfdfg', 'bncvbcvbcvb', '2014-06-08 08:32:58', 0, 'bnbbbbbb'),
(14, 'dfgdfgdfgdfgdfg', 'sdfdsfdsf', '2014-06-08 08:33:13', 0, 'cvbcvbcvbcvb'),
(15, 'xcvxcvxcvxcv', 'sdfsdfasdazxczxc', '2014-06-08 08:33:25', 0, 'fsdgdfgdffg'),
(16, 'sdfsdfsdfsdf', 'vcbvbcvbcvb', '2014-06-08 08:33:35', 1, 'cheche338@gmail.com'),
(17, 'sdfdsfsdfdsfdsf', 'vxcbcbcvbcvb', '2014-06-08 08:33:47', 1, 'cheche338@gmail.com'),
(18, 'sdfsdfsdf', 'dfgdfgdfgdfsdfsdf    \n  ', '2014-06-08 08:35:26', 1, 'cheche338@gmail.com');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Volcado de datos para la tabla `mensajesenviados`
--

INSERT INTO `mensajesenviados` (`idMensaje`, `para`, `asunto`, `descripcion`, `fecha`) VALUES
(2, 'cheche338@gmail.com', 'xvxcvxcvxcvxcvxv', '<span style="font-weight: bold;">xcvxcvxvxv</span>', '2014-06-08 02:26:23'),
(3, 'cheche338@gmail.com', 'sdfdsfdsf', 'sdfdsfsdfsf    \n  ', '2014-06-08 08:32:30'),
(4, 'cheche338@gmail.com', 'cgbhcvbncvb', 'dfgdfgdfgdfg', '2014-06-08 08:32:47'),
(5, 'bnbbbbbb', 'dfgdfgdfdfg', 'bncvbcvbcvb', '2014-06-08 08:32:58'),
(6, 'cvbcvbcvbcvb', 'dfgdfgdfgdfgdfg', 'sdfdsfdsf', '2014-06-08 08:33:13'),
(7, 'fsdgdfgdffg', 'xcvxcvxcvxcv', 'sdfsdfasdazxczxc', '2014-06-08 08:33:25'),
(8, 'cheche338@gmail.com', 'sdfsdfsdfsdf', 'vcbvbcvbcvb', '2014-06-08 08:33:35'),
(9, 'cheche338@gmail.com', 'sdfdsfsdfdsfdsf', 'vxcbcbcvbcvb', '2014-06-08 08:33:47'),
(10, 'cheche338@gmail.com', 'sdfsdfsdf', 'dfgdfgdfgdfsdfsdf    \n  ', '2014-06-08 08:35:26');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pisos`
--

CREATE TABLE IF NOT EXISTS `pisos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idPiso` int(11) NOT NULL,
  `idEdificio` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idPiso` (`idPiso`),
  KEY `idEdificio` (`idEdificio`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `pisos`
--

INSERT INTO `pisos` (`id`, `idPiso`, `idEdificio`) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE IF NOT EXISTS `usuario` (
  `idUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  PRIMARY KEY (`idUsuario`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `email`) VALUES
(1, 'cheche338@gmail.com'),
(2, 'cheche338@yahoo.com.ve');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
