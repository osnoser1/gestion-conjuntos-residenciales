'use strict';
/* Controllers */
var myApp = angular.module('myApp');

myApp.controllerProvider.register('CrearSeccionesCtrl', function($scope, $http, $q, $filter, $timeout, $rootScope) {
    /*$scope.datos = {
       nuevaSeccion: [
                    {"id": "1", "Titulo": "Informacion", "Contenido":"hola mucho gusto"},
		],
    };*/
    
    $scope.GuardarSeccion = function(seccion) {  
        //$scope.datos.nuevaSeccion.push(seccion);

        seccion.Contenido = $('.summernote').code();
        console.dir(seccion);
        $.ajax
        ({
            type: "POST",
            url: "models/consultas-crearseccion.php",
            data: {id:1, titulo:seccion.Titulo,contenido:seccion.Contenido},
            async: false,
            dataType: "json",
            success:
            function (msg) 
            {       
               console.log("Creado");
           },
           error:
           function (msg) {console.log( msg);}
       });


    };
});

