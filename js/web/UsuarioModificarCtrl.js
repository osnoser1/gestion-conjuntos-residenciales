/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var myApp = angular.module('myApp');
myApp.controllerProvider.register('UsuarioModificarCtrl', function($scope, $http, $q, $filter, $timeout, $rootScope, $location) {
    $scope.datos = {
        query: {},
    };
    console.log($rootScope.usuarioModificado);

    $scope.usuarioModificar = function(element)
    {
        console.dir(element);
        $http.post(url + 'usuario/modificar', $.param({datos: element}), {timeout: 10000, responseType: "json", headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
        ).success(function(data, status, headers, config) {
            console.log("data");
            console.dir(data);
            $('#myModal').modal('hide');
            show({message: {text: "Usuario Modificado exitosamente."}, type: 'success'});
        }).error($scope.error);
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
            $http.get(url + 'apartamento/listar').success(function(data, status, headers, config) {
                $scope.datos.apartamentos = data.apartamentos;
                $scope.AsignarUbicacionUsuario();
            }).error($scope.error);
        }).error($scope.error);


    };
    $scope.ListarEdificiosyApartamentos();

    $scope.AsignarUbicacionUsuario = function() {
        $scope.datos.query.idEdificio = $rootScope.usuarioModificado.idEdificio;
        $scope.obtenerPisos();
        $scope.datos.query.Piso = $rootScope.usuarioModificado.Piso;
        $scope.obtenerApartamentos();
        $scope.datos.query.idApartamento = $rootScope.usuarioModificado.idApartamento;
    };


});