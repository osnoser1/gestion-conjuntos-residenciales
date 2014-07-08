'use strict';
/* Controllers */

var myApp = angular.module('myApp');

myApp.controllerProvider.register('PanelHeaderCtrl', function($scope, $http, $q, $filter, $timeout, $rootScope, $location) {
    console.log("PanelHeaderCtrl");
    //$scope.usuario = {};
    $scope.logout = function() {
        console.log("Deslogear");
        $http.get(url + 'usuario/cerrarSesion').success(function(data) {
            console.log("data");
            console.log(data);
            if (typeof data !== 'undefined') {
                console.log("Sesión cerrada");
                $location.path("web/login");
            }
        });
    };
      $.ajax
            ({
                type: "POST",
                url: "models/consultas-crearMensaje.php",
                data: {id: 16},
                async: true,
                dataType: "json",
                success:
                        function(msg)
                        {
                            console.log("actualizando panel de notificacion");
                            $scope.$apply(function() {
                                $scope.mensajes = msg[0].m;
                                $scope.datos = msg;
                             });
                        },
                error:
                        function(msg) {
                            alert(msg + "No se pudo realizar la conexion");
                        }
            });
    $.ajax
            ({
                type: "POST",
                url: "models/consultas-crearMensaje.php",
                data: {id: 22},
                async: true,
                dataType: "json",
                success:
                        function(msg)
                        {
                            $scope.$apply(function() {
                            $scope.nombre = msg;
                            });
                            console.log("actualizando panel de notificacion2");
                        },
                error:
                        function(msg) {
                            alert(msg + "No se pudo realizar la conexion");
                        }
            });

    $(document).on('click', '.correo', (function(e) {
        var idmensaje = $(this).attr('name');
        console.log("idmensaje" + idmensaje);
        $.ajax
                ({
                    type: "POST",
                    url: "models/consultas-crearMensaje.php",
                    data: {id: 23, ID: idmensaje},
                    async: true,
                    dataType: "json",
                    success:
                            function(msg)
                            {
                                de2.innerHTML = msg[0].de;
                                titulo2.innerHTML = msg[0].asunto;
                                fecha2.innerHTML = msg[0].fecha;
                                descripcion2.innerHTML = msg[0].descripcion;
                            },
                    error:
                            function(msg) {
                                console.log(msg + "No se pudo realizar la conexion en controller linea 36");
                            }
                });

        $('#vercorreo').modal('show');
    }));

});