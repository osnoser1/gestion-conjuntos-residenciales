/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';
/* Controllers */

var myApp = angular.module('myApp');

myApp.controllerProvider.register('GastosActualesCtrl', function($scope, $http, $q, $filter, $timeout, $rootScope) {
    console.log('GastosActualesCtrl');
    var temp;
    $scope.desactivado = false;
    $scope.tags = [];
    $scope.sitios = [];
    $scope.nuevo = {};
    $scope.datos = {gastos: []};
//    $scope.datos = {
//        Mes: "Febrero",
//        Ano: "2014",
//        Fecha: "2014-02-01",
//        gastos: [
//            {idHistorialGasto: "7", idGastoFecha: "1", idGasto: "1", Nombre: "Vigilancia", Precio: "10000"},
//            {idHistorialGasto: "8", idGastoFecha: "1", idGasto: "2", Nombre: "Aseo urbano", Precio: "10000"},
//            {idHistorialGasto: "9", idGastoFecha: "1", idGasto: "3", Nombre: "Mantenimiento piscina", Precio: "10000"},
//            {idHistorialGasto: "10", idGastoFecha: "1", idGasto: "4", Nombre: "Mantenimiento ascensor", Precio: "10000"},
//            {idHistorialGasto: "11", idGastoFecha: "1", idGasto: "5", Nombre: "Luz residencia", Precio: "10000"},
//        ],
//    };
    $http.get(url + 'gasto/view').success(function(data, status, headers, config) {
//        console.log(data);
        if (!data.respuesta) {
            $scope.error(data, status, headers, config);
            return;
        }
        $scope.datos = data.datos;
        $scope.gastos = data.gastos;
        $scope.gastosFiltrados = [];
        angular.forEach($scope.gastos, function(key) {
            if ($filter('filter')($scope.datos.gastos, {idGasto: key.idGasto}, true).length === 0) {
                $scope.gastosFiltrados.push(key);
            }
        });
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
        console.log(element, campo, bool);
        if (typeof element.editing === "undefined")
            element.editing = [];
        element.editing[campo] = bool;
        if (bool) {
            $scope.textAnterior = element[campo];
            if (campo === "Nombre") {
                temp = {idGasto: element['idGasto'], Nombre: element['Nombre']};
                $scope.gastosFiltrados.unshift(temp);
                console.log(temp);
            }
        } else {
            if (campo === "Nombre") {
                $scope.gastosFiltrados.remove(temp);
                console.log(temp);
            }
        }
//       } else if ($scope.textAnterior !== element[campo]) {
//
//       }
    };
    $scope.addGasto = function(gasto) {
        
        $rootScope.loading = true;
        var obj = $filter('filter')($scope.datos.gastos, {idGasto: gasto.idGasto}, true);
        if (obj.length !== 0) {
            show({message: {text: "Gasto ya existe, no se puede agregar."}, type: 'danger'});
            $rootScope.loading = false;
            return;
        }
        if (gasto.idGasto === "Nuevo") {
            delete gasto.idGasto;
            console.log("gasto: ");
            console.dir(gasto);
            $http.post(url + 'gasto/createHistorial', $.param({datos: gasto}), {timeout: 5000, responseType: "json", headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
            ).success(function(data, status, headers, config) {
                if (typeof data === "undefined" || !data.respuesta) {
                    $scope.error(data, status, headers, config);
                    return;
                }
                console.log("Data: ");
                console.log(data);
                $rootScope.loading = false;
                $scope.datos.gastos.push(data['gasto_historial']);
                $scope.nuevo = {};
                show({message: {text: "Gasto agregado exitosamente."}, type: 'success'});
            }).error($scope.error);
        }
        gasto.Fecha = $scope.datos.Fecha;
        $http.post(url + 'gasto/createHistorial', $.param({datos: gasto}), {timeout: 5000, responseType: "json", headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
        ).success(function(data, status, headers, config) {
            if (typeof data !== "object" || !data.respuesta) {
                $scope.error(data, status, headers, config);
                return;
            }
            console.log(data);
            $rootScope.loading = false;
            $scope.datos.gastos.push(data['gasto_historial']);
            $scope.nuevo = {};
            show({message: {text: "Gasto agregado exitosamente."}, type: 'success'});
        }).error($scope.error);
        /*$timeout(function() {
         $scope.loading = false;
         if (gasto.idGasto === "Nuevo") {
         gasto.idGasto = i++;
         }
         $scope.datos.gastos.push(gasto);
         $scope.nuevo = {};
         }, 3000);*/
    };
    $scope.deleteSelectedGastos = function() {
        var index = [];
        var ids = [];
        for (var i = 0; i < $scope.datos.gastos.length; i++) {
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
                $scope.datos.gastos.remove(key);
            });
            $rootScope.myModalAccept = false;
            $('#myModal').modal('hide');
            show({message: {text: "Gastos eliminados exitosamente."}, type: 'success'});
        }).error($scope.error);
    };
    $scope.showModalBorrar = function() {
        $scope.showConfirmDialog({title: "Aviso", message: "¿Seguro que desea eliminar los gastos seleccionados?"}, $scope.deleteSelectedGastos);
//        $scope.deleteSelectedGastos();
    };
    $scope.submit = function(datos) {
        console.log(datos);
        $scope.showConfirmDialog({title: "Procesar Gastos.", message: "¿Está seguro que desea procesar el mes de " + datos.Mes + " - " + datos.Ano + "?<br><br><small><b>Esta operación no se puede deshacer.</b></small>"});
    };
});

var i = 12;