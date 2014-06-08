'use strict';
/* Controllers */
var myApp = angular.module('myApp');

myApp.controllerProvider.register('CrearSeccionesCtrl', function($scope, $http, $q, $filter, $timeout, $rootScope) {
    $scope.datos = {
       nuevaSeccion: [
                    {"id": "1", "Titulo": "Informacion", "Contenido":"hola mucho gusto"},
		],
    };
    
    $scope.GuardarSeccion = function(seccion) {  
        $scope.datos.nuevaSeccion.push(seccion);
        seccion.Contenido = $('.summernote').code();
        console.log(seccion.Titulo+' '+seccion.Contenido);
       
    };
});

