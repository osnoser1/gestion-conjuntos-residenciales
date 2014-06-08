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
            {"id": "2", "Nombre": "RUBI", "CantidadPisos": "16"},
            {"id": "3", "Nombre": "SHEILA", "CantidadPisos": "20"},
            {"id": "4", "Nombre": "FRANCIS", "CantidadPisos": "45"},
            {"id": "5", "Nombre": "LILA", "CantidadPisos": "55"},
        ],
    };
    $scope.a = function() {
        console.log($rootScope.edificio);
        var array = $filter('filter')($scope.datos.Edificios, {id: $rootScope.edificio.id}, true);
        console.log(array);
        if(array.length !== 0) {
            array[0].Nombre = $rootScope.edificio.Nombre;
            array[0].CantidadPisos = $rootScope.edificio.CantidadPisos;
        }
                    $('#myModal').modal('hide');
                                show({message: {text: "Edificio modificado exitosamente."}, type: 'success'});

    };
    $scope.modificarDatosE = function(elemento) {
        $rootScope.edificio = {id:elemento.id,Nombre:elemento.Nombre, CantidadPisos:elemento.CantidadPisos};
        console.log("Hola mundo");
        $scope.showConfirmDialog({title: "Editar Edificio", src: "'partials/modificar-edificio.html'"}, $scope.a);
    };
});

