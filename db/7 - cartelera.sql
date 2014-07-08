-- phpMyAdmin SQL Dump
-- version 4.0.4.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-07-2014 a las 21:09:02
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
  `aptos` text COLLATE utf8_unicode_ci NOT NULL,
  `fecha` datetime NOT NULL,
  `usuario` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `Apellido` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`idpost`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=16 ;

--
-- Volcado de datos para la tabla `post`
--

INSERT INTO `post` (`idpost`, `contenido`, `titulo`, `aptos`, `fecha`, `usuario`, `Apellido`) VALUES
(5, '<p>Mensaje para el edificio las FLORES</p>', 'Las personas q pertenecen a la', 'a:16:{i:0;s:1:"1";i:1;s:1:"3";i:2;s:1:"5";i:3;s:1:"7";i:4;s:1:"9";i:5;s:2:"11";i:6;s:2:"13";i:7;s:2:"18";i:8;s:1:"2";i:9;s:1:"4";i:10;s:1:"6";i:11;s:1:"8";i:12;s:2:"10";i:13;s:2:"12";i:14;s:2:"14";i:15;s:2:"19";}', '2014-07-05 19:19:40', 'helyson', 'perdomo'),
(4, '<p>Por todas las personas perteneciente al conjunto residencial</p>', 'Esta publicacion puede ser vis', 'a:16:{i:0;s:1:"1";i:1;s:1:"3";i:2;s:1:"5";i:3;s:1:"7";i:4;s:1:"9";i:5;s:2:"11";i:6;s:2:"13";i:7;s:2:"18";i:8;s:1:"2";i:9;s:1:"4";i:10;s:1:"6";i:11;s:1:"8";i:12;s:2:"10";i:13;s:2:"12";i:14;s:2:"14";i:15;s:2:"19";}', '2014-07-05 19:18:32', 'helyson', 'perdomo'),
(8, 'Piso 1<div>Edificio las Flores</div>', 'Por piso', 'a:8:{i:0;s:1:"2";i:1;s:1:"4";i:2;s:1:"6";i:3;s:1:"8";i:4;s:2:"10";i:5;s:2:"12";i:6;s:2:"14";i:7;s:2:"19";}', '2014-07-05 19:25:04', 'helyson', 'perdomo'),
(9, '<p>Piso 2, 4,6</p><p>Edificio Palmas</p>', 'Por Piso', 'a:3:{i:1;s:1:"3";i:2;s:1:"7";i:3;s:2:"11";}', '2014-07-05 19:27:47', 'helyson', 'perdomo'),
(10, '<p>Piso 1,3,5</p><p>Edificio Flores</p>', 'Por piso FLores', 'a:3:{i:1;s:1:"2";i:2;s:1:"6";i:3;s:2:"10";}', '2014-07-05 19:29:12', 'helyson', 'perdomo'),
(12, '<p>Piso 1</p><p>Edificio Flores</p><p>Apto 1B</p>', 'Por aptopiso', '', '2014-07-05 19:30:30', 'helyson', 'perdomo'),
(15, 'Edificio Palmas<div>Aptos 2A, 5A, 8A</div>', 'PoraptoTodos los pisos', 'a:3:{i:0;s:1:"3";i:1;s:1:"9";i:2;s:2:"18";}', '2014-07-05 19:33:43', 'helyson', 'perdomo'),
(14, '<p>Piso 1</p><p>Edificio Flores</p><p>Apto 1B</p>', 'Por aptopiso', 'a:1:{i:0;s:1:"2";}', '2014-07-05 19:32:13', 'helyson', 'perdomo');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
