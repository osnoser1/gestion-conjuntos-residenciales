-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-06-2014 a las 03:59:05
-- Versión del servidor: 5.6.16
-- Versión de PHP: 5.5.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `gestion-conjuntos-residenciales`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagos`
--

DROP TABLE IF EXISTS `pagos`;
CREATE TABLE IF NOT EXISTS `pagos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idusuario` int(11) NOT NULL,
  `monto` int(11) NOT NULL,
  `idtipo` tinyint(11) NOT NULL,
  `nro_referencia` int(11) NOT NULL,
  `idbanco` smallint(11) NOT NULL,
  `fecha` date NOT NULL,
  `idEstado` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `idusuario` (`idusuario`),
  KEY `idtipo_de_pago` (`idtipo`),
  KEY `idbanco` (`idbanco`),
  KEY `idEstado` (`idEstado`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `pagos`
--

INSERT INTO `pagos` (`id`, `idusuario`, `monto`, `idtipo`, `nro_referencia`, `idbanco`, `fecha`, `idEstado`) VALUES
(1, 1, 920, 1, 987654321, 11, '2014-06-06', 2),
(2, 2, 765, 2, 12345789, 16, '2014-06-07', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagos_bancos`
--

DROP TABLE IF EXISTS `pagos_bancos`;
CREATE TABLE IF NOT EXISTS `pagos_bancos` (
  `id` smallint(11) NOT NULL AUTO_INCREMENT,
  `banco` varchar(60) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=37 ;

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

DROP TABLE IF EXISTS `pagos_estados`;
CREATE TABLE IF NOT EXISTS `pagos_estados` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `estado` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `pagos_estados`
--

INSERT INTO `pagos_estados` (`id`, `estado`) VALUES
(1, 'Pendiente'),
(2, 'Aprobado'),
(3, 'Rechazado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagos_tipos`
--

DROP TABLE IF EXISTS `pagos_tipos`;
CREATE TABLE IF NOT EXISTS `pagos_tipos` (
  `id` tinyint(11) NOT NULL AUTO_INCREMENT,
  `tipo` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `pagos_tipos`
--

INSERT INTO `pagos_tipos` (`id`, `tipo`) VALUES
(1, 'Depósito'),
(2, 'Transferencia');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

-- DROP TABLE IF EXISTS `usuario`;
CREATE TABLE IF NOT EXISTS `usuario` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `TipoUsuario` int(11) NOT NULL,
  `Nombre` varchar(30) NOT NULL,
  `Apellido` varchar(30) NOT NULL,
  `Cedula` varchar(8) NOT NULL,
  `Correo` varchar(40) NOT NULL,
  `Contraseña` varchar(60) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`TipoUsuario`, `Nombre`, `Apellido`, `Cedula`, `Correo`, `Contraseña`) VALUES
(1, 'Ricardo', 'Felicce', '20448909', 'exosymmetry@hotmail.com', '123'),
(1, 'Jenny', 'Gonzales', '9831876', 'exosymmetry@hotmail.com', '321');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `pagos`
--
ALTER TABLE `pagos`
  ADD CONSTRAINT `pagos_ibfk_4` FOREIGN KEY (`idEstado`) REFERENCES `pagos_estados` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `pagos_ibfk_1` FOREIGN KEY (`idtipo`) REFERENCES `pagos_tipos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `pagos_ibfk_2` FOREIGN KEY (`idbanco`) REFERENCES `pagos_bancos` (`id`),
  ADD CONSTRAINT `pagos_ibfk_3` FOREIGN KEY (`idusuario`) REFERENCES `usuario` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
