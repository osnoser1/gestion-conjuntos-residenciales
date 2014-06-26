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
    $scope.init = function() {
        $rootScope.show = false;
        $scope.desactivado = false;
//        $scope.tags = [];
//        $scope.sitios = [];
//        $scope.nuevo = {};
//        $scope.datos = {gastos: []};
        $http.get(url + 'gasto/view').success(function(data, status, headers, config) {
            if (!data.respuesta) {
                $scope.error(data, status, headers, config);
                return;
            }
            console.log(data);
            $rootScope.show = true;
            $scope.datos = data.datos;
            $scope.total = parseInt(data.Total === null ? "0" : data.Total);
            $scope.gastos = data.gastos;
            $scope.gastosFiltrados = [];
            angular.forEach($scope.gastos, function(key) {
                if ($filter('filter')($scope.datos.gastos, {idGasto: key.idGasto}, true).length === 0) {
                    $scope.gastosFiltrados.push(key);
                }
            });
        }).error($scope.error);
//        $http.get('pruebas/sitios.json').success(function(data) {
//            $scope.sitios = data;
//        });
    };
    $scope.init();
    $scope.update = function(tag, element) {
        console.log(tag);
        $http.post(url + 'gasto/create', $.param({datos: {tag: tag, id: element.idGastoHistorial}}), {timeout: 10000, headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
        ).success(function(data, status, headers, config) {
            if (typeof data !== "object" || !data.respuesta) {
                $scope.error(data, status, headers, config);
                return;
            }
            tag.idEntidadHistorial = data.id;
            console.log($scope.datos.sitios);
        }).error(function(data, status, headers, config) {
            $scope.error(data, status, headers, config);
            element.sitios.remove(tag);
        });
    };
    $scope.loadTags = function(query) {
        console.log(query);
        var _p = $q.defer();
        var array = $filter('filter')($scope.datos.sitios, {$: query}, false);
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
//        console.log(obj);
//        console.log(gasto);
    };
    $scope.select = function(i) {
        $scope.datos.gastos[i].select = !$scope.datos.gastos[i].select;
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
            $scope.gastoAnterior = $.extend({}, element);
            if (campo === "Nombre") {
                temp = $filter('filter')($scope.gastos, {Nombre: element.Nombre}, true)[0];
                $scope.gastosFiltrados.unshift(temp);
                console.log(temp);
            }
        } else if ($scope.gastoAnterior[campo] !== element[campo]) {
            var comprobarError = function(data, status, headers, config) {
                if (data === null || typeof data !== "object" || !data.respuesta) {
                    $.extend(element, $scope.gastoAnterior);
                    if (campo === "Nombre")
                        $scope.gastosFiltrados.remove(temp);
                    $scope.error(data, status, headers, config);
                    return true;
                }
                return false;
            };
            $http.post(url + 'gasto/updateHistorial', $.param({datos: element}), {timeout: 5000, responseType: "json", headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
            ).success(function(data, status, headers, config) {
                if (comprobarError(data, status, headers, config))
                    return;
                console.log(data);
                if (campo === "Nombre") {
                    if (element.Nombre === temp.Nombre)
                        $scope.gastosFiltrados.remove(temp);
                    else
                        $scope.gastosFiltrados.remove($filter('filter')($scope.gastos, {Nombre: element.Nombre}, true)[0]);
                    console.log(temp);
                } else {
                    $scope.total -= parseInt($scope.gastoAnterior.Precio);
                    $scope.total += parseInt(element.Precio);
                }
                show({message: {text: "Gasto modificado exitosamente."}, type: 'success'});
            }).error(function(data, status, headers, config) {
                comprobarError(data, status, headers, config);
            });
        } else if (campo === "Nombre") {
            $scope.gastosFiltrados.remove(temp);
        }

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
        }
        gasto.Fecha = $scope.datos.Fecha;
        $http.post(url + 'gasto/createHistorial', $.param({datos: gasto}), {timeout: 5000, responseType: "json", headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
        ).success(function(data, status, headers, config) {
            if (typeof data !== "object" || !data.respuesta) {
                $scope.error(data, status, headers, config);
                return;
            }
            console.log("Data: ");
            console.log(data);
            $rootScope.loading = false;
            $scope.datos.gastos.push(data['gasto_historial']);
            $scope.total += parseInt(data['gasto_historial'].Precio);
            $scope.nuevo = {};
            if (typeof gasto.idGasto !== "undefined") {
                $scope.gastosFiltrados.remove($filter('filter')($scope.gastos, {Nombre: gasto.Nombre}, true)[0]);
            } else {
                $scope.gastos.push({idGasto: data['gasto_historial'].idGasto, Nombre: data['gasto_historial'].Nombre})
            }
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
                $scope.total -= parseInt(key.Precio);
                $scope.datos.gastos.remove(key);
                $scope.gastosFiltrados.push($filter('filter')($scope.gastos, {Nombre: key.Nombre}, true)[0]);
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
        $scope.showConfirmDialog({title: "Procesar Gastos.", message: "¿Está seguro que desea procesar el mes de " + datos.Mes + " - " + datos.Ano + "?<br><br><small><b>Esta operación no se puede deshacer.</b></small>"}, $scope.procesarMes);
    };

    $scope.procesarMes = function() {
        $rootScope.myModalAccept = true;
        $http.post(url + 'gasto/procesarMes', $.param({datos: 1}), {timeout: 10000, headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
        ).success(function(data, status, headers, config) {
            if (typeof data !== "object" || !data.respuesta) {
                $scope.error(data, status, headers, config);
                return;
            }
            $rootScope.myModalAccept = false;
            console.log("Data: ");
            console.log(data);
            $('#myModal').modal('hide');
            show({message: {text: "Gastos procesados exitosamente."}, type: 'success'});
            $scope.init();
        }).error($scope.error);
    };
});
var i = 12;
