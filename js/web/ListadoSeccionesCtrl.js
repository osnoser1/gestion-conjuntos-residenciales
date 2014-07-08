'use strict';
/* Controllers */
var myApp = angular.module('myApp');

myApp.controllerProvider.register('PaginaPrincipalListadoSeccionesCtrl', function($scope, $http, $q, $filter, $timeout, $rootScope) {

    $scope.datos = {
        seccion: [],
    };
    
    $scope.isCollapsed = false;
    
    $scope.entrarSeccion = function(elemento) {
        $rootScope.seccion = {id:elemento.id,titulo:elemento.titulo, contenido:elemento.contenido};
        $scope.showConfirmDialog({title: "Modificar", src: "'partials/modificar-seccion.html'"}, $scope.ModificarSeccion);
    };
    $scope.verSeccion = function(elemento) {
        $scope.showDialog({title: elemento.titulo, message: elemento.contenido});
    };
    
    $scope.ModificarSeccion = function(elemento){
        $.ajax
        ({
            type: "POST",
            url: "models/consultas-crearseccion.php",
            data: {id: 3, idseccion: $rootScope.seccion.id, titulo: $rootScope.seccion.titulo, contenido: $rootScope.seccion.contenido},
            async: false,
            dataType: "json",
            success:
            function(msg)
            {
                console.log("ok");
                console.log(msg);
            },
            error:
            function(msg) {
                console.log("Error");
                console.log(msg);
            }
        });

        var array = $filter('filter')($scope.datos.seccion, {id: $rootScope.seccion.id}, true);
        if(array.length !== 0){
            array[0].titulo = $rootScope.seccion.titulo;
            array[0].contenido = $rootScope.seccion.contenido;
        }
        $('#myModal').modal('hide');        
    };
    $scope.ListadoSeccion = function(){
        $.ajax
        ({
            type: "POST",
            url: "models/consultas-crearseccion.php",
            data: {id: 2},
            async: false,
            dataType: "json",
            success:
            function(msg)
            {
                for (var i = 0; i < msg.length; i++)
                {
                    $scope.datos.seccion.push(msg[i]);
                }
            },
            error:
            function(msg) {
                console.log(msg);
            }
        });
    };
    $scope.ListadoSeccion();
});
