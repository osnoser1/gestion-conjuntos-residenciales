/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 'use strict';
 /* Controllers */
 var myApp = angular.module('myApp');

 myApp.controllerProvider.register('PagosConsignarCtrl', function($scope, $http, $q, $filter, $timeout, $rootScope) {

 	$scope.nuevo = {
 		idbanco: '',
 	};
 	$scope.datos = {
 		tiposDePagos: [
 		{idtipo: 1, name: 'Deposito'},
 		{idtipo: 2, name: 'Transferencia'}
 		],
 		bancos: [
 		{idbanco: 2, name: 'Banco Canarias de Venezuela'},
 		{idbanco: 3, name: 'Banco Caroní'},
 		{idbanco: 4, name: 'Banco Confederado'},
 		{idbanco: 5, name: 'Banco Do Brasil'},
 		{idbanco: 6, name: 'Banco Exterior'},
 		{idbanco: 7, name: 'Banco Federal'},
 		{idbanco: 8, name: 'Banco Fondo Común'},
 		{idbanco: 9, name: 'Banco Guayana'},
 		{idbanco: 10, name: 'Banco Industrial de Venezuela'},
 		{idbanco: 11, name: 'Banco Mercantil'},
 		{idbanco: 12, name: 'Banco Occidental de Descuento'},
 		{idbanco: 13, name: 'Banco Plaza'},
 		{idbanco: 14, name: 'Banco Provincial'},
 		{idbanco: 15, name: 'Banco Sofitasa'},
 		{idbanco: 16, name: 'Banco Tequendama'},
 		{idbanco: 17, name: 'Banco Venezolano de Crédito'},
 		{idbanco: 18, name: 'Banco de Crédito de Colombia'},
 		{idbanco: 19, name: 'Banco de Venezuela'},
 		{idbanco: 20, name: 'Banco del Caribe'},
 		{idbanco: 21, name: 'Bancoro'},
 		{idbanco: 22, name: 'Banesco'},
 		{idbanco: 23, name: 'Banfoandes'},
 		{idbanco: 24, name: 'Banpro'},
 		{idbanco: 25, name: 'Bolívar Banco'},
 		{idbanco: 26, name: 'Casa Propia'},
 		{idbanco: 27, name: 'Central'},
 		{idbanco: 28, name: 'Citibank'},
 		{idbanco: 29, name: 'Corp Banca'},
 		{idbanco: 30, name: 'Del Sur'},
 		{idbanco: 31, name: 'Instituto Municipal de Crédito Popular'},
 		{idbanco: 32, name: 'Merenap'},
 		{idbanco: 33, name: 'Mi Casa'},
 		{idbanco: 34, name: 'Nuevo Mundo'},
 		{idbanco: 35, name: 'Stanford Bank'},
 		{idbanco: 36, name: 'Total Bank'},
 		{idbanco: 1, name: 'Otro'}
 		],
 	};

 	$scope.addConsignacion = function(nuevo){
 		
 		//$rootScope.loading = true;
 		nuevo.fecha = "2014-02-01"
 		nuevo.idEstado = "1";
 		nuevo.idusuario = "1";
 		console.dir(nuevo);
 		$http.post(url + 'pagos/insertar', $.param({datos: nuevo}), {timeout: 5000, responseType: "json", headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
 			).success(function(data, status, headers, config) {
 				if (typeof data === "undefined" || data === null || !data.respuesta) {
 					console.log("Error:");
 					$scope.error(data, status, headers, config);
 					return;
 				}
 				console.log("Mostrando data:");
 				console.dir(data);
 				$rootScope.loading = false;
 				$scope.nuevo = {};
 				//show({message: {text: "Pago agregado exitosamente."}, type: 'success'});
 			}).error($scope.error);
 		};
 	});