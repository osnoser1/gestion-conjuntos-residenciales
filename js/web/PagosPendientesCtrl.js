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
        consignaciones: [
		    {"idConsignacion": "1", "nombre": "Ricardo","apellido": "Felicce",	"monto": "870",	"nro_referencia": "123456789"	},
		    {"idConsignacion": "2", "nombre": "Jenny", 	"apellido": "Gonzales",	"monto": "300",	"nro_referencia": "234567890"	},
		    {"idConsignacion": "3", "nombre": "Carlos", "apellido": "Salazar",	"monto": "980",	"nro_referencia": "345678912"	},
		    {"idConsignacion": "4", "nombre": "Andrés", "apellido": "Freites",	"monto": "540",	"nro_referencia": "456789123"	},
		    {"idConsignacion": "5", "nombre": "Luna", 	"apellido": "Lopez",	"monto": "230",	"nro_referencia": "567891234"	}
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

	$scope.rechazarPago = function() {
		//Editar en BD la consignacion id, y colocar estado en 2.
	};

    $scope.copiarPortaPapeles = function(elemento){
    	console.log(elemento);
    };

});
