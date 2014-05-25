'use strict';
/* Controllers */

var pruebaControllers = angular.module('myControllers', []);

pruebaControllers.controller('PrincipalCtrl', function($state, $scope, $http, $location) {
    $scope.cargando = false;
    $scope.error = function(data) {
        console.log(data);
        if (typeof data !== "object") {
            $('.modal-content').html(data);
            $('#myModal').modal('show');
            show({message: {text: "Error en el servidor."}, type: 'danger'});
        } else {
            show({message: {text: data.aviso}, type: 'danger'});
        }
        $scope.cargando = false;
    };
});

pruebaControllers.controller('LoginCtrl', ['$scope', '$state', '$location', '$http', function($scope, $state, $location, $http) {
        $scope.login = function(user) {
            $state.go('panel');
        };
    }]);

pruebaControllers.controller('PanelCtrl', function($scope, $http, $location) {
    $scope.header = "partials/panel-header.html";
});

pruebaControllers.controller('PanelHeaderCtrl', function($scope, $http) {
    $scope.header = "partials/panel-header.html";
});

pruebaControllers.controller('crearmensajeCtrl', function($scope, $http) {
    $scope.header = "partials/panel-header.html";
    $scope.CrearMensaje = function(datos) {
        console.log("click en el boton enviar");
        console.log(datos);
        $http.post("archivo_php", {datos: datos, funcion: 'nombreFuncionPhp'}, function(data) {

        });
    };
});



function show(params) {
    $('.bottom-right').notify(params).show();
}

function alert(options) {
    var o = {html: "", enable: true};
    $.extend(o, options);
    $('.alert').html(o.html);
    if (o.enable) {
        $('.alert').css('display', 'flex');
        $('.alert').addClass('in');
    } else {
        $('.alert').removeClass('in');
        $('.alert').css('display', 'block');
    }
}