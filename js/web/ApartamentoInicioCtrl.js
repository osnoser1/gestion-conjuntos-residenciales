/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';
var myApp = angular.module('myApp');

myApp.controllerProvider.register('ApartamentoInicioCtrl', function($scope, $http, $q, $filter, $timeout, $rootScope, $location) {
    $scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.today();
    $scope.clear = function() {
        $scope.dt = null;
    };
    $scope.datos = {
        edificios: [],
        apartamentos: [],
    };

    $scope.ListarEdificiosyApartamentos = function() {
        $http.get(url + 'edificio/listar').success(function(data, status, headers, config) {
            console.dir("Salida");
            console.dir(data);
            $scope.datos.edificios = data.edificios;
        }).error($scope.error);

        $http.get(url + 'apartamento/listar').success(function(data, status, headers, config) {
            console.dir("Salida2");
            console.dir(data);
            $scope.datos.apartamentos = data.apartamentos;
        }).error($scope.error);
    };
    $scope.ListarEdificiosyApartamentos();

    $scope.ListarApartamento = function(element) {
        $rootScope.activado = true;
        $rootScope.datos = "0";
        $location.path("panel/listado-apartamentos");
    };
    $scope.AgregarApartamento = function(element) {
        $rootScope.activado = true;
        $rootScope.datos = "0";
        $location.path("panel/agregar-apartamento");
    };
});

