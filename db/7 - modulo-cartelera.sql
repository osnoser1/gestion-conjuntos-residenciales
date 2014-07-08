-- phpMyAdmin SQL Dump
-- version 4.0.4.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-07-2014 a las 09:26:49
-- Versión del servidor: 5.6.11
-- Versión de PHP: 5.5.3

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
-- Estructura de tabla para la tabla `post`
--

CREATE TABLE IF NOT EXISTS `post` (
  `idpost` int(7) NOT NULL AUTO_INCREMENT,
  `contenido` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `titulo` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `aptos` text COLLATE utf8_unicode_ci NOT NULL,
  `fecha` datetime NOT NULL,
  `usuario` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `Apellido` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`idpost`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=8 ;

--
-- Volcado de datos para la tabla `post`
--

INSERT INTO `post` (`idpost`, `contenido`, `titulo`, `aptos`, `fecha`, `usuario`, `Apellido`) VALUES
(2, '<p>Mensaje Para los Edificios</p><p>Palma y Flores</p>', 'Para Edificios', 'a:16:{i:0;s:1:"1";i:1;s:1:"3";i:2;s:1:"5";i:3;s:1:"7";i:4;s:1:"9";i:5;s:2:"11";i:6;s:2:"13";i:7;s:2:"18";i:8;s:1:"2";i:9;s:1:"4";i:10;s:1:"6";i:11;s:1:"8";i:12;s:2:"10";i:13;s:2:"12";i:14;s:2:"14";i:15;s:2:"19";}', '2014-07-08 09:12:09', 'admin', 'admin'),
(4, '<p>Contenido del mensaje</p>', 'Para la palma', 'a:8:{i:0;s:1:"1";i:1;s:1:"3";i:2;s:1:"5";i:3;s:1:"7";i:4;s:1:"9";i:5;s:2:"11";i:6;s:2:"13";i:7;s:2:"18";}', '2014-07-08 09:18:25', 'admin', 'admin'),
(5, 'Contenido Mensaje', 'Para las Flores', 'a:8:{i:0;s:1:"2";i:1;s:1:"4";i:2;s:1:"6";i:3;s:1:"8";i:4;s:2:"10";i:5;s:2:"12";i:6;s:2:"14";i:7;s:2:"19";}', '2014-07-08 09:19:00', 'admin', 'admin'),
(6, 'Para el Piso 1,3,5,7<div>Edificio Palmas</div>', 'Pisos', 'a:4:{i:1;s:1:"1";i:2;s:1:"5";i:3;s:1:"9";i:4;s:2:"13";}', '2014-07-08 02:49:33', 'admin', 'admin'),
(7, 'Mensajes Piso 2 4 6 8', 'Piso', 'a:4:{i:1;s:1:"4";i:2;s:1:"8";i:3;s:2:"12";i:4;s:2:"19";}', '2014-07-08 02:49:59', 'admin', 'admin');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
