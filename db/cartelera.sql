-- phpMyAdmin SQL Dump
-- version 4.1.4
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-06-2014 a las 23:05:58
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
-- Estructura de tabla para la tabla `post`
--

CREATE TABLE IF NOT EXISTS `post` (
  `idpost` int(7) NOT NULL AUTO_INCREMENT,
  `contenido` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `titulo` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `aptos` text COLLATE utf8_unicode_ci NOT NULL,
  `fecha` datetime NOT NULL,
  `usuario` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`idpost`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=120 ;

--
-- Volcado de datos para la tabla `post`
--

INSERT INTO `post` (`idpost`, `contenido`, `titulo`, `aptos`, `fecha`, `usuario`) VALUES
(76, '<p>sxvczxcvzx</p>', 'nuevo nbs', '', '2014-06-29 15:00:15', 'helyson'),
(77, '<p>ddfdsfds</p>', ' cvvcx', '', '2014-06-29 15:00:29', 'helyson'),
(78, '<p>ddfdsfds</p>', 'cxvcx', '', '2014-06-29 15:00:36', 'helyson'),
(79, '<p>ddfdsfds</p>', 'opikhjjgjej', '', '2014-06-29 15:00:43', 'helyson'),
(80, '<p>ddfdsfds</p>', 'kjljl', '', '2014-06-29 15:00:51', 'helyson'),
(81, '<p>zxczxccxczxc</p>', 'Puto recalculo de pagina', '', '2014-06-29 15:26:06', 'helyson'),
(82, '<p>cxczxcz</p>', 'error', 'a:0:{}', '2014-06-29 19:00:24', 'helyson'),
(91, '<p>fgdfgdfgdf</p>', 'gfgfd', 'a:8:{i:0;s:1:"2";i:1;s:1:"4";i:2;s:1:"6";i:3;s:1:"8";i:4;s:2:"10";i:5;s:2:"12";i:6;s:2:"14";i:7;s:2:"19";}', '2014-06-30 17:00:42', 'helyson'),
(92, '<p>fdfsdfsdfsdfsdfgdfgdfgdf</p>', 'nuevo mensaje', 'a:8:{i:0;s:1:"1";i:1;s:1:"3";i:2;s:1:"5";i:3;s:1:"7";i:4;s:1:"9";i:5;s:2:"11";i:6;s:2:"13";i:7;s:2:"18";}', '2014-06-30 17:01:02', 'helyson'),
(94, '<p>ffgfgfgfgfg</p>', 'gffgfg', 'a:8:{i:0;s:1:"1";i:1;s:1:"3";i:2;s:1:"5";i:3;s:1:"7";i:4;s:1:"9";i:5;s:2:"11";i:6;s:2:"13";i:7;s:2:"18";}', '2014-06-30 17:43:37', 'helyson'),
(89, '<p>q tal como estais</p><p><br></p>', 'hola', 'a:8:{i:0;s:1:"2";i:1;s:1:"4";i:2;s:1:"6";i:3;s:1:"8";i:4;s:2:"10";i:5;s:2:"12";i:6;s:2:"14";i:7;s:2:"19";}', '2014-06-30 16:39:16', 'helyson'),
(96, '<p>fghfghfghfg</p>', 'fghfg', 'a:8:{i:0;s:1:"2";i:1;s:1:"4";i:2;s:1:"6";i:3;s:1:"8";i:4;s:2:"10";i:5;s:2:"12";i:6;s:2:"14";i:7;s:2:"19";}', '2014-06-30 21:09:48', 'helyson'),
(97, '<p>fdsfsdffghfghfghfg</p>', 'Estas guardando', 'a:8:{i:0;s:1:"2";i:1;s:1:"4";i:2;s:1:"6";i:3;s:1:"8";i:4;s:2:"10";i:5;s:2:"12";i:6;s:2:"14";i:7;s:2:"19";}', '2014-06-30 21:14:39', 'helyson'),
(100, '<p>fsfsdfsd</p>', 'Probando', 'a:8:{i:0;s:1:"1";i:1;s:1:"3";i:2;s:1:"5";i:3;s:1:"7";i:4;s:1:"9";i:5;s:2:"11";i:6;s:2:"13";i:7;s:2:"18";}', '2014-06-30 21:47:59', 'helyson'),
(99, '<p>gfgfgdf</p>', 'rsyticcion', 'a:8:{i:0;s:1:"2";i:1;s:1:"4";i:2;s:1:"6";i:3;s:1:"8";i:4;s:2:"10";i:5;s:2:"12";i:6;s:2:"14";i:7;s:2:"19";}', '2014-06-30 21:33:11', 'helyson'),
(111, '<p>dfdsfsdfsdfsd</p>', 'Verificando q aun guarda en ed', 'a:8:{i:0;s:1:"1";i:1;s:1:"3";i:2;s:1:"5";i:3;s:1:"7";i:4;s:1:"9";i:5;s:2:"11";i:6;s:2:"13";i:7;s:2:"18";}', '2014-06-30 22:26:38', 'helyson'),
(112, '<p>dfdsfsdfsdfsd</p>', 'Sumernote', 'a:16:{i:0;s:1:"1";i:1;s:1:"3";i:2;s:1:"5";i:3;s:1:"7";i:4;s:1:"9";i:5;s:2:"11";i:6;s:2:"13";i:7;s:2:"18";i:8;s:1:"2";i:9;s:1:"4";i:10;s:1:"6";i:11;s:1:"8";i:12;s:2:"10";i:13;s:2:"12";i:14;s:2:"14";i:15;s:2:"19";}', '2014-06-30 22:29:37', 'helyson'),
(113, '<p>sdsdfsd</p>', 'dfsdf', 'a:8:{i:0;s:1:"2";i:1;s:1:"4";i:2;s:1:"6";i:3;s:1:"8";i:4;s:2:"10";i:5;s:2:"12";i:6;s:2:"14";i:7;s:2:"19";}', '2014-06-30 22:36:03', 'helyson'),
(114, '<p>sdsdfsd</p>', 'fsdfsdf', 'a:0:{}', '2014-06-30 22:36:31', 'helyson'),
(115, '<p>fsf</p>', 'fd', 'a:8:{i:0;s:1:"2";i:1;s:1:"4";i:2;s:1:"6";i:3;s:1:"8";i:4;s:2:"10";i:5;s:2:"12";i:6;s:2:"14";i:7;s:2:"19";}', '2014-06-30 22:41:25', 'helyson'),
(116, '<p>fsf</p>', 'gfgfg', 'a:0:{}', '2014-06-30 22:41:37', 'helyson'),
(117, '<p>sdaddasfggfg</p>', 'Por apto', 'Array', '2014-06-30 22:58:08', 'helyson'),
(118, '<p>sdaddasfggfg</p>', 'Por apto', 'a:1:{i:0;s:1:"1";}', '2014-06-30 23:00:08', 'helyson'),
(119, '<p>sdaddasfggfg</p>', 'hgfh', 'a:1:{i:0;s:1:"1";}', '2014-06-30 23:03:47', 'helyson');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
