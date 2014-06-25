/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';
/* Controllers */
var myApp = angular.module('myApp');

myApp.controllerProvider.register('EdificioDetalleCtrl', function($scope, $http, $q, $filter, $timeout, $rootScope) {
    $http.post(url + 'edificio/detalle', $.param({datos: $rootScope.idEdificio}), {timeout: 10000, headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
    ).success(function(data, status, headers, config) {
        if (typeof data !== "object" || !data.respuesta) {
            $scope.error(data, status, headers, config);
        }
        console.log(data);
        $scope.edificio = data.edificio;
    }).error($scope.error);
});

