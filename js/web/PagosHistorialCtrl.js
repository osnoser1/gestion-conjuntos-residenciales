/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';
/* Controllers */

var myApp = angular.module('myApp');
var b = {'true': 1, 'false': -1};

myApp.controllerProvider.register('PagosHistorialCtrl', function($scope, $http, $q, $filter, $timeout, $rootScope) {
    console.log('PagosHistorialCtrl');
    $rootScope.show = false;
    $scope.desactivado = true;
    $scope.orden = [{text: "Descendente", bool: true}, {text: "Ascendente", bool: false}];
    $scope.predicado = [{text: "Identificador", value: "idPagosUsuario"}, {text: "Precio", value: "Total"}, {text: "Fecha", value: "Fecha"}];
    $scope.datos = {pagos: []};
    $http.get(url + 'pagos/viewTodosPendientes').success(function(data, status, headers, config) {
        if (!data.respuesta) {
            $scope.error(data, status, headers, config);
            return;
        }
        console.log(data);
        $scope.datos = data.datos;
        $rootScope.show = true;
    }).error($scope.error);
    $scope.showDetalle = function(idPagosUsuario) {
        $rootScope.idPagosUsuario = idPagosUsuario;
        $scope.showDialog({src: "'partials/pagos-pendientes-detalle.html'"});
    };
    $scope.prueba = function(val) {
        console.log(val);
    };
});
