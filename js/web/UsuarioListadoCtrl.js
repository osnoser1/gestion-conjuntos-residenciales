/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';
/* Controllers */

var myApp = angular.module('myApp');

myApp.controllerProvider.register('UsuarioListadoCtrl', function($scope, $http, $q, $filter, $timeout, $rootScope) {
    $scope.datos = {
        usuarios: [
            {"id": "1", "Nombre": "Ricardo", "Correo": "Felicce@gmail.com", "Edif": "topacio", "Apto": "1"},
            {"id": "2", "Nombre": "Jenny", "Correo": "Gonzales@gmail.com", "Edif": "perla", "Apto": "2"},
            {"id": "3", "Nombre": "Carlos", "Correo": "Salazar@gmail.com", "Edif": "perla", "Apto": "3"},
            {"id": "4", "Nombre": "Andrés", "Correo": "Freites@gmail.com", "Edif": "perla", "Apto": "4"},
            {"id": "5", "Nombre": "Luna", "Correo": "Lopez@gmail.com", "Edif": "topacio", "Apto": "4"}
        ],
    };


});
