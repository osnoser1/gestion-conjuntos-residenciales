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
        pisos: [],
        filtroPiso: 0,
        filtroEdificio: 0,
    };

    $scope.obtenerApartamentos = function(){
        if(typeof $scope.Lista.Piso === 'undefined'){
            $scope.datos.filtroPiso = 0;
            return;
        }

        $scope.datos.filtroPiso = $scope.Lista.Piso;
    };


    $scope.obtenerPisos = function(){
        var cantidadPisos = $scope.datos.edificios[$scope.Lista.idEdificio-1].NroDePisos;
        $scope.datos.pisos = [];
        $scope.datos.pisos.push({});
        for(var i =0; i < cantidadPisos; i++){
            $scope.datos.pisos.push({
                Numero: i+1
            });
        }
        $scope.datos.filtroEdificio = $scope.Lista.idEdificio;
    };

    $scope.ListarEdificiosyApartamentos = function() {
        $http.get(url + 'edificio/listar').success(function(data, status, headers, config) {
            $scope.datos.edificios = data.edificios;
        }).error($scope.error);

        $http.get(url + 'apartamento/listar').success(function(data, status, headers, config) {
            $scope.datos.apartamentos = data.apartamentos;
        }).error($scope.error);
    };
    $scope.ListarEdificiosyApartamentos();


    $scope.ListarApartamento = function() {
        $rootScope.activado = true;
        $rootScope.datos = $scope.Lista;
        $location.path("panel/listado-apartamentos");
    };
    $scope.AgregarApartamento = function() {
        $rootScope.nuevoApartamento= {
            idEdificio: $scope.Lista.idEdificio,
            idEdificioNombre: $scope.datos.edificios[$scope.Lista.idEdificio-1].Nombre,
            Piso: $scope.datos.edificios[$scope.Lista.idEdificio-1].NroDePisos,
        };
        $location.path("panel/agregar-apartamento");
    };
});