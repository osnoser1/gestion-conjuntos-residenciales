/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';
/* Controllers */
var myApp = angular.module('myApp');

myApp.controllerProvider.register('PagosHistorialCtrl', function($scope, $http, $q, $filter, $timeout, $rootScope) {
    $scope.datos = {
        pagos: [],
    };

    $scope.listarHistorial = function(){

    	var permiso = 0;
    	var idusuario = "1";
        $.ajax
        ({
            type: "POST",
            url: "models/pagos-consultas.php",
            data: {id: 2, permiso: permiso, idusuario: idusuario},
            async: false,
            dataType: "json",
            success:
            function(msg)
            {
                for (var i = 0; i < msg.length; i++)
                {
                	
                	msg[i].fecha = $filter('date')(msg[i].fecha, 'dd/MM/yyyy');
                    $scope.datos.pagos.push(msg[i]);
                }
            },
            error:
            function(msg) {
            	console.log("error");
                console.dir(msg);
            }
        });
    };
    $scope.listarHistorial();

    $scope.historialVerDetalles = function(element){
    	var message = '<div class="container"><form class="form-horizontal" role="form"><h4>'
    	+ '<div class="form-group">'
    		+ '<label class="col-lg-2 control-label">Propietario</label>'
    		+ '<div class="col-lg-10"><p class="form-control-static">' + element.Nombre + ' ' + element.Apellido + '</p></div>'
    	+ '</div>'

        + '<div class="form-group">'
            + '<label class="col-lg-2 control-label">Concepto</label>'
            + '<div class="col-lg-10"><p class="form-control-static">' + element.concepto + '</p></div>'
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
});