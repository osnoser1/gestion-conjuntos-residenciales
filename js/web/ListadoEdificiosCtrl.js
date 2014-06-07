/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';
/* Controllers */
var myApp = angular.module('myApp');

myApp.controllerProvider.register('ListadoEdificiosCtrl', function($scope, $http, $q, $filter, $timeout, $rootScope) {
    $scope.datos = {
        Edificios: [
		    {"id": "1", "Nombre": "Luna Nueva", "CantidadPisos": "5"},
		    {"id": "2", "Nombre": "Acuarela","CantidadPisos": "5"},
		    {"id": "3", "Nombre": "Rosa Nautica", "CantidadPisos": "5"},
		    {"id": "4", "Nombre": "Orquidea",  "CantidadPisos": "5"},
		    {"id": "5", "Nombre": "Margarita", "CantidadPisos": "5"},
		],
    };
});

