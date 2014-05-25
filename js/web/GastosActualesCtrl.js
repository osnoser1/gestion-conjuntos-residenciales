/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';
/* Controllers */

var myApp = angular.module('myApp');

myApp.controllerProvider.register('GastosActualesCtrl', function($scope, $http, $q, $filter, $timeout) {
    console.log('GastosActualesCtrl');
    $scope.desactivado = false;
    $scope.tags = [];
    $scope.sitios = [];
    $scope.nuevo = [];
    $http.get('pruebas/gastos.json').success(function(data) {
        $scope.gastos = data;
    });
    $http.get('pruebas/sitios.json').success(function(data) {
        $scope.sitios = data;
    });
    $scope.datos = {
        Mes: "Febrero",
        gastos: [
            {idGasto: "1", Nombre: "Vigilancia", Precio: "10000"},
            {idGasto: "2", Nombre: "Aseo urbano", Precio: "10000"},
            {idGasto: "3", Nombre: "Mantenimiento piscina", Precio: "10000"},
            {idGasto: "4", Nombre: "Mantenimiento ascensor", Precio: "10000"},
            {idGasto: "5", Nombre: "Luz residencia", Precio: "10000"},
        ],
    };
    $scope.loadTags = function(query) {
        console.log(query);
        var _p = $q.defer();
        var array = $filter('filter')($scope.sitios, {$: query}, false);
//        console.log(array);
        _p.resolve(array);
//        return $http.get('/tags?query=' + query);
        return _p.promise;
    };
    $scope.getIdGasto = function(gasto) {
        console.log(gasto);
        if (typeof gasto.Nombre === "undefined" || gasto.Nombre === "") {
            gasto.idGasto = "";
            return;
        }
        var obj = $filter('filter')($scope.gastos, {Nombre: gasto.Nombre}, true);
        gasto.idGasto = obj.length === 0 ? "Nuevo" : obj[0].idGasto;
        console.log(obj);
        console.log(gasto);
    };
    $scope.check = function() {
        var salida = false;
        angular.forEach($scope.datos.gastos, function(key, value) {
            if (key.select && !salida) {
                $scope.desactivado = !key.select;
                salida = true;
            }
        });
        $scope.desactivado = !salida;
    };
    $scope.all = function(boolean) {
        angular.forEach($scope.datos.gastos, function(key, value) {
            key.select = boolean;
        });
        $scope.desactivado = !boolean;
    };
    $scope.setEditing = function(element, campo, bool) {
        if (typeof element.editing === "undefined")
            element.editing = [];
        element.editing[campo] = bool;
        if (bool) {
            $scope.textAnterior = element[campo];
        } else if ($scope.textAnterior !== element[campo]) {

        }
    };
    $scope.addGasto = function(gasto) {
        $scope.loading = true;
        $timeout(function() {
            $scope.loading = false;
        }, 3000);
    };
});