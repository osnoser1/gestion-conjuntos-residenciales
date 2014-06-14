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
        var array = $filter('filter')($scope.datos.Edificios, {id: $rootScope.edificio.id}, true);
        console.log(array);
        if (array.length !== 0) {
            array[0].Nombre = $rootScope.edificio.Nombre;
            array[0].CantidadPisos = $rootScope.edificio.CantidadPisos;
        }
        $http.post(url + 'edificio/listado', {datos: gasto}
        ).success(function(data, status, headers, config) {
            console.log(data);
        }).error(function(data, status) { // called asynchronously if an error occurs
            // or server returns response with an error status.
            $scope.showDialog({message: data});
        });
        $('#myModal').modal('hide');
        show({message: {text: "Edificio modificado exitosamente."}, type: 'success'});

    };
    $scope.select = function(i) {
        $scope.datos.edificio[i].select = !$scope.datos.edificio[i].select;
    }
    $scope.modificarDatosE = function(elemento) {
        $rootScope.edificio = {id: elemento.id, Nombre: elemento.Nombre, CantidadPisos: elemento.CantidadPisos};
        $scope.showConfirmDialog({title: "Editar Edificio", src: "'partials/modificar-edificio.html'"}, $scope.a);
    };
    
    $scope.seleccionarDatosEliminar=function(){
        
    };
    
    $scope.deleteSelectedEdificios = function() {
        var index = [];
        var ids = [];
        for (var i = 0; i < $scope.datos.length; i++) {
            if (typeof $scope.datos.gastos[i].select !== "boolean")
                continue;
            if ($scope.datos.gastos[i].select) {
                index.push($scope.datos.gastos[i]);
                ids.push($scope.datos.gastos[i].idGastoHistorial);
//                console.log(i);
//                $scope.datos.gastos.splice(i--, 1);
            }
        }
        console.log('------------');
        $rootScope.myModalAccept = true;
        $http.post(url + 'gasto/deleteHistorial', $.param({datos: ids}), {timeout: 5000, responseType: "json", headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
        ).success(function(data, status, headers, config) {
            if (typeof data !== "object" || !data.respuesta) {
                $scope.error(data, status, headers, config);
                return;
            }
            console.log(data);
            angular.forEach(index, function(key, value) {
                $scope.total -= parseInt(key.Precio);
                $scope.datos.gastos.remove(key);
                $scope.gastosFiltrados.push($filter('filter')($scope.gastos, {Nombre: key.Nombre}, true)[0]);
            });
            $rootScope.myModalAccept = false;
            $('#myModal').modal('hide');
            show({message: {text: "Gastos eliminados exitosamente."}, type: 'success'});
        }).error($scope.error);
    };
});

