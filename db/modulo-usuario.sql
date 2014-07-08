-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-07-2014 a las 04:04:57
-- Versión del servidor: 5.6.17
-- Versión de PHP: 5.5.12

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
-- Estructura de tabla para la tabla `telefono`
--

DROP TABLE IF EXISTS `telefono`;
CREATE TABLE IF NOT EXISTS `telefono` (
  `IDTelefono` int(11) NOT NULL AUTO_INCREMENT,
  `IDUsuario` int(11) NOT NULL,
  `Telefono` varchar(12) NOT NULL,
  `Tipo` varchar(10) NOT NULL,
  PRIMARY KEY (`IDTelefono`),
  KEY `usuario-tlf` (`IDUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE IF NOT EXISTS `usuario` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `TipoUsuario` int(11) NOT NULL,
  `Nombre` varchar(30) NOT NULL,
  `Apellido` varchar(30) NOT NULL,
  `Cedula` varchar(8) NOT NULL,
  `Correo` varchar(40) NOT NULL,
  `Contrasena` varchar(60) NOT NULL,
  `Abono` float NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`ID`, `TipoUsuario`, `Nombre`, `Apellido`, `Cedula`, `Correo`, `Contrasena`, `Abono`) VALUES
(1, 1, 'Ricardo', 'Felicce', '20448909', 'exosymmetry@hotmail.com', '123', 1023),
(2, 1, 'Jenny', 'Gonzales', '9831876', 'exosymmetry@hotmail.com', '321', 2000),
(3, 1, 'Alfonso Andrés', 'López Molina', '20503457', 'osnoser_12@hotmail.com', 'osnoser1', 23500),
(4, 1, 'Mariangela', 'Cermeño', '19169037', 'mariangeladiaz@gmail.com', 'macarena', 450),
(5, 2, 'admin', 'admin', '111111', 'admin@admin.com', 'admin', 0);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `telefono`
--
ALTER TABLE `telefono`
  ADD CONSTRAINT `telefono_ibfk_1` FOREIGN KEY (`IDUsuario`) REFERENCES `usuario` (`ID`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
