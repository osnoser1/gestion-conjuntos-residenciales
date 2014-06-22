-- phpMyAdmin SQL Dump
-- version 4.1.4
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-06-2014 a las 23:27:20
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `apartamento`
--

CREATE TABLE IF NOT EXISTS `apartamento` (
  `idApartamento` int(11) NOT NULL AUTO_INCREMENT,
  `idUsuario` int(11) NOT NULL,
  `Nombre` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Piso` int(11) NOT NULL,
  `idEdificio` int(11) NOT NULL,
  `idTipo` int(11) NOT NULL,
  PRIMARY KEY (`idApartamento`),
  KEY `idEdificio` (`idEdificio`),
  KEY `Tipo` (`idTipo`),
  KEY `idUsuario` (`idUsuario`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=20 ;

--
-- Volcado de datos para la tabla `apartamento`
--

INSERT INTO `apartamento` (`idApartamento`, `idUsuario`, `Nombre`, `Piso`, `idEdificio`, `idTipo`) VALUES
(1, 1, '1-A', 1, 1, 3),
(2, 2, '1-B', 1, 1, 4),
(3, 1, '2-A', 1, 1, 3),
(4, 1, '2-B', 1, 1, 4),
(5, 1, '3-A', 1, 1, 3),
(6, 1, '3-B', 1, 1, 4),
(7, 1, '4-A', 1, 1, 3),
(8, 1, '4-B', 1, 1, 4),
(9, 1, '5-A', 1, 1, 3),
(10, 1, '5-B', 1, 1, 4),
(11, 1, '6-A', 1, 1, 3),
(12, 1, '6-B', 1, 1, 4),
(13, 1, '7-A', 1, 1, 3),
(14, 1, '7-B', 1, 1, 4),
(18, 1, '8-A', 1, 1, 3),
(19, 1, '8-B', 1, 1, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `apartamentotipo`
--

CREATE TABLE IF NOT EXISTS `apartamentotipo` (
  `idApartamentoTipo` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `Tamano` int(11) NOT NULL,
  `numBanos` int(11) NOT NULL,
  `numHab` int(11) NOT NULL,
  `Sala` tinyint(4) NOT NULL,
  `Cocina` tinyint(4) NOT NULL,
  `Comedor` tinyint(4) NOT NULL,
  `numEst` int(11) NOT NULL,
  `Maletero` tinyint(4) NOT NULL,
  `Lavandero` tinyint(1) NOT NULL,
  `Casillero` tinyint(4) NOT NULL,
  `Alicuota` int(11) NOT NULL,
  PRIMARY KEY (`idApartamentoTipo`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=5 ;

--
-- Volcado de datos para la tabla `apartamentotipo`
--

INSERT INTO `apartamentotipo` (`idApartamentoTipo`, `Nombre`, `Tamano`, `numBanos`, `numHab`, `Sala`, `Cocina`, `Comedor`, `numEst`, `Maletero`, `Lavandero`, `Casillero`, `Alicuota`) VALUES
(2, 'Estudio', 60, 1, 1, 1, 1, 1, 0, 0, 0, 1, 10),
(3, 'Familiar', 200, 2, 3, 1, 1, 1, 1, 1, 1, 1, 25),
(4, 'Penthouse', 300, 3, 4, 1, 1, 1, 2, 1, 1, 1, 35);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `edificio`
--

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
-- Estructura de tabla para la tabla `gasto_entidad_historial`
--

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=33 ;

--
-- Volcado de datos para la tabla `mensaje`
--

INSERT INTO `mensaje` (`idMensaje`, `asunto`, `descripcion`, `fecha`, `leido`, `para`) VALUES
(28, 'Probando Mensaje 1', 'Probando Mensaje 1', '2014-06-10 10:39:15', 0, 'exosymmetry@hotmail.com'),
(29, 'Prueba n+1', 'sdfdsf', '2014-06-22 12:17:58', 1, 'exosymmetry@hotmail.com'),
(30, 'Prueba n+2', 'Prueba n+2', '2014-06-22 12:18:32', 0, 'exosymmetry@hotmail.com'),
(31, 'Prueba n+3', 'Prueba n+3          \n        ', '2014-06-22 12:19:03', 0, 'exosymmetry@hotmail.com'),
(32, 'Prueba n+4', 'prueba n+4', '2014-06-22 12:19:26', 0, 'exosymmetry@hotmail.com');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=25 ;

--
-- Volcado de datos para la tabla `mensajesenviados`
--

INSERT INTO `mensajesenviados` (`idMensaje`, `para`, `asunto`, `descripcion`, `fecha`) VALUES
(20, 'exosymmetry@hotmail.com', 'Probando Mensaje 1', 'Probando Mensaje 1', '2014-06-10 10:39:15'),
(21, 'exosymmetry@hotmail.com', 'Prueba n+1', 'sdfdsf', '2014-06-22 12:17:58'),
(22, 'exosymmetry@hotmail.com', 'Prueba n+2', 'Prueba n+2', '2014-06-22 12:18:32'),
(23, 'exosymmetry@hotmail.com', 'Prueba n+3', 'Prueba n+3          \n        ', '2014-06-22 12:19:03'),
(24, 'exosymmetry@hotmail.com', 'Prueba n+4', 'prueba n+4', '2014-06-22 12:19:26');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagos`
--

CREATE TABLE IF NOT EXISTS `pagos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idusuario` int(11) NOT NULL,
  `monto` int(11) NOT NULL,
  `idtipo` tinyint(11) NOT NULL,
  `nro_referencia` int(11) NOT NULL,
  `idbanco` smallint(11) NOT NULL,
  `fecha` date NOT NULL,
  `idEstado` tinyint(4) NOT NULL DEFAULT '1',
  `concepto` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idusuario` (`idusuario`),
  KEY `idtipo_de_pago` (`idtipo`),
  KEY `idbanco` (`idbanco`),
  KEY `idEstado` (`idEstado`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `pagos`
--

INSERT INTO `pagos` (`id`, `idusuario`, `monto`, `idtipo`, `nro_referencia`, `idbanco`, `fecha`, `idEstado`, `concepto`) VALUES
(1, 1, 920, 1, 987654321, 11, '2014-06-06', 2, 'Abono mes mayo'),
(2, 2, 765, 2, 12345789, 16, '2014-06-07', 2, 'Pago mes Junio ');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagos_bancos`
--

CREATE TABLE IF NOT EXISTS `pagos_bancos` (
  `id` smallint(11) NOT NULL AUTO_INCREMENT,
  `banco` varchar(60) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=37 ;

--
-- Volcado de datos para la tabla `pagos_bancos`
--

INSERT INTO `pagos_bancos` (`id`, `banco`) VALUES
(1, 'Otro'),
(2, 'Banco Canarias de Venezuela'),
(3, 'Banco Caroní'),
(4, 'Banco Confederado'),
(5, 'Banco Do Brasil'),
(6, 'Banco Exterior'),
(7, 'Banco Federal'),
(8, 'Banco Fondo Común'),
(9, 'Banco Guayana'),
(10, 'Banco Industrial de Venezuela'),
(11, 'Banco Mercantil'),
(12, 'Banco Occidental de Descuento'),
(13, 'Banco Plaza'),
(14, 'Banco Provincial'),
(15, 'Banco Sofitasa'),
(16, 'Banco Tequendama'),
(17, 'Banco Venezolano de Crédito'),
(18, 'Banco de Crédito de Colombia'),
(19, 'Banco de Venezuela'),
(20, 'Banco del Caribe'),
(21, 'Bancoro'),
(22, 'Banesco'),
(23, 'Banfoandes'),
(24, 'Banpro'),
(25, 'Bolívar Banco'),
(26, 'Casa Propia'),
(27, 'Central'),
(28, 'Citibank'),
(29, 'Corp Banca'),
(30, 'Del Sur'),
(31, 'Instituto Municipal de Crédito Popular'),
(32, 'Merenap'),
(33, 'Mi Casa'),
(34, 'Nuevo Mundo'),
(35, 'Stanford Bank'),
(36, 'Total Bank');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagos_estados`
--

CREATE TABLE IF NOT EXISTS `pagos_estados` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `estado` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `pagos_estados`
--

INSERT INTO `pagos_estados` (`id`, `estado`) VALUES
(1, 'Pendiente'),
(2, 'Aprobado'),
(3, 'Rechazado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagos_historial_usuario`
--

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
-- Estructura de tabla para la tabla `pagos_tipos`
--

CREATE TABLE IF NOT EXISTS `pagos_tipos` (
  `id` tinyint(11) NOT NULL AUTO_INCREMENT,
  `tipo` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `pagos_tipos`
--

INSERT INTO `pagos_tipos` (`id`, `tipo`) VALUES
(1, 'Depósito'),
(2, 'Transferencia');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagos_usuario`
--

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `post`
--

CREATE TABLE IF NOT EXISTS `post` (
  `idpost` int(7) NOT NULL,
  `contenido` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  ` titulo` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `edif` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `pisos` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `aptos` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `fecha` datetime NOT NULL,
  PRIMARY KEY (`idpost`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `telefono`
--

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

CREATE TABLE IF NOT EXISTS `usuario` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `TipoUsuario` int(11) NOT NULL,
  `Nombre` varchar(30) NOT NULL,
  `Apellido` varchar(30) NOT NULL,
  `Cedula` varchar(8) NOT NULL,
  `Correo` varchar(40) NOT NULL,
  `Contrasena` varchar(60) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`ID`, `TipoUsuario`, `Nombre`, `Apellido`, `Cedula`, `Correo`, `Contrasena`) VALUES
(1, 1, 'Ricardo', 'Felicce', '20448909', 'exosymmetry@hotmail.com', '123'),
(2, 1, 'Jenny', 'Gonzales', '9831876', 'exosymmetry@hotmail.com', '321'),
(3, 1, 'Alfonso Andrés', 'López Molina', '20503457', 'osnoser_12@hotmail.com', 'osnoser1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario-apartamento`
--

CREATE TABLE IF NOT EXISTS `usuario-apartamento` (
  `idusuarioapartamento` int(11) NOT NULL AUTO_INCREMENT,
  `idusuario` int(11) NOT NULL,
  `idapartamento` int(11) NOT NULL,
  PRIMARY KEY (`idusuarioapartamento`),
  UNIQUE KEY `idapartamento` (`idapartamento`),
  UNIQUE KEY `idusuario` (`idusuario`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `apartamento`
--
ALTER TABLE `apartamento`
  ADD CONSTRAINT `apartamento_ibfk_1` FOREIGN KEY (`idEdificio`) REFERENCES `edificio` (`idEdificio`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `apartamento_ibfk_2` FOREIGN KEY (`idTipo`) REFERENCES `apartamentotipo` (`idApartamentoTipo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `apartamento_ibfk_3` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`ID`);

--
-- Filtros para la tabla `gasto_entidad_historial`
--
ALTER TABLE `gasto_entidad_historial`
  ADD CONSTRAINT `gasto_entidad_historial_ibfk_1` FOREIGN KEY (`idGastoHistorial`) REFERENCES `gasto_historial` (`idGastoHistorial`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `gasto_entidad_historial_ibfk_2` FOREIGN KEY (`idEdificio`) REFERENCES `edificio` (`idEdificio`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `gasto_entidad_historial_ibfk_3` FOREIGN KEY (`idApartamento`) REFERENCES `apartamento` (`idApartamento`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `gasto_historial`
--
ALTER TABLE `gasto_historial`
  ADD CONSTRAINT `gasto_historial_ibfk_1` FOREIGN KEY (`idGastoFecha`) REFERENCES `gasto_fecha` (`idGastoFecha`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `gasto_historial_ibfk_2` FOREIGN KEY (`idGasto`) REFERENCES `gasto` (`idGasto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `pagos`
--
ALTER TABLE `pagos`
  ADD CONSTRAINT `pagos_ibfk_1` FOREIGN KEY (`idtipo`) REFERENCES `pagos_tipos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `pagos_ibfk_2` FOREIGN KEY (`idbanco`) REFERENCES `pagos_bancos` (`id`),
  ADD CONSTRAINT `pagos_ibfk_3` FOREIGN KEY (`idusuario`) REFERENCES `usuario` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `pagos_ibfk_4` FOREIGN KEY (`idEstado`) REFERENCES `pagos_estados` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `pagos_historial_usuario`
--
ALTER TABLE `pagos_historial_usuario`
  ADD CONSTRAINT `pagos_historial_usuario_ibfk_1` FOREIGN KEY (`idPagosUsuario`) REFERENCES `pagos_usuario` (`idPagosUsuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pagos_historial_usuario_ibfk_2` FOREIGN KEY (`idGastoHistorial`) REFERENCES `gasto_historial` (`idGastoHistorial`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `pagos_usuario`
--
ALTER TABLE `pagos_usuario`
  ADD CONSTRAINT `pagos_usuario_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pagos_usuario_ibfk_2` FOREIGN KEY (`idGastoFecha`) REFERENCES `gasto_fecha` (`idGastoFecha`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `telefono`
--
ALTER TABLE `telefono`
  ADD CONSTRAINT `telefono_ibfk_1` FOREIGN KEY (`IDUsuario`) REFERENCES `usuario` (`ID`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
