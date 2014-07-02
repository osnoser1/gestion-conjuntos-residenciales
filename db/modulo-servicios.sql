SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE DATABASE IF NOT EXISTS `conjunto_residencial` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `conjunto_residencial`;

-- -----------------------------------------------------
-- Table `tipoDeServicios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tipoDeServicios` (
  `idTipoDeServicios` INT NOT NULL AUTO_INCREMENT,
  `tipoDeServicio` VARCHAR(45) NULL,
  PRIMARY KEY (`idTipoDeServicios`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Servicios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Servicios` (
  `idServicios` INT NOT NULL AUTO_INCREMENT,
  `nombreServicio` VARCHAR(45) NULL,
  `idTipoDeServicio` INT NULL,
  PRIMARY KEY (`idServicios`),
  INDEX `idTipoDeServicio_idx` (`idTipoDeServicio` ASC),
  CONSTRAINT `idTipoDeServicio`
    FOREIGN KEY (`idTipoDeServicio`)
    REFERENCES `tipoDeServicios` (`idTipoDeServicios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `solicitudDeServicios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `solicitudDeServicios` (
  `idSolicitudDeServicios` INT NOT NULL AUTO_INCREMENT,
  `idServicios` INT NULL,
  `idUsuario` INT NULL,
  `fechaSolicitada` DATE NULL,
  PRIMARY KEY (`idSolicitudDeServicios`),
  INDEX `idServicios_idx` (`idServicios` ASC),
  CONSTRAINT `idServicios`
    FOREIGN KEY (`idServicios`)
    REFERENCES `Servicios` (`idServicios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `serviciosCostos`
-- -----------------------------------------------------
/*
CREATE TABLE IF NOT EXISTS `serviciosCostos` (
  `idServicios` INT NULL,
  `Costo` INT NULL,
  `idServiciosCostos` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`idServiciosCostos`),
  INDEX `idServicios_idx` (`idServicios` ASC),
  CONSTRAINT `idServicios`
    FOREIGN KEY (`idServicios`)
    REFERENCES `Servicios` (`idServicios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
*/
CREATE TABLE IF NOT EXISTS `servicioscostos` (
  `idServicios` int(11) DEFAULT NULL,
  `Costo` int(11) DEFAULT NULL,
  `idServiciosCostos` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`idServiciosCostos`),
  KEY `idServicios_idx` (`idServicios`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

ALTER TABLE `servicioscostos` ADD FOREIGN KEY (`idServicios`) REFERENCES `servicios`(`idServicios`) ON DELETE NO ACTION ON UPDATE NO ACTION;


-- -----------------------------------------------------
-- Table `tipoPagoDeServicio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tipoPagoDeServicio` (
  `idtipoPagoDeServicio` INT NOT NULL AUTO_INCREMENT,
  `tipoPagodeServicio` INT NULL,
  PRIMARY KEY (`idtipoPagoDeServicio`),
  CONSTRAINT `tipoPagodeServicio`
    FOREIGN KEY (`idtipoPagoDeServicio`)
    REFERENCES `serviciosPago` (`idServiciosPago`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `serviciosPago`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `serviciosPago` (
  `idServiciosPago` INT NOT NULL AUTO_INCREMENT,
  `idSolicitudDeServicio` INT NULL,
  `idtipoPagoDeServicio` INT NULL,
  PRIMARY KEY (`idServiciosPago`),
  INDEX `idSolicitudDeServicio_idx` (`idSolicitudDeServicio` ASC),
  INDEX `idtipoPagoServicio_idx` (`idtipoPagoDeServicio` ASC),
  CONSTRAINT `idSolicitudDeServicio`
    FOREIGN KEY (`idSolicitudDeServicio`)
    REFERENCES `solicitudDeServicios` (`idSolicitudDeServicios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `idtipoPagoServicio`
    FOREIGN KEY (`idtipoPagoDeServicio`)
    REFERENCES `tipoPagoDeServicio` (`idtipoPagoDeServicio`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
