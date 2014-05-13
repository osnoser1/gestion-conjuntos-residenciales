'use strict';
/* Controllers */

var pruebaControllers = angular.module('myControllers', []);

pruebaControllers.controller('PrincipalCtrl', function($state, $scope, $http, $location) {
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
    $scope.CrearMensaje=function(datos){
    	console.log("click en el boton enviar");
    	console.log(datos);
    	$http.post("archivo_php", {datos: datos, funcion:'nombreFuncionPhp'}, function(data){
    		
    	});
    };
});



function show(params) {
    $('.bottom-right').notify(params).show();
}