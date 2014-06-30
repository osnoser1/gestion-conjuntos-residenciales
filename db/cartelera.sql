-- phpMyAdmin SQL Dump
-- version 4.1.4
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-06-2014 a las 06:22:51
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
CREATE DATABASE IF NOT EXISTS `conjunto_residencial` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `conjunto_residencial`;
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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=50 ;

--
-- Volcado de datos para la tabla `post`
--

INSERT INTO `post` (`idpost`, `contenido`, `titulo`, `edif`, `pisos`, `aptos`, `fecha`) VALUES
(45, '<p>&nbsp;<span></span>Modulo cartelera, en donde el administrador puede publicar mensajes para lo cual debe rellenar e titulo y el contenido, dicho mensaje podra restringirlos, a distintos edificios, o de un edificio seleccionar los pisos que pueden ver un mensaje, y si se requiere de un piso se pueden seleccionar los edificios que quiera permitir ver dichos menasajes........&nbsp;</p>', 'Desarrollo de software', '', '', '', '2014-06-25 06:12:41'),
(44, '<p style="text-align: center;"><span style="color: rgb(34, 34, 34); font-size: 16px; line-height: 22.399999618530273px; text-align: left; font-family: Courier;">La mÃºsica es sinÃ³nimo de libertad, de tocar lo que quieras y como quieras, siempre que sea bueno y tenga pasiÃ³n, que la mÃºsica sea el alimento del amor.</span><br></p>', 'la musica', '', '', '', '2014-06-25 05:58:09'),
(49, '<p>xcÃ±xzmkÃ±.mbv</p><p>cvc</p><p>vcx</p><p>vcxvcxvcxvcxvcxvcxb</p><p>vbv</p><p>bxvb</p><p>xcv</p><p>cxvcxvcxvcxvcxbxvcbxv</p><p>zxbcxcxvcx</p><p>v</p><p>cxv</p><p>cx</p><p>bcxb</p>', 'Probando scrool', '', '', '', '2014-06-25 06:21:19');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
