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
        Apartamentos: [
            {idApartamento: "A4H", TipoApartamento: "Familiar", Tamano: "250 mt2", NumHabitaciones: "3", NumBanos: "2", Sala: "Si", Comedor: "Si", Cocina: "Si", Lavandero: "Si"},
            {idApartamento: "BpbW", TipoApartamento: "Estudio", Tamano: "150 mt2", NumHabitaciones: "1", NumBanos: "1", Sala: "Si", Comedor: "No", Cocina: "Si", Lavandero: "No"},
            {idApartamento: "C7A", TipoApartamento: "Thomw House", Tamano: "450 mt2", NumHabitaciones: "5", NumBanos: "4", Sala: "Si", Comedor: "Si", Cocina: "Si", Lavandero: "Si"},
            {idApartamento: "F2C", TipoApartamento: "Estudio", Tamano: "150 mt2", NumHabitaciones: "1", NumBanos: "1", Sala: "Si", Comedor: "No", Cocina: "Si", Lavandero: "No"},
            {idApartamento: "IpbJ", TipoApartamento: "Familiar", Tamano: "250 mt2", NumHabitaciones: "3", NumBanos: "2", Sala: "Si", Comedor: "Si", Cocina: "Si", Lavandero: "Si"},
        ],
    };
    $scope.ListarApartamento = function(element) {
        $rootScope.activado = true;
        $rootScope.datos = "0";
        $location.path("panel/listado-apartamentos");
    };
});

