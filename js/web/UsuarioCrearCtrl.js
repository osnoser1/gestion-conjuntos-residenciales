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
        telefonos: [],
        edificios: [],
        apartamentos: [],
        pisos: [],
        filtroPiso: 0,
        filtroEdificio: 0,
        error: false,
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
        $scope.datos.error = false;
        if(typeof $scope.datos.nuevoUsuario.idApartamento === 'undefined' && $scope.datos.nuevoUsuario.TipoUsuario != 2){
            $scope.datos.error = true;
            return;
        }
        $http.post(url + 'usuario/insertar', $.param({datos: usuario.nuevoUsuario, telefonos: $scope.datos.telefonos}), {timeout: 5000, responseType: "json", headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
        ).success(function(data, status, headers, config) {

            console.log("Data: ");
            console.log(data);
            show({message: {text: "Usuario agregado exitosamente."}, type: 'success'});
            usuario.nuevoUsuario = [];
        }).error($scope.error);
    };


    $scope.obtenerApartamentos = function(){
        if(typeof $scope.datos.nuevoUsuario.Piso === 'undefined'){
            $scope.datos.filtroPiso = 0;
            return;
        }
        $scope.datos.filtroPiso = $scope.datos.nuevoUsuario.Piso;
    };


    $scope.obtenerPisos = function(){
        var cantidadPisos = $scope.datos.edificios[$scope.datos.nuevoUsuario.idEdificio-1].NroDePisos;
        $scope.datos.pisos = [];
        $scope.datos.pisos.push({});
        for(var i =0; i < cantidadPisos; i++){
            $scope.datos.pisos.push({
                Numero: i+1
            });
        }
        $scope.datos.filtroEdificio = $scope.datos.nuevoUsuario.idEdificio;
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

});


