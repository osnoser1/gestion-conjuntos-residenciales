var myApp = angular.module('myApp');

myApp.controllerProvider.register('UsuarioLoginCtrl', function($scope, $http, $q, $filter, $timeout, $rootScope, $location) {

    $scope.usuariologin = function(element) {
        $http.post(url + 'usuario/buscar', $.param({datos: element}), {timeout: 5000, headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).success(function(data, status, headers, config) {
            //$rootScope.usuariologin = element;
            console.dir(element);
            console.log(data);
            if (typeof data !== "object" || !data.respuesta) {
                $scope.error(data, status, headers, config);
                return;
            }
            console.log("ok");
            $location.path("panel/home");

        });
    };

    $scope.comprobarUsuario = function() {
        console.log("hola enfermero")
        $http.get(url + 'usuario/usuarioLogueado').success(function(data) {
            console.log(data);
            console.log("data");
        });

    };
    $scope.comprobarUsuario();

});


