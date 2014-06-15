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
        format: 'dd/MM/yyyy',
        tipo: [
            {value: 1, name: 'Estudio'},
            {value: 2, name: 'Familiar'},
            {value: 3, name: 'Town House'},
        ],
        tamano: [
            {value: 1},
            {value: 2},
            {value: 3},
        ],
        numhabitaciones: [
            {value: 1, name: '1'},
            {value: 2, name: '2'},
            {value: 3, name: '3'},
        ],
        numbanos: [
            {value: 1, name: '1'},
            {value: 2, name: '2'},
            {value: 3, name: '3'},
        ],
        sala: [
            {value: 1, name: 'Si'},
            {value: 2, name: 'No'},
        ],
        cocina: [
            {value: 1, name: 'Si'},
            {value: 2, name: 'No'},
        ],
        comedor: [
            {value: 1, name: 'Si'},
            {value: 2, name: 'No'},
        ],
        lavadero: [
            {value: 1, name: 'Si'},
            {value: 2, name: 'No'},
        ],
        maletero: [
            {value: 1, name: 'Si'},
            {value: 2, name: 'No'},
        ],
        casillero: [
            {value: 1, name: 'Si'},
            {value: 2, name: 'No'},
        ],
        numestacion: [
            {value: 1, name: '1'},
            {value: 2, name: '2'},
        ],
        alicuota: [
            {value: 1, name: 'Mucho'},
            {value: 2, name: 'Poco'},
        ],
    };

    $scope.GuardarApartamento = function(nuevo) {
        console.dir($scope.nuevo);
        $http.post(url + 'apartamento/insertar', $.param({datos: nuevo}), {timeout: 5000/*, responseType: "json"*/, headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
        ).success(function(data, status, headers, config) {
            console.log(data);
            show({message: {text: "Apartamento Ingresado Exitosamente"}, type: 'success'});
        }).error($scope.error);
    };
});

