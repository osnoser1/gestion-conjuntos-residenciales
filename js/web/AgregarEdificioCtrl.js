/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';
/* Controllers */
var myApp = angular.module('myApp');

myApp.controllerProvider.register('AgregarEdificioCtrl', function($scope, $http, $q, $filter, $timeout, $rootScope, $location) {
    $scope.datos = {
        Edificios: [
            {"id": "1", "Nombre": "TOPACIO", "CantidadPisos": "25"},
            {"id": "2", "Nombre": "RUBI", "CantidadPisos": "16"},
            {"id": "3", "Nombre": "SHEILA", "CantidadPisos": "20"},
            {"id": "4", "Nombre": "FRANCIS", "CantidadPisos": "45"},
            {"id": "5", "Nombre": "LILA", "CantidadPisos": "55"},
        ],
    };
    $scope.agregarDatosE = function(elemento) {
//        $scope.edificio = elemento;
        $http.post(url + 'edificio/agregar', $.param({datos: elemento}), {timeout: 10000, headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
        ).success(function(data, status, headers, config) {
            console.log(data);
            if (typeof data !== "object" || !data.respuesta) {
                $scope.error(data, status, headers, config);
            }
            $('#myModal').modal('hide');
            show({message: {text: "Edificio agregado exitosamente."}, type: 'success'});
            $location.path('/panel/listado-edificios');
        }).error($scope.error);
    };
});

