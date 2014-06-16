/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */'use strict';
/* Controllers */

var myApp = angular.module('myApp');

myApp.controllerProvider.register('UsuarioCrearCtrl', function($scope, $http, $q, $filter, $timeout, $rootScope, $location) {
    $scope.addTelefono = function(numeroTelefono) {
        $scope.datos.telefonos.push(numeroTelefono);
    };
    $scope.datos = {
        telefonos: []
        ,
    };
    $scope.cancelar = function() {
        //$scope.datos.nuevoUsuario = [];
        console.log("Cancelando");
    }
    $scope.addTelefono = function(datos) {
        $scope.datos.telefonos.push(datos.nuevoTelefono);
        datos.nuevoTelefono = {};
    };
    $scope.addUsuario = function(usuario) {
        console.log("Telefonos");
        console.dir($scope.datos.telefonos);
        $http.post(url + 'usuario/insertar', $.param({datos: usuario.nuevoUsuario, telefonos: $scope.datos.telefonos}), {timeout: 5000/*, responseType: "json"*/, headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
        ).success(function(data, status, headers, config) {

            console.log("Data: ");
            console.log(data);
            show({message: {text: "Usuario agregado exitosamente."}, type: 'success'});
        }).error($scope.error);
        /*
         $http.post(url + 'usuario/create', {Usuario: usuario.nuevoUsuario}).success(function(data, status, headers, config) {
         console.log(data);
         }).error(function(data, status) { // called asynchronously if an error occurs
         // or server returns response with an error status.
         $scope.showDialog({message: data});
         });
         $scope.showDialog({title: "Aviso", message: "Usuario Agregado Exitosamente"});
         usuario.nuevoUsuario = [];
         */
    };

});


