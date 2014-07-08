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
        ordenar: [
            {"Nombre": "ID"},
            {"Nombre": "Nombre"},
            {"Nombre": "Apellido"},
            {"Nombre": "Cedula"},
        ],
        parametro: "Nombre",
        query: {},
    };

    $scope.listarUsuarios = function() {
        console.log("Local");
        console.dir($scope.datos.usuarios);
        $http.get(url + 'usuario/listarConApartamento').success(function(data, status, headers, config) {
            console.dir("Salida2");
            console.dir(data.usuarios);
            $scope.datos.usuarios = data.usuarios;
        }).error($scope.error);
    };
    $scope.listarUsuarios();

    $scope.usuarioModificar = function(element) {
        $rootScope.usuarioModificado = element;
        $location.path("panel/usuario-modificar-usuario");

    };

    $scope.usuarioEliminar = function() {
        //console.log("Usuario a Eliminar");
        console.dir($scope.usuarioSeleccionado);
        $http.post(url + 'usuario/eliminar', $.param({datos: $scope.usuarioSeleccionado.ID}), {timeout: 5000, responseType: "json", headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
        ).success(function(data, status, headers, config) {
            console.log("data");
            console.dir(data);
            $('#myModal').modal('hide');
            show({message: {text: "Usuario eliminando exitosamente."}, type: 'success'});

        }).error($scope.error);
        $scope.idSeleccionado = "";
        $scope.datos.usuarios.remove($scope.usuarioSeleccionado);
    };

    $scope.showModalBorrar = function(elemento) {
        $scope.usuarioSeleccionado = elemento;
        $scope.showConfirmDialog({title: "Aviso", message: "¿Seguro que desea eliminar el usuario seleccionado?"}, $scope.usuarioEliminar);
    };

    $scope.usuariosVerDetalles = function(element) {
        console.log("Datos usuario: ");
        console.dir(element);
        $rootScope.idUsuario = element.ID;
        $scope.showConfirmDialog({title: "<b>ID Usuario: </b> \n" + element.ID, src: "'partials/usuario-modal-detalles.html'"}, $scope.VerDetalles);

    };
    $scope.VerDetalles = function(element) {
        $('#myModal').modal('hide');
    };


    $scope.obtenerApartamentos = function() {
        if (typeof $scope.datos.query.Piso === 'undefined') {
            var aux = $scope.datos.query.idEdificio;
            $scope.datos.query = {};
            $scope.datos.query.idEdificio = aux;
            return;
        }
    };


    $scope.obtenerPisos = function() {
        console.log($scope.datos.query.idEdificio - 1);
        if ($scope.datos.query.idEdificio - 1 == -1) {
            $scope.datos.query = {};
            return;
        }
        var cantidadPisos = $scope.datos.edificios[$scope.datos.query.idEdificio - 1].NroDePisos;
        $scope.datos.pisos = [];
        $scope.datos.pisos.push({});
        for (var i = 0; i < cantidadPisos; i++) {
            $scope.datos.pisos.push({
                Numero: i + 1
            });
        }
        $scope.datos.filtroEdificio = $scope.datos.query.idEdificio;
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

    $scope.ordenarlistado = function() {
        if ($scope.datos.orden === 'ID')
            $scope.predicate = parseInt($scope.datos.orden);
        else
            $scope.predicate = $scope.datos.orden;

    };

});
