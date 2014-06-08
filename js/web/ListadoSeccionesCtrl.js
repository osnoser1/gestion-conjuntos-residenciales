'use strict';
/* Controllers */
var myApp = angular.module('myApp');

myApp.controllerProvider.register('ListadoSeccionesCtrl', function($scope, $http, $q, $filter, $timeout, $rootScope) {
    
        

    $scope.datos = {
        seccion: [
                   {"id": "1", "Titulo": "Informacion", "Contenido":"hola mucho gusto"},
                   {"id": "2", "Titulo": "Informacion", "Contenido":"hola mucho gusto"},
		],
    };
    
    $scope.isCollapsed = true;
    
    $scope.entrarSeccion = function(elemento) {
        $rootScope.seccion = {id:elemento.id,Titulo:elemento.Titulo, Contenido:elemento.Contenido};
        $scope.showConfirmDialog({title: "Modificar", src: "'partials/modificar-seccion.html'"}, $scope.ModificarSeccion);
    };
    /*$scope.ModificarSeccion = function(){
        console.log("Guardar");
        var array = $filter('filter')($scope.datos.seccion, {id: $rootScope.seccion.id}, true);
        if(array.length !== 0){
            array[0].Titulo = $rootScope.seccion.Titulo;
            array[0].Contenido = $rootScope.seccion.Contenido;
        }
        $('#myModal').modal('hide');        
    };
    $scope.ListadoSeccion = function(elemento){
        
        
        
    };*/
    
});