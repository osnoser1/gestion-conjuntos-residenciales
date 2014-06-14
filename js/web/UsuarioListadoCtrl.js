/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

 'use strict';
 /* Controllers */

 var myApp = angular.module('myApp');

 myApp.controllerProvider.register('UsuarioListadoCtrl', function($scope, $http, $q, $filter, $timeout, $rootScope, $location) {
    $scope.datos = {
        usuarios: [],
    };

    $scope.listarUsuarios = function(){
        console.log("Local");
        console.dir($scope.datos.usuarios);
        $http.get(url + 'usuario/listar').success(function(data, status, headers, config) {
            console.dir("Salida");
            console.dir(data);
            $scope.datos.usuarios = data;
        }).error($scope.error);
    };
    $scope.listarUsuarios();

    $scope.usuarioModificar=function(element){
    	console.log("holaaaaa");
    	$location.path("panel/usuario-modificar-usuario");
    };

    $scope.usuarioEliminar=function(){
        console.log("Usuario a Eliminar");
        console.dir($scope.usuarioSeleccionado);
        $http.post(url + 'usuario/eliminar', $.param({datos: $scope.usuarioSeleccionado.ID}), {timeout: 5000, responseType: "json", headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
        ).success(function(data, status, headers, config) {
            console.log("data");
            console.dir(data);
            $('#myModal').modal('hide');
            show({message: {text: "Usuario eliminando exitosamente."}, type: 'success'});
        }).error($scope.error);
        $scope.idSeleccionado = "";
    };

    $scope.showModalBorrar = function(elemento) {
        $scope.usuarioSeleccionado = elemento;
        $scope.showConfirmDialog({title: "Aviso", message: "¿Seguro que desea eliminar el usuario seleccionado?"}, $scope.usuarioEliminar);
    };

});
