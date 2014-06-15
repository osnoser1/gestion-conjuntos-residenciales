/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';
/* Controllers */

var myApp = angular.module('myApp');

myApp.controllerProvider.register('UsuarioDetalleCtrl', function($scope, $http, $q, $filter, $timeout, $rootScope, $location) {
    $scope.usuario = {};
    $http.post(url + 'usuario/detalle', $.param({datos: $rootScope.idUsuario}), {timeout: 5000, responseType: "json", headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
    ).success(function(data, status, headers, config) {
        console.log(data);
        if (typeof data !== 'object' || !data.respuesta) {
            $scope.error(data, status, headers, config);
        }
        $scope.usuario = data.datos;
        console.log($scope.usuario);
    }).error($scope.error);
});
