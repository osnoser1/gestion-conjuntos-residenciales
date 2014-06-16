-- phpMyAdmin SQL Dump
-- version 4.1.6
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-06-2014 a las 03:20:05
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
CREATE DATABASE IF NOT EXISTS `conjunto_residencial` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `conjunto_residencial`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gasto`
--

DROP TABLE IF EXISTS `gasto`;
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
-- Estructura de tabla para la tabla `gasto_entidad_historial`
--

DROP TABLE IF EXISTS `gasto_entidad_historial`;
CREATE TABLE IF NOT EXISTS `gasto_entidad_historial` (
  `idEntidadHistorial` int(11) NOT NULL AUTO_INCREMENT,
  `idGastoHistorial` int(11) NOT NULL,
  `idEdificio` int(11) NOT NULL,
  `idApartamento` int(11) NOT NULL,
  `NroDePiso` int(11) NOT NULL,
  PRIMARY KEY (`idEntidadHistorial`),
  KEY `idGastoHistorial` (`idGastoHistorial`),
  KEY `idApartamento` (`idApartamento`),
  KEY `idEdificio` (`idEdificio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gasto_fecha`
--

DROP TABLE IF EXISTS `gasto_fecha`;
CREATE TABLE IF NOT EXISTS `gasto_fecha` (
  `idGastoFecha` int(11) NOT NULL AUTO_INCREMENT,
  `Fecha` date NOT NULL,
  PRIMARY KEY (`idGastoFecha`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `gasto_fecha`
--

INSERT INTO `gasto_fecha` (`idGastoFecha`, `Fecha`) VALUES
(1, '2014-02-01'),
(2, '2014-01-01'),
(3, '2014-03-01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gasto_historial`
--

DROP TABLE IF EXISTS `gasto_historial`;
CREATE TABLE IF NOT EXISTS `gasto_historial` (
  `idGastoHistorial` int(11) NOT NULL AUTO_INCREMENT,
  `idGastoFecha` int(11) NOT NULL,
  `idGasto` int(11) NOT NULL,
  `Precio` int(11) NOT NULL,
  PRIMARY KEY (`idGastoHistorial`),
  UNIQUE KEY `idGastoFecha` (`idGastoFecha`,`idGasto`),
  KEY `idGasto` (`idGasto`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=13 ;

--
-- Volcado de datos para la tabla `gasto_historial`
--

INSERT INTO `gasto_historial` (`idGastoHistorial`, `idGastoFecha`, `idGasto`, `Precio`) VALUES
(1, 1, 1, 10000),
(2, 1, 2, 10000),
(3, 1, 3, 10000),
(4, 1, 4, 10000),
(5, 2, 1, 3200),
(6, 2, 2, 10000),
(7, 2, 3, 5000),
(8, 2, 4, 10000),
(9, 3, 1, 3200),
(10, 3, 6, 8640),
(11, 3, 3, 5000),
(12, 3, 5, 1457);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagos_historial_usuario`
--

DROP TABLE IF EXISTS `pagos_historial_usuario`;
CREATE TABLE IF NOT EXISTS `pagos_historial_usuario` (
  `idPagosHistorialUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `idPagosUsuario` int(11) NOT NULL,
  `idGastoHistorial` int(11) NOT NULL,
  `TotalAlicuota` int(11) NOT NULL,
  PRIMARY KEY (`idPagosHistorialUsuario`),
  KEY `idPagoUsuario` (`idPagosUsuario`),
  KEY `idGastoHistorial` (`idGastoHistorial`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=5 ;

--
-- Volcado de datos para la tabla `pagos_historial_usuario`
--

INSERT INTO `pagos_historial_usuario` (`idPagosHistorialUsuario`, `idPagosUsuario`, `idGastoHistorial`, `TotalAlicuota`) VALUES
(1, 2, 5, 250),
(2, 2, 6, 154),
(3, 1, 1, 456),
(4, 1, 2, 254);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagos_usuario`
--

DROP TABLE IF EXISTS `pagos_usuario`;
CREATE TABLE IF NOT EXISTS `pagos_usuario` (
  `idPagosUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `idUsuario` int(11) NOT NULL,
  `idGastoFecha` int(11) NOT NULL,
  `Estado` int(11) NOT NULL,
  PRIMARY KEY (`idPagosUsuario`),
  KEY `idUsuario` (`idUsuario`),
  KEY `idUsuario_2` (`idUsuario`),
  KEY `idGastoFecha` (`idGastoFecha`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `pagos_usuario`
--

INSERT INTO `pagos_usuario` (`idPagosUsuario`, `idUsuario`, `idGastoFecha`, `Estado`) VALUES
(1, 3, 1, 2),
(2, 3, 2, 2);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `gasto_entidad_historial`
--
ALTER TABLE `gasto_entidad_historial`
  ADD CONSTRAINT `gasto_entidad_historial_ibfk_3` FOREIGN KEY (`idApartamento`) REFERENCES `apartamento` (`idApartamento`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `gasto_entidad_historial_ibfk_1` FOREIGN KEY (`idGastoHistorial`) REFERENCES `gasto_historial` (`idGastoHistorial`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `gasto_entidad_historial_ibfk_2` FOREIGN KEY (`idEdificio`) REFERENCES `edificio` (`idEdificio`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `gasto_historial`
--
ALTER TABLE `gasto_historial`
  ADD CONSTRAINT `gasto_historial_ibfk_2` FOREIGN KEY (`idGasto`) REFERENCES `gasto` (`idGasto`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `gasto_historial_ibfk_1` FOREIGN KEY (`idGastoFecha`) REFERENCES `gasto_fecha` (`idGastoFecha`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `pagos_historial_usuario`
--
ALTER TABLE `pagos_historial_usuario`
  ADD CONSTRAINT `pagos_historial_usuario_ibfk_2` FOREIGN KEY (`idGastoHistorial`) REFERENCES `gasto_historial` (`idGastoHistorial`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pagos_historial_usuario_ibfk_1` FOREIGN KEY (`idPagosUsuario`) REFERENCES `pagos_usuario` (`idPagosUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `pagos_usuario`
--
ALTER TABLE `pagos_usuario`
  ADD CONSTRAINT `pagos_usuario_ibfk_2` FOREIGN KEY (`idGastoFecha`) REFERENCES `gasto_fecha` (`idGastoFecha`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pagos_usuario_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
