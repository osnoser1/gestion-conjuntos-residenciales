/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */'use strict';
/* Controllers */

var myApp = angular.module('myApp');

myApp.controllerProvider.register('UsuarioCrearCtrl', function($scope, $http, $q, $filter, $timeout, $rootScope) {
    $scope.addTelefono = function(numeroTelefono) {
        $scope.datos.telefonos.push(numeroTelefono);
    };
    $scope.datos = {
        telefonos: [
        ],
    };
    $scope.addTelefono = function(datos) {
        $scope.datos.telefonos.push(datos.nuevoTelefono);
        datos.nuevoTelefono = [];
    };
    $scope.addUsuario = function(usuario) {

        $http.post(url + 'usuario/create', {Usuario: usuario.nuevoUsuario}).success(function(data, status, headers, config) {
            console.log(data);
        }).error(function(data, status) { // called asynchronously if an error occurs
            // or server returns response with an error status.
            $scope.showDialog({message: data});
        });
        $scope.showDialog({title: "Aviso", message: "Usuario Agregado Exitosamente"});
        usuario.nuevoUsuario = [];
    };

});


