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
        pagos: [
		    {"id": "1", "nombre": "Ricardo","apellido": "Felicce",	"monto": "870",	"nro_referencia": "123456789", "tipo": "Depósito", "banco": "Banesco", "fecha": "08/06/2014", "estado": "Pendiente"},
		    {"id": "2", "nombre": "Jenny", 	"apellido": "Gonzales",	"monto": "300",	"nro_referencia": "234567890", "tipo": "Depósito", "banco": "Banesco", "fecha": "08/06/2014", "estado": "Pendiente"},
		    {"id": "3", "nombre": "Carlos", "apellido": "Salazar",	"monto": "980",	"nro_referencia": "345678912", "tipo": "Depósito", "banco": "Banesco", "fecha": "08/06/2014", "estado": "Pendiente"},
		    {"id": "4", "nombre": "Andrés", "apellido": "Freites",	"monto": "540",	"nro_referencia": "456789123", "tipo": "Depósito", "banco": "Banesco", "fecha": "08/06/2014", "estado": "Pendiente"},
		    {"id": "5", "nombre": "Luna", 	"apellido": "Lopez",	"monto": "230",	"nro_referencia": "567891234", "tipo": "Depósito", "banco": "Banesco", "fecha": "08/06/2014", "estado": "Pendiente"}
		],
    };
});