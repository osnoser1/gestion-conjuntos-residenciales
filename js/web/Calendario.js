/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';
/* Controllers */

var myApp = angular.module('myApp');
< script src = "js/daypilot/daypilot-all.min.js" type = "text/javascript" > < /script> 
        /*myApp.controllerProvider.register('GestionarServiciosCtrl', function($scope, $http, $q, $filter, $timeout, $rootScope) {
         console.log('GestionarServiciosCtrl');
         $scope.desactivado = false;
         $scope.tags = [];
         $scope.sitios = [];
         $scope.nuevo = [];
         $http.get('pruebas/gastos.json').success(function(data) {
         $scope.gastos = data;
         $('.selectpicker').selectpicker();
         });
         $http.get('pruebas/sitios.json').success(function(data) {
         $scope.sitios = data;
         });
         $scope.servicios = {
         Servicios: [
         {idServicio: "", nombre: "", costo: ""},
         /*{idGasto: "2", Nombre: "Aseo urbano", Precio: "10000"},
         {idGasto: "3", Nombre: "Mantenimiento piscina", Precio: "10000"},
         {idGasto: "4", Nombre: "Mantenimiento ascensor", Precio: "10000"},
         {idGasto: "5", Nombre: "Luz residencia", Precio: "10000"},
         ],
         tipoServicios: [
         {tipoServicio: "Recreativos"},
         {tipoServicio: "Mantenimiento"},
         {tipoServicio: "Externos"},
         ]
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
         console.log(element, campo, bool);
         if (typeof element.editing === "undefined")
         element.editing = [];
         element.editing[campo] = bool;
         if (bool) {
         $scope.textAnterior = element[campo];
         } else if ($scope.textAnterior !== element[campo]) {
         
         }
         };
         $scope.addGasto = function(gasto) {
         console.log(gasto);
         $scope.loading = true;
         var obj = $filter('filter')($scope.datos.gastos, {idGasto: gasto.idGasto}, true);
         if (obj.length !== 0) {
         show({message: {text: "Gasto ya existe, no se puede agregar."}, type: 'danger'});
         $scope.loading = false;
         return;
         }
         $timeout(function() {
         $scope.loading = false;
         if (gasto.idGasto === "Nuevo") {
         gasto.idGasto = i++;
         }
         $scope.datos.gastos.push(gasto);
         $scope.nuevo = [];
         }, 3000);
         };
         $scope.deleteSelectedGastos = function() {
         var index = [];
         for (var i = 0; i < $scope.datos.gastos.length; i++) {
         if (typeof $scope.datos.gastos[i].select !== "boolean")
         continue;
         if ($scope.datos.gastos[i].select) {
         index.push($scope.datos.gastos[i]);
         //                console.log(i);
         //                $scope.datos.gastos.splice(i--, 1);
         }
         }
         console.log('------------');
         $rootScope.myModalAccept = true;
         $timeout(function() {
         angular.forEach(index, function(key, value) {
         //                console.log(key);
         $scope.datos.gastos.remove(key);
         });
         $rootScope.myModalAccept = false;
         $('#myModal').modal('hide');
         }, 3000);
         };
         $scope.showModalBorrar = function() {
         $scope.showConfirmDialog({title: "Aviso", message: "¿Seguro que desea eliminar los gastos seleccionados?"}, $scope.deleteSelectedGastos);
         //        $scope.deleteSelectedGastos();
         };
         });
         
         var i = 12;*/