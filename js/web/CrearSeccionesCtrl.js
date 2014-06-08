'use strict';
/* Controllers */
var myApp = angular.module('myApp');

myApp.controllerProvider.register('CrearSeccionesCtrl', function($scope, $http, $q, $filter, $timeout, $rootScope) {
    $scope.datos = {
       secciones: [
                    {"id": "1", "Titulo": "Informacion", "Contenido":"hola mucho gusto"},
		],
    };
    
    $scope.GuardarSeccion = function(seccion) {  
        $scope.datos.secciones.push(seccion);
    };
});

