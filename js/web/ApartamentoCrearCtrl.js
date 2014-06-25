/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';
/* Controllers */
var myApp = angular.module('myApp');

myApp.controllerProvider.register('ApartamentoCrearCtrl', function($scope, $http, $q, $filter, $timeout, $rootScope) {

    $scope.nuevo = {};
    $scope.datos = {
        edificios: [],
        apartamentos: [],
        pisos: [],
        tipos: [
            {value: 1, name: 'Estudio'},
        ],
    };

    $scope.obtenerPisos = function(){
        var cantidadPisos = $scope.datos.edificios[$scope.nuevo.idEdificio-1].NroDePisos;
        $scope.datos.pisos = [];
        $scope.datos.pisos.push({});
        for(var i =0; i < cantidadPisos; i++){
            $scope.datos.pisos.push({
                Numero: i+1
            });
        }
        $scope.datos.filtroEdificio = $scope.nuevo.idEdificio;
    };

    $scope.GuardarApartamento = function(nuevo) {
        $http.post(url + 'apartamento/insertar', $.param({datos: nuevo}), {timeout: 5000, responseType: "json", headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
        ).success(function(data, status, headers, config) {
            show({message: {text: "Apartamento Ingresado Exitosamente"}, type: 'success'});
        }).error($scope.error);
    };

    $scope.MostrarNuevoApartamento = function(){
        $http.get(url + 'edificio/listar').success(function(data, status, headers, config) {
            $scope.datos.edificios = data.edificios;
        }).error($scope.error);

        $http.get(url + 'apartamentotipo/listar').success(function(data, status, headers, config) {
            $scope.datos.tipos = data.tipos;
        }).error($scope.error);
    };
    $scope.MostrarNuevoApartamento();
});

