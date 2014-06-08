'use strict';
/* Controllers */
var myApp = angular.module('myApp');

myApp.controllerProvider.register('buzonentradaCtrl', function($scope, $http, $q, $filter, $timeout, $rootScope) {
			$http.post('models/consultas-crearMensaje.php', {'funcion': 'obtenermensaje'}).success(function(data) {
                console.log(data);  
                
             
                
            }).error(function(data, status) {
                console.log(data + '\n' + status);
            });


});