'use strict';
/* Controllers */

var myApp = angular.module('myApp');

myApp.controllerProvider.register('UsuarioPerfilCtrl', function($scope, $http, $q, $filter, $timeout, $rootScope, $location) {
    console.log("UsuarioPerfilCtrl");
    $scope.usuario = {};



    $scope.mostrarDatos = function(data) {
        $http.post(url + 'usuario/detalle', $.param({datos: data}), {timeout: 5000, responseType: "json", headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
        ).success(function(data, status, headers, config) {
            console.log("Data: " + data);
            console.dir(data);
            if (typeof data !== 'object' || !data.respuesta) {
                $scope.error(data, status, headers, config);
            }
            $scope.usuario = data.datos;
            console.log($scope.usuario);
        }).error($scope.error);
    };

    $http.get(url + 'usuario/usuarioLogueado').success(function(data) {
        console.log(data);
        if (typeof data !== 'undefined') {
            $scope.mostrarDatos(data);
        }
    });
});