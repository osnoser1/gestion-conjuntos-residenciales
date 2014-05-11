SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Estructura de tabla para la tabla `bancos`
--

CREATE TABLE IF NOT EXISTS `bancos` (
  `id` smallint(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=37 ;

--
-- Volcado de datos para la tabla `bancos`
--

INSERT INTO `bancos` (`id`, `nombre`) VALUES
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
-- Estructura de tabla para la tabla `consignaciones`
--

CREATE TABLE IF NOT EXISTS `consignaciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idusuario` int(11) NOT NULL,
  `monto` int(11) NOT NULL,
  `idtipo_de_pago` tinyint(11) NOT NULL,
  `nro_referencia` int(11) NOT NULL,
  `idbanco` smallint(11) NOT NULL,
  `fecha` date NOT NULL,
  `estado` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `idusuario` (`idusuario`),
  KEY `estado` (`estado`),
  KEY `idtipo_de_pago` (`idtipo_de_pago`),
  KEY `idbanco` (`idbanco`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipos_de_pago`
--

CREATE TABLE IF NOT EXISTS `tipos_de_pago` (
  `id` tinyint(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `tipos_de_pago`
--

INSERT INTO `tipos_de_pago` (`id`, `nombre`) VALUES
(1, 'Depósito'),
(2, 'Transferencia');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `consignaciones`
--
ALTER TABLE `consignaciones`
  ADD CONSTRAINT `consignaciones_ibfk_2` FOREIGN KEY (`idbanco`) REFERENCES `bancos` (`id`),
  ADD CONSTRAINT `consignaciones_ibfk_1` FOREIGN KEY (`idtipo_de_pago`) REFERENCES `tipos_de_pago` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
