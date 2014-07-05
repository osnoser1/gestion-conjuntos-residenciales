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
});