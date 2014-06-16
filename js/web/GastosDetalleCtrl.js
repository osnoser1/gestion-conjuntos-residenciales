/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';
/* Controllers */

var myApp = angular.module('myApp');

myApp.controllerProvider.register('GastosDetalleCtrl', function($scope, $http, $q, $filter, $timeout, $rootScope) {
    console.log('GastosDetalleCtrl');
    var temp;
    $rootScope.showGastosDetalle = false;
    $scope.desactivado = false;
    $scope.tags = [];
    $scope.sitios = [];
    $scope.nuevo = {};
    $scope.datos = {gastos: []};
    $http.post(url + 'gasto/detalle', $.param({datos: $rootScope.idGastoFecha}), {timeout: 5000, responseType: "json", headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
    ).success(function(data, status, headers, config) {
        if (!data.respuesta) {
            $scope.error(data, status, headers, config);
            return;
        }
        console.log(data);
        $rootScope.showGastosDetalle = true;
        $scope.datos = data.datos;
        $scope.total = parseInt(data.Total);
    }).error($scope.error);
    $http.get('pruebas/sitios.json').success(function(data) {
        $scope.sitios = data;
    });
    $scope.loadTags = function(query) {
        console.log(query);
        var _p = $q.defer();
        var array = $filter('filter')($scope.sitios, {$: query}, false);
//        console.log(array);
        _p.resolve(array);
//        return $http.get('/tags?query=' + query);
        return _p.promise;
    };
    $scope.select = function(i) {
        $scope.datos.gastos[i].select = !$scope.datos.gastos[i].select;
    };
    $scope.imprimir = function() {
        var printContents = document.getElementById('print').innerHTML;
        var originalContents = document.body.innerHTML;
        var popupWin = window.open('', '_blank', 'width=300,height=300');
        popupWin.document.open();
        popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + printContents + '</html>');
        popupWin.document.close();
    };
    $scope.guardarPDF = function() {

    };
});