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
        apartamentos: [],
    };
    $rootScope.datos2 = {

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
        $rootScope.ApartamentoModificado = element;
        $scope.AuxElement = element;
        //$rootScope.datos2.query.idEdificio = 1;
        $scope.showConfirmDialog({title: "Apartamento Modificar", src: "'partials/Apartamento-modal-modificar.html'"}, $scope.ActualizarApartamento);
    };
    $scope.ActualizarApartamento = function() {
        if(typeof $rootScope.datos2.query.idEdificio == "undefined" || typeof $rootScope.datos2.query.Piso == "undefined"){
            show({message: {text: "Indique edificio y/o piso"}, type: 'danger'});
            return;
        }
        $rootScope.ApartamentoModificado.Nombre = $rootScope.ApartamentoModificado.NombreApartamento;
        $rootScope.ApartamentoModificado.idEdificio = $rootScope.datos2.query.idEdificio;
        $rootScope.ApartamentoModificado.Piso = $rootScope.datos2.query.Piso;
        $http.post(url + 'apartamento/actualizar', $.param({Apartamento: $rootScope.ApartamentoModificado}), {timeout: 10000, responseType: "json", headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
        ).success(function(data, status, headers, config) {
            if (typeof data !== "object" || !data.respuesta) {
                $scope.error(data, status, headers, config);
            }
            $scope.AuxElement.NombreTipo = $rootScope.datos2.tipos[$rootScope.ApartamentoModificado.idTipo - 2].Nombre;
            $scope.AuxElement.NombreApartamento = $rootScope.ApartamentoModificado.Nombre;
            show({message: {text: data.aviso}, type: 'success'});
            $('#myModal').modal('hide');

        }).error($scope.error);
    };



    $scope.ListarApartamento = function() {

        if ($rootScope.activado === true) {
            $http.post(url + 'apartamento/listarFiltrado', $.param({idApartamento: $rootScope.datos.idApartamento, idEdificio: $rootScope.datos.idEdificio, Piso: $rootScope.datos.Piso}), {timeout: 10000, responseType: "json", headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
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

    $rootScope.obtenerPisos = function() {
        console.log($rootScope.datos2.query.idEdificio - 1);
        if ($rootScope.datos2.query.idEdificio - 1 == -1) {
            $rootScope.datos2.query = {};
            return;
        }
        var cantidadPisos = $rootScope.datos2.edificios[$rootScope.datos2.query.idEdificio - 1].NroDePisos;
        $rootScope.datos2.pisos = [];
        $rootScope.datos2.pisos.push({});
        for (var i = 0; i < cantidadPisos; i++) {
            $rootScope.datos2.pisos.push({
                Numero: i + 1
            });
        }
        $rootScope.datos2.filtroEdificio = $rootScope.datos2.query.idEdificio;
    };

    $scope.ListarEdificiosyApartamentos = function() {
        $http.get(url + 'edificio/listar').success(function(data, status, headers, config) {
            $rootScope.datos2.edificios = data.edificios;
        }).error($scope.error);

        $http.get(url + 'apartamento/listar').success(function(data, status, headers, config) {
            $rootScope.datos2.apartamentos = data.apartamentos;
        }).error($scope.error);

        $http.get(url + 'apartamentotipo/listar').success(function(data, status, headers, config) {
            $rootScope.datos2.tipos = data.tipos;
        }).error($scope.error);
    };
    $scope.ListarEdificiosyApartamentos();
});

