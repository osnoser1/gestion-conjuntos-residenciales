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

    $.ajax
    ({
        type: "POST",
        url: "models/consultas-crearseccion.php",
        data: {id:6},
        async: true,
        dataType: "json",
        success:
        function(msg)
        {
       
            footer.innerHTML=msg[0].footer;
            Titulo.innerHTML=msg[0].titulo;
          
      },
      error:
      function (msg) {alert( msg +"No se pudo realizar la conexion");}
      });
/*    $.ajax
    ({
        type: "POST",
        url: "models/consultas-crearseccion.php",
        data: {id:8},
        async: true,       
        success:
        function(msg)
        {       
            footer2.innerHTML='<img src='+msg+' class="img-responsive img-thumbnail" />'
            $("body").css("background-image","url(partials/14256282-rostro-humano-pintado-con-la-bandera-de-colombia.jpg)");
      },
      error:
      function (msg) {alert( msg +"No se pudo realizar la conexion");}
      });*/
 

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
