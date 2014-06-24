-- version 4.1.6
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generaciÃ³n: 15-06-2014 a las 09:11:36
-- VersiÃ³n del servidor: 5.6.16
-- VersiÃ³n de PHP: 5.5.9

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
-- Estructura de tabla para la tabla `apartamento`
--

DROP TABLE IF EXISTS `apartamento`;
CREATE TABLE IF NOT EXISTS `apartamento` (
  `idApartamento` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `Piso` int(11) NOT NULL,
  `idEdificio` int(11) NOT NULL,
  `idTipo` int(11) NOT NULL,
  PRIMARY KEY (`idApartamento`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=20 ;

--
-- Volcado de datos para la tabla `apartamento`
--

INSERT INTO `apartamento` (`idApartamento`, `Nombre`, `Piso`, `idEdificio`, `idTipo`) VALUES
(1, '1-A', 1, 1, 3),
(2, '1-B', 1, 2, 4),
(3, '2-A', 2, 1, 3),
(4, '2-B', 2, 2, 4),
(5, '3-A', 3, 1, 3),
(6, '3-B', 3, 2, 4),
(7, '4-A', 4, 1, 3),
(8, '4-B', 4, 2, 4),
(9, '5-A', 5, 1, 3),
(10, '5-B', 5, 2, 4),
(11, '6-A', 6, 1, 3),
(12, '6-B', 6, 2, 4),
(13, '7-A', 7, 1, 3),
(14, '7-B', 7, 2, 4),
(18, '8-A', 8, 1, 3),
(19, '8-B', 8, 2, 4);
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `apartamentotipo`
--

DROP TABLE IF EXISTS `apartamentotipo`;
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
  `Alicuota` float NOT NULL,
  PRIMARY KEY (`idApartamentoTipo`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=5 ;

--
-- Volcado de datos para la tabla `apartamentotipo`
--

INSERT INTO `apartamentotipo` (`idApartamentoTipo`, `Nombre`, `Tamano`, `numBanos`, `numHab`, `Sala`, `Cocina`, `Comedor`, `numEst`, `Maletero`, `Lavandero`, `Casillero`, `Alicuota`) VALUES
(2, 'Estudio', 60, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0.25),
(3, 'Familiar', 200, 2, 3, 1, 1, 1, 1, 1, 1, 1, 0.35),
(4, 'Penthouse', 300, 3, 4, 1, 1, 1, 2, 1, 1, 1, 0.4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `apartamento_usuario`
--

CREATE TABLE IF NOT EXISTS `apartamento_usuario` (
  `idusuarioapartamento` int(11) NOT NULL AUTO_INCREMENT,
  `idusuario` int(11) NOT NULL,
  `idapartamento` int(11) NOT NULL,
  PRIMARY KEY (`idusuarioapartamento`),
  UNIQUE KEY `idapartamento` (`idapartamento`),
  UNIQUE KEY `idusuario` (`idusuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `apartamento`
--
ALTER TABLE `apartamento`
  ADD CONSTRAINT `apartamento_ibfk_2` FOREIGN KEY (`idTipo`) REFERENCES `apartamentotipo` (`idApartamentoTipo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `apartamento_ibfk_1` FOREIGN KEY (`idEdificio`) REFERENCES `edificio` (`idEdificio`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `apartamento_usuario`
  ADD CONSTRAINT `fk_apartamento_usuario_apartamento` FOREIGN KEY (`idapartamento`) REFERENCES `apartamento` (`idApartamento`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `apartamento_usuario_ibfk_1` FOREIGN KEY (`idusuario`) REFERENCES `usuario` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
