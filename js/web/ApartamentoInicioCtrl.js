/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var myApp = angular.module('myApp');

myApp.controllerProvider.register('ApartamentoInicioCtrl', function($scope, $http, $q, $filter, $timeout, $rootScope) {
    /*$scope.today = function() {
     $scope.dt = new Date();
     };
     $scope.today();
     $scope.clear = function() {
     $scope.dt = null;
     };

     $scope.ListarApartamento = function(element) {


     var mensaje = '<form class="form-horizontal" role="form">'
     + '<h1> Lista Apartamento</h1>'
     + '<div class="list-group text-center">'
     + '<div class="list-group-item row no-select active cabecera">'
     + '<span class="badge pull-left">#</span>'
     + '<p ng-dblclick="" class="col-xs-2">Id</p>'
     + '<p ng-dblclick="" class="col-xs-2">Tipo</p>'
     + '<p ng-dblclick="" class="col-xs-2">Tamano</p>'
     + '<p ng-dblclick="" class="col-xs-2">NumHabitaciones</p>'
     + '<p ng-dblclick="" class="col-xs-2">NumBanos</p>'
     + '<p ng-dblclick="" class="col-xs-2">Sala</p>'
     + '<p ng-dblclick="" class="col-xs-2">Comedor</p>'
     + '<p ng-dblclick="" class="col-xs-2">Cocina</p>'
     + '<p ng-dblclick="" class="col-xs-2">Lavandero</p>'
     + '</div>'
     + '<div class="list-group">'
     + '<div class="list-group-item row no-select" ng-repeat="element in datos.Apartamentos" >'
     + '<p class="col-xs-1">{{element.idApartamento}}</p>'
     + '<p class="col-xs-2 pointer">' + element.TipoApartamento + '</p>'
     + '<p class="col-xs-2 pointer">' + element.Tamano + '</p>'
     + '<p class="col-xs-2 pointer">' + element.NumHabitaciones + '</p>'
     + '<p class="col-xs-2 pointer">' + element.NumBanos + '</p>'
     + '<p class="col-xs-2 pointer">' + element.Sala + '</p>'
     + '<p class="col-xs-2 pointer">' + element.Comedor + '</p>'
     + '<p class="col-xs-2 pointer">' + element.Cocina + '</p>'
     + '<p class="col-xs-2 pointer">' + element.Lavandero + '</p>'
     + '</div>'
     + '</div>'
     + '</div>'
     + '</form>';
     $scope.showDialog({title: "Listar Apartamento", messange: mensaje});
     };*/
});

