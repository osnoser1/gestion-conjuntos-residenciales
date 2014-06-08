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
    $scope.entrarSeccion = function(seccion) {
        //$('#myModal').modal('show');<form role="form">
        console.log(seccion.Titulo);      
        var mensaje='<div class="modal-body"><form role="form">'+
                '<label>Modificar Seccion</label><input ng-model="seccion.Titulo" type="text" id="Titulo" class="form-control" placeholder="Titulo" >'+
                '<br></br>'+
                '<textarea  ng-model="seccion.Contenido" class="summernote form-control" rows="10" cols="50" placeholder="Descripcion de seccion" ></textarea>'               
            +'<form>'
          +'</div>';
        $scope.showConfirmDialog({tittle:"Modificar",message:mensaje},$scope.ModificarSeccion);
    };
    $scope.ModificarSeccion = function() {
        console.log("guardar");
        
    };
    
    
});