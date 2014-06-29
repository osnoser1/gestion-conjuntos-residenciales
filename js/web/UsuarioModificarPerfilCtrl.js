/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var myApp = angular.module('myApp');

myApp.controllerProvider.register('UsuarioModificarPerfilCtrl', function($scope, $http, $q, $timeout, $rootScope, $location) {
    $scope.datos = {
    };

    $scope.ModificarPerfil = function(datosmodificados) {
        $http.post(url + 'usuario/modificarPerfil', $.param({datos: datosmodificados}), {timeout: 5000, responseType: "json", headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
        ).success(function(data, status, headers, config) {
            console.dir(data);
            if (typeof data === "object" && data.respuesta) {
                show({message: {text: "Correo modificado exitosamente."}, type: 'success'});
            }
            else {
                $scope.error(data, status, headers, config);
                return;
            }
        }).error($scope.error);

    };
});