'use strict';
/* Controllers */
var myApp = angular.module('myApp');

myApp.controllerProvider.register('ListadoSeccionesCtrl', function($scope, $http, $q, $filter, $timeout, $rootScope) {
    $scope.datos = {
        seccion: [
                   {"id": "1", "Titulo": "Informacion", "Contenido":"hola mucho gusto"},
                   {"id": "1", "Titulo": "Informacion", "Contenido":"hola mucho gusto"},
                   {"id": "1", "Titulo": "Informacion", "Contenido":"hola mucho gusto"},
                   {"id": "1", "Titulo": "Informacion", "Contenido":"hola mucho gusto"},
		],
    };
    $scope.isCollapsed = true;
    $scope.entrarSeccion = function() {
         $('#myModal').modal('show');
    };
});