/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var myApp = angular.module('myApp');

myApp.controllerProvider.register('UsuarioModificarContrasenaCtrl', function($scope, $http, $q, $timeout, $rootScope, $location) {
    $scope.datos = {
    };

    $scope.ModificarContrasena = function(claveModificado) {
        if (claveModificado.Nueva !== claveModificado.Comprobando) {
            show({message: {text: "Contraseña no coinciden."}, type: 'danger'});
            return;
        }
        if (claveModificado.Nueva === claveModificado.Contrasena) {
            show({message: {text: "Contraseña Nueva no puede ser igual a la Actual"}, type: 'danger'});
            return;
        }
        $http.post(url + 'usuario/modificarClave', $.param({datos: claveModificado}), {timeout: 5000, responseType: "json", headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
        ).success(function(data, status, headers, config) {
            console.dir(data);
            if (typeof data === "object" && data.respuesta) {
                show({message: {text: "Contraseña modificada exitosamente."}, type: 'success'});
            }
            else {
                $scope.error(data, status, headers, config);
                return;
            }
        }).error($scope.error);

    };
});

