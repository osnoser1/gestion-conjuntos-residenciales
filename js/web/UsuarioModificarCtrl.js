/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var myApp = angular.module('myApp');
myApp.controllerProvider.register('UsuarioModificarCtrl', function($scope, $http, $q, $filter, $timeout, $rootScope, $location) {

    $scope.usuarioModificar = function(element)
    {
        console.dir(element);

        $http.post(url + 'usuario/modificar', $.param({datos: element}), {timeout: 5000, responseType: "json", headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
        ).success(function(data, status, headers, config) {
            console.log("data");
            console.dir(data);
            $('#myModal').modal('hide');
            show({message: {text: "Usuario Modificado exitosamente."}, type: 'success'});
        }).error($scope.error);

    };
});