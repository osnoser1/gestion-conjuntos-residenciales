-- phpMyAdmin SQL Dump
-- version 4.1.4
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-06-2014 a las 00:07:31
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
  `edif` text COLLATE utf8_unicode_ci NOT NULL,
  `pisos` text COLLATE utf8_unicode_ci NOT NULL,
  `aptos` text COLLATE utf8_unicode_ci NOT NULL,
  `fecha` datetime NOT NULL,
  PRIMARY KEY (`idpost`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=11 ;

--
-- Volcado de datos para la tabla `post`
--

INSERT INTO `post` (`idpost`, `contenido`, `titulo`, `edif`, `pisos`, `aptos`, `fecha`) VALUES
(1, '<p>ya que tanto</p>', 'anuncio2', '', '', '', '2014-06-22 23:17:25'),
(2, '<p>no se si podre pasar desarrollo</p>', 'porque esta vida tan cruel', '', '', '', '2014-06-22 23:18:10'),
(3, '<p>ja &nbsp;bno que se hace</p>', 'mensajes repetidos', '', '', '', '2014-06-22 23:18:54'),
(4, '<p>sadsadas</p>', 'Novo mensaje', '', '', '', '2014-06-22 23:23:01'),
(5, '<p>sgun...</p>', 'otra noticia', '', '', '', '2014-06-22 23:30:01'),
(6, '<p>xczxczxczxczx</p>', 'nuevo anuncio', '', '', '', '2014-06-22 23:34:01'),
(7, 'este modulo esta interminable', 'hay muchos mensajes', '', '', '', '2014-06-22 23:38:19'),
(8, '<p>bueno y como espaguety</p>', 'otre mensaje mas sigo con hamb', '', '', '', '2014-06-22 23:39:58'),
(9, '<p>bueno habre solucionado</p>', 'mayonesa', '', '', '', '2014-06-22 23:41:12'),
(10, '<p>bueno no se nada</p>', 'nuevo mensaje', '', '', '', '2014-06-23 00:06:15');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
