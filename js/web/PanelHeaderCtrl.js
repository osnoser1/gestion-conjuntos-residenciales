'use strict';
/* Controllers */

var myApp = angular.module('myApp');

myApp.controllerProvider.register('PanelHeaderCtrl', function($scope, $http, $q, $filter, $timeout, $rootScope, $location){
    console.log("PanelHeaderCtrl");
    $scope.usuario = {};
    $scope.logout = function(){
    	console.log("Deslogear");

    };
});