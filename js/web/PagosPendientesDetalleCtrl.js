/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';
/* Controllers */

var myApp = angular.module('myApp');

myApp.controllerProvider.register('PagosPendientesDetalleCtrl', function($scope, $http, $q, $filter, $timeout, $rootScope) {
    console.log('PagosPendientesDetalleCtrl');
    var temp;
    $rootScope.showPagosPendientes = false;
    $scope.desactivado = false;
    $scope.tags = [];
    $scope.sitios = [];
    $scope.nuevo = {};
    $scope.datos = {gastos: []};
    $http.post(url + 'pagos/detallePendientes', $.param({datos: $rootScope.idPagosUsuario}), {timeout: 5000, headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
    ).success(function(data, status, headers, config) {
        if (!data.respuesta) {
            $scope.error(data, status, headers, config);
            return;
        }
        console.log(data);
        $rootScope.showPagosPendientes = true;
        $scope.datos = data.datos;
    }).error($scope.error);
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