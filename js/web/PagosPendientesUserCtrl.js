/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';
/* Controllers */

var myApp = angular.module('myApp');
var b = {'true': 1, 'false': -1};

myApp.controllerProvider.register('PagosPendientesUserCtrl', function($scope, $http, $q, $filter, $timeout, $rootScope) {
    console.log('PagosPendientesUserCtrl');
    var temp;
    $rootScope.show = false;
    $scope.desactivado = true;
    $scope.tags = [];
    $scope.nuevo = {};
    $scope.datos = {pagos: []};
    $scope.totalSeleccionado = 0;
    $http.get(url + 'pagos/viewPendientes').success(function(data, status, headers, config) {
        if (!data.respuesta) {
            $scope.error(data, status, headers, config);
            return;
        }
        console.log(data);
        $scope.datos = data.datos;
        $scope.datos.Total = 0;
        angular.forEach($scope.datos.pagos, function(value) {
            console.log(value);
            $scope.datos.Total += parseFloat(value.Total);
        });
        $scope.datos.Abono = 55000;
        $scope.datos.TotalAPagar = $scope.datos.Total - $scope.datos.Abono < 0 ? $scope.datos.Total : $scope.datos.Total - $scope.datos.Abono;
        $rootScope.show = true;
    }).error($scope.error);
    $scope.check = function(i) {
        var salida = false;
        $scope.totalSeleccionado += b[$scope.datos.pagos[i].select + ''] * parseFloat($scope.datos.pagos[i].Total);
        angular.forEach($scope.datos.pagos, function(key, value) {
            if (key.select && !salida) {
                $scope.desactivado = !key.select;
                salida = true;
            }
        });
        $scope.desactivado = !salida;
    };
    $scope.all = function(boolean) {
        angular.forEach($scope.datos.pagos, function(key, value) {
            key.select = boolean;
            $scope.totalSeleccionado += b[key.select + ''] * parseFloat(key.Total);
        });
        $scope.desactivado = !boolean;
    };
    $scope.showDetalle = function(idPagosUsuario) {
        $rootScope.idPagosUsuario = idPagosUsuario;
        $scope.showDialog({src: "'partials/pagos-pendientes-detalle.html'"});
    };
    $scope.showConfirmPagoDialog = function() {
        $scope.showConfirmDialog({title: "Aviso", message: "¿Seguro que desea procesar los pagos seleccionados?"}, $scope.pagar);
    };
    $scope.pagar = function() {
        if ($scope.totalSeleccionado > $scope.datos.Abono) {
            show({message: {text: "El monto solicitado es superior a su abono."}, type: 'danger'});
            return;
        }
        var index = [];
        var ids = [];
        for (var i = 0; i < $scope.datos.pagos.length; i++) {
            if (typeof $scope.datos.pagos[i].select !== "boolean")
                continue;
            if ($scope.datos.pagos[i].select) {
                index.push($scope.datos.pagos[i]);
                ids.push($scope.datos.pagos[i].idPagosUsuario);
            }
        }
        $http.post(url + 'pagos/pagoPendientes', $.param({datos: ids}), {timeout: 5000, headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
        ).success(function(data, status, headers, config) {
            if (!data.respuesta) {
                $scope.error(data, status, headers, config);
                return;
            }
            console.log(data);
            $('#myModal').modal('hide');
            angular.forEach(index, function(key, value) {
                $scope.datos.Total -= parseFloat(key.Total);
                $scope.datos.Abono -= parseFloat(key.Total);
                $scope.datos.pagos.remove(key);
            });
            $scope.datos.TotalAPagar = $scope.datos.Total - $scope.datos.Abono < 0 ? $scope.datos.Total : $scope.datos.Total - $scope.datos.Abono;
            show({message: {text: "Pago llevado a cabo exitosamente."}, type: 'success'});
        }).error($scope.error);
    };
});
