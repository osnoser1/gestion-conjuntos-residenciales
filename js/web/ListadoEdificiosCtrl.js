/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';
/* Controllers */
var myApp = angular.module('myApp');

myApp.controllerProvider.register('ListadoEdificiosCtrl', function($scope, $http, $q, $filter, $timeout, $rootScope) {
    $scope.datos = {
        Edificios: [
		    {"id": "1", "Nombre": "TOPACIO", "CantidadPisos": "25"},
		    {"id": "2", "Nombre": "RUBI","CantidadPisos": "16"},
		    {"id": "3", "Nombre": "SHEILA", "CantidadPisos": "20"},
		    {"id": "4", "Nombre": "FRANCIS",  "CantidadPisos": "45"},
		    {"id": "5", "Nombre": "LILA", "CantidadPisos": "55"},
		],
    };
    $scope.a = function() {
        
    };
    $scope.modificarDatosE = function(elemento){
        $scope.edificio = elemento;
        console.log("Hola mundo");
                $scope.showConfirmDialog({title: "Editar Edificio", message: '<form>Nombre: <input Type="text" name="nombre" value="" ng-model="edificio.Nombre"/> <br><br>Cantidad De Pisos: <input Type="text" name="piso" value="" ng-model="edificio.CantidadPisos"/><br><br></form>'}, $scope.a);

    };
});

