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
    $http.post(url + 'gasto/detalle', $.param({datos: $rootScope.idGastoFecha}), {timeout: 5000, responseType: "json", headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
    ).success(function(data, status, headers, config) {
        if (!data.respuesta) {
            $scope.error(data, status, headers, config);
            return;
        }
        console.log(data);
        $scope.datos = data.datos;
        $scope.total = parseInt(data.Total);
        var entro = function(bandera, key, key1) {
            bandera = true;
            var r = $filter('filter')($scope.datos.gastos, {idGastoHistorial: key.idGastoHistorial}, true);
            console.log(r);
            if (typeof r[0].sitios === "undefined") {
                r[0].sitios = [];
            }
            r[0].sitios.push(key1);
        };
        angular.forEach($scope.datos.GEH, function(key) {
            var bandera = false;
            console.log(key);
            angular.forEach($scope.datos.sitios, function(key1) {
                if (bandera)
                    return;
                if (key.idEdificio !== null) {
                    if (key.NroDePiso === null) {
                        if (key.idEdificio == key1.idEdificio && typeof key1.NroDePiso === "undefined") {
                            entro(bandera, key, key1);
                        }
                    } else {
                        if (key.idApartamento === null) {
                            if (key.idEdificio == key1.idEdificio && key.NroDePiso == key1.NroDePiso && typeof key1.idApartamento === "undefined") {
                                entro(bandera, key, key1);
                            }
                        } else if (key.idEdificio == key1.idEdificio && key.NroDePiso == key1.NroDePiso && key.idApartamento == key1.idApartamento) {
                            entro(bandera, key, key1);
                        }
                    }
                } else if (key1.text == "Todos") {
                    entro(bandera, key, key1);
                }
            });
            console.log("--------------------------");
        });
        $rootScope.showGastosDetalle = true;
    }).error($scope.error);
    $scope.loadTags = function(query) {
        console.log(query);
        var _p = $q.defer();
        var array = $filter('filter')($scope.datos.sitios, {$: query}, false);
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