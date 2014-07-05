/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var myApp = angular.module('myApp');

myApp.controllerProvider.register('UsuarioModificarPerfilCtrl', function($scope, $http, $q, $timeout, $rootScope, $location) {
    console.log("UsuarioModificarPerfilCtrl");
    $scope.datos = {
    };
    $scope.usuario = {};

    $scope.mostrarDatos = function(data) {
        $http.post(url + 'usuario/detalle', $.param({datos: data}), {timeout: 10000, responseType: "json", headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
        ).success(function(data, status, headers, config) {
            console.dir(data);
            if (typeof data !== 'object' || !data.respuesta) {
                $scope.error(data, status, headers, config);
            }
            $scope.usuario = data.datos;
            //console.log($scope.usuario);
        }).error($scope.error);
    };
    $scope.RellenarPagina = function() {
        $http.get(url + 'usuario/usuarioLogueado').success(function(data) {
            //console.log(data);
            if (typeof data !== 'undefined') {
                //console.log("logeado");
                $scope.mostrarDatos(data);
            }
        });
    };
    $scope.RellenarPagina();

    $scope.addTelefono = function(datos) {
        $scope.usuario.telefonos.push(datos.nuevoTelefono);
        datos.nuevoTelefono = {};
    };
    $scope.ModificarPerfil = function(usuario) {
        console.log(usuario);
        //return;
        $http.post(url + 'usuario/modificarPerfil', $.param({datos: usuario}), {timeout: 10000, responseType: "json", headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
        ).success(function(data, status, headers, config) {
            console.dir(data);
            if (typeof data === "object" && data.respuesta) {
                show({message: {text: "Perfil modificado exitosamente."}, type: 'success'});
            }
            else {
                $scope.error(data, status, headers, config);
                return;
            }
        }).error($scope.error);
        $scope.RellenarPagina();
    };
    $scope.showModalBorrarTelefono = function(elemento) {
        $scope.telefonoEliminar = elemento;
        $scope.showConfirmDialog({title: "Aviso", message: "¿Seguro que desea eliminar el teléfono seleccionado?"}, $scope.eliminarTelefono);
    };

    $scope.eliminarTelefono = function() {
        //console.log("Telefono a Eliminar");
        console.dir($scope.telefonoEliminar);
        $http.post(url + 'usuario/eliminarTelefono', $.param({datos: $scope.telefonoEliminar}), {timeout: 10000, responseType: "json", headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
        ).success(function(data, status, headers, config) {
            console.log("Data:");
            console.dir(data);
            if (typeof data === "object" && data.respuesta) {
                $('#myModal').modal('hide');
                show({message: {text: "Teléfono eliminando exitosamente."}, type: 'success'});
            }
            else {
                $scope.error(data, status, headers, config);
                return;
            }
        }).error($scope.error);
        $scope.usuario.telefonos.remove($scope.telefonoEliminar);
        $scope.telefonoEliminar = {};
    };
});