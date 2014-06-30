'use strict';
/* Controllers */
var myApp = angular.module('myApp');

myApp.controllerProvider.register('PaginaPrincipalCtrl', function($scope, $http, $q, $filter, $timeout, $rootScope) {
    console.log("PaginaPrincipalCtrl");

    $scope.datos = {
        secciones: [],
        seccion: {
            titulo: "hola",
        },
    };

    $scope.ListadoSeccion = function() {
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
                                    $scope.datos.secciones.push(msg[i]);
                                }
                                $scope.datos.seccion = $scope.datos.secciones[0];
                            },
                    error:
                            function(msg) {
                                console.log(msg);
                            }
                });
    };
    $scope.ListadoSeccion();

    $scope.MostrarSeccion = function(element) {
        $scope.datos.seccion = element;
    };

});
