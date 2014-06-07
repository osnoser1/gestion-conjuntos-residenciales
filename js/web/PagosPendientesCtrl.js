/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';
/* Controllers */
var myApp = angular.module('myApp');

myApp.controllerProvider.register('PagosPendientesCtrl', function($scope, $http, $q, $filter, $timeout, $rootScope) {
    console.log('PagosPendientesCtrl');
    $scope.datos = {
        pagos: [
		    {"id": "1", "nombre": "Ricardo","apellido": "Felicce",	"monto": "870",	"nro_referencia": "123456789", "tipo": "Depósito", "banco": "Banesco", "fecha": "08/06/2014", "estado": "Pendiente"},
		    {"id": "2", "nombre": "Jenny", 	"apellido": "Gonzales",	"monto": "300",	"nro_referencia": "234567890", "tipo": "Depósito", "banco": "Banesco", "fecha": "08/06/2014", "estado": "Pendiente"},
		    {"id": "3", "nombre": "Carlos", "apellido": "Salazar",	"monto": "980",	"nro_referencia": "345678912", "tipo": "Depósito", "banco": "Banesco", "fecha": "08/06/2014", "estado": "Pendiente"},
		    {"id": "4", "nombre": "Andrés", "apellido": "Freites",	"monto": "540",	"nro_referencia": "456789123", "tipo": "Depósito", "banco": "Banesco", "fecha": "08/06/2014", "estado": "Pendiente"},
		    {"id": "5", "nombre": "Luna", 	"apellido": "Lopez",	"monto": "230",	"nro_referencia": "567891234", "tipo": "Depósito", "banco": "Banesco", "fecha": "08/06/2014", "estado": "Pendiente"}
		],
    };


    $scope.aceptarPago = function(idConsignacion) {
    	$scope.loading = true;
    	console.log(idConsignacion);
    	//Editar en BD la consignacion id, y colocar estado en 1.
    };

    $scope.showModalRechazar = function() {
        $scope.showConfirmDialog({title: "Aviso", message: "¿Seguro que desea rechazar esta consignación?"}, $scope.rechazarPago);
    };

    $scope.pagosPendientesVerDetalles = function(element){
    	var message = '<div class="container"><form class="form-horizontal" role="form"><h4>'
    	+ '<div class="form-group">'
    		+ '<label class="col-lg-2 control-label">Propietario</label>'
    		+ '<div class="col-lg-10"><p class="form-control-static">' + element.nombre + ' ' + element.apellido + '</p></div>'
    	+ '</div>'

    	+ '<div class="form-group">'
    		+ '<label class="col-lg-2 control-label">Monto</label>'
    		+ '<div class="col-lg-10"><p class="form-control-static">' + element.monto + '</p></div>'
    	+ '</div>'
    	+ '<div class="form-group">'
    		+ '<label class="col-lg-2 control-label">Nro Referencia</label>'
    		+ '<div class="col-lg-10"><p class="form-control-static">' + element.nro_referencia + '</p></div>'
    	+ '</div>'
    	+ '<div class="form-group">'
    		+ '<label class="col-lg-2 control-label">Tipo de pago</label>'
    		+ '<div class="col-lg-10"><p class="form-control-static">' + element.tipo + '</p></div>'
    	+ '</div>'
    	+ '<div class="form-group">'
    		+ '<label class="col-lg-2 control-label">Banco</label>'
    		+ '<div class="col-lg-10"><p class="form-control-static">' + element.banco + '</p></div>'
    	+ '</div>'
    	+ '<div class="form-group">'
    		+ '<label class="col-lg-2 control-label">Fecha</label>'
    		+ '<div class="col-lg-10"><p class="form-control-static">' + element.fecha + '</p></div>'
    	+ '</div>'
    	+ '<div class="form-group">'
    		+ '<label class="col-lg-2 control-label">Estado</label>'
    		+ '<div class="col-lg-10"><p class="form-control-static">' + element.estado + '</p></div>'
    	+ '</div>'
		+ '</h4></form></div>';
    	$scope.showDialog({title: "<b>Detalles - Consignación #</b>" + element.id, message: message});
    };

	$scope.rechazarPago = function() {
		$scope.loading = true;
		//Editar en BD la consignacion id, y colocar estado en 2.
	};

});