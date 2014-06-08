/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';
/* Controllers */
var myApp = angular.module('myApp');

myApp.controllerProvider.register('AgregarEdificioCtrl', function($scope, $http, $q, $filter, $timeout, $rootScope) {
    $scope.datos = {
        Edificios: [
		    {"id": "1", "Nombre": "TOPACIO", "CantidadPisos": "25"},
		    {"id": "2", "Nombre": "RUBI","CantidadPisos": "16"},
		    {"id": "3", "Nombre": "SHEILA", "CantidadPisos": "20"},
		    {"id": "4", "Nombre": "FRANCIS",  "CantidadPisos": "45"},
		    {"id": "5", "Nombre": "LILA", "CantidadPisos": "55"},
		],
    };
    $scope.a = function(elemento) {
        //mando mis datos a la bdd
        //muestra un msj 
        $('#myModal').modal('hide');
                                show({message: {text: "Edificio agregado exitosamente."}, type: 'success'});

    };
    $scope.agregarDatosE = function(elemento){
        $scope.edificio = elemento;
        console.log("Edificio Agregado");
        //muestra un msj 
        $('#myModal').modal('hide');
            show({message: {text: "Edificio agregado exitosamente."}, type: 'success'});
        

    };
});

