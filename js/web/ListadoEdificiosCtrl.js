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
//            {"id": "1", "Nombre": "TOPACIO", "CantidadPisos": "25"},
//            {"id": "2", "Nombre": "RUBI", "CantidadPisos": "16"},
//            {"id": "3", "Nombre": "SHEILA", "CantidadPisos": "20"},
//            {"id": "4", "Nombre": "FRANCIS", "CantidadPisos": "45"},
//            {"id": "5", "Nombre": "LILA", "CantidadPisos": "55"},
        ],
    };

    $scope.all = function(boolean) {
        angular.forEach($scope.datos.Edificios, function(key, value) {
            key.select = boolean;
        });
        $scope.desactivado = !boolean;
    };
    $scope.select = function(i) {
        $scope.datos.Edificios[i].select = !$scope.datos.Edificios[i].select;
    };

    $http.post(url + 'edificio/listar', {timeout: 5000, responseType: "json", headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
    ).success(function(data, status, headers, config) {
        console.log(data);
        if (typeof data !== "object" || !data.respuesta) {
            $scope.error(data, status, headers, config);
        }
        $scope.datos.Edificios = data.edificios;
    }).error($scope.error);
    $scope.a = function() {
        console.log($rootScope.edificio);
        $rootScope.myModalAccept = true;
        $http.post(url + 'edificio/update', $.param({datos: $rootScope.edificio}), {timeout: 10000, headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
        ).success(function(data, status, headers, config) {
            if (typeof data !== "object" || !data.respuesta) {
                $scope.error(data, status, headers, config);
                return;
            }
            var array = $filter('filter')($scope.datos.Edificios, {idEdificio: $rootScope.edificio.idEdificio}, true);
            console.log(array);
            if (array.length !== 0) {
                array[0].Nombre = $rootScope.edificio.Nombre;
                array[0].NroDePisos = $rootScope.edificio.NroDePisos;
            }
            $rootScope.myModalAccept = false;
            $('#myModal').modal('hide');
            show({message: {text: "Edificio modificado exitosamente."}, type: 'success'});
        }).error($scope.error);

    };
    $scope.select = function(i) {
        $scope.datos.edificio[i].select = !$scope.datos.edificio[i].select;
    }
    $scope.modificarDatosE = function(elemento) {
        $rootScope.edificio = {idEdificio: elemento.idEdificio, Nombre: elemento.Nombre, NroDePisos: elemento.NroDePisos};
        $scope.showConfirmDialog({title: "Editar Edificio", src: "'partials/modificar-edificio.html'"}, $scope.a);
    };

    $scope.seleccionarDatosEliminar = function() {

    };

    $scope.check = function() {
        var salida = false;
        angular.forEach($scope.datos.Edificios, function(key, value) {
            if (key.select && !salida) {
                $scope.desactivado = !key.select;
                salida = true;
            }
        });
        $scope.desactivado = !salida;
    };

    $scope.showModalBorrar = function() {
        $scope.showConfirmDialog({title: "Aviso", message: "¿Seguro que desea eliminar los edificios seleccionados?"}, $scope.deleteSelectedEdificios);
    };
    $scope.deleteSelectedEdificios = function() {
        var index = [];
        var ids = [];
        for (var i = 0; i < $scope.datos.Edificios.length; i++) {
            if (typeof $scope.datos.Edificios[i].select !== "boolean")
                continue;
            if ($scope.datos.Edificios[i].select) {
                index.push($scope.datos.Edificios[i]);
                ids.push($scope.datos.Edificios[i].idEdificio);
            }
        }
        console.log('------------');
        $rootScope.myModalAccept = true;
        console.log(ids);
        $http.post(url + 'edificio/eliminar', $.param({datos: ids}), {timeout: 5000, headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
        ).success(function(data, status, headers, config) {
            if (typeof data !== "object" || !data.respuesta) {
                $scope.error(data, status, headers, config);
                return;
            }
            console.log(data);
            angular.forEach(index, function(key, value) {
                $scope.total -= parseInt(key.Precio);
                $scope.datos.Edificios.remove(key);
            });
            $rootScope.myModalAccept = false;
            $('#myModal').modal('hide');
            show({message: {text: "Edificios eliminados exitosamente."}, type: 'success'});
        }).error($scope.error);
    };
    $scope.mostrarDetallesE = function(element) {
        $rootScope.idEdificio = element.idEdificio;
        $scope.showDialog({src: "'partials/edificio-detalle.html'"});

    };
});

