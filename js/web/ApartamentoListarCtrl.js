/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';
/* Controllers */
var myApp = angular.module('myApp');

myApp.controllerProvider.register('ApartamentoListarCtrl', function($scope, $http, $q, $filter, $timeout, $rootScope) {
    console.log('ApartamentoListarCtrl');
    $scope.datos = {
        edificios: [],
        apartamentos: [],
        pisos: [],
        tipos: [],
        query: {},
    };


    $scope.apartamentoVerDetalles = function(element) {
        $rootScope.ApartamentoListado = element;
        $scope.showDialog({title: "Apartamento detalles", src: "'partials/apartamento-modal-listado-detalles.html'"});
    };

    $scope.EditarApartamento = function(element) {
        $scope.ApartamentoModificado = element;
        $scope.ApartamentoModificado.Nombre = "faf";
        $scope.showConfirmDialog({title: "Apartamento Modificar", src: "'partials/Apartamento-modal-modificar.html'"}, $scope.ActualizarApartamento);

    };
    $scope.ActualizarApartamento = function() {
        console.log("console");
    };



    $scope.ListarApartamento = function() {

        if ($rootScope.activado === true) {
            $http.post(url + 'apartamento/listarFiltrado', $.param({idApartamento: $rootScope.datos.idApartamento, idEdificio: $rootScope.datos.idEdificio, Piso: $rootScope.datos.Piso}), {timeout: 5000, responseType: "json", headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
            ).success(function(data, status, headers, config) {
                if (typeof data !== "object" || !data.respuesta) {
                    $scope.error(data, status, headers, config);
                }
                $scope.datos.apartamentos = data.apartamentos;
            }).error($scope.error);
        }
        else {
            $http.get(url + 'apartamento/listarFiltrado').success(function(data, status, headers, config) {
                console.dir("respuesta apartamento");
                console.dir(data.apartamentos);
                $scope.datos.apartamentos = data.apartamentos;
            }).error($scope.error);

        }
    };
    $scope.ListarApartamento();
});

