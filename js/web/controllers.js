'use strict';
/* Controllers */

var pruebaControllers = angular.module('myControllers', []);

pruebaControllers.controller('PrincipalCtrl', function($scope, $http, $location) {
    $scope.header = "partials/header-logged.html";

});

pruebaControllers.controller('headerCtrl', function($scope, $http) {

});

function show(params) {
    $('.bottom-right').notify(params).show();
}