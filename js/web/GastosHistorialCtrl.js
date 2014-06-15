/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';
/* Controllers */

var myApp = angular.module('myApp');

myApp.controllerProvider.register('GastosHistorialCtrl', function($scope, $http, $q, $filter, $timeout, $rootScope) {
    console.log('GastosHistorialCtrl');
    var temp;
    $rootScope.show = false;
    $scope.desactivado = false;
    $scope.tags = [];
    $scope.sitios = [];
    $scope.nuevo = {};
    $scope.datos = {gastos: []};
    $http.get(url + 'gasto/listar').success(function(data, status, headers, config) {
        console.log(data);
        if (!data.respuesta) {
            $scope.error(data, status, headers, config);
            return;
        }
        $rootScope.show = true;
        $scope.datos = data.datos;
    }).error($scope.error);
    $scope.select = function(i) {
        $scope.datos.gastos[i].select = !$scope.datos.gastos[i].select;
    };
    $scope.showDetalle = function(idGastoFecha) {
        $rootScope.idGastoFecha = idGastoFecha;
        $scope.showDialog({src: "'partials/gastos-detalle.html'"});
    };
    $scope.showModalBorrar = function() {
        $scope.showDialog({title: "Aviso", message: "¿Seguro que desea eliminar los gastos seleccionados?", backdrop: true}, $scope.deleteSelectedGastos);
//        $scope.deleteSelectedGastos();
    };
});
