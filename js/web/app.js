'use strict';

var myApp = angular.module('myApp', ['ui.router', 'myControllers', 'myServices', 'ngTagsInput', 'ngResource', 'ui.ladda', 'mgcrea.ngStrap', 'nya.bootstrap.select', 'ngAnimate', 'angular-loading-bar']);

myApp.config(['$stateProvider', '$urlRouterProvider', '$controllerProvider',
    function($stateProvider, $urlRouterProvider, $controllerProvider) {
        myApp.controllerProvider = $controllerProvider;
        var templateUrl = function(stateParams) {
            console.log(stateParams);
            return 'partials/' + stateParams.page + '.html';
        };
        $urlRouterProvider.otherwise("/web");
        $stateProvider.state('home', {
            url: "/web",
            templateUrl: 'partials/principal.html'
        }).state('web', {
            url: "/web/:page",
            templateUrl: templateUrl
        }).state('panel', {
            url: "/panel",
            templateUrl: 'partials/panel.html'
        }).state('panel.views', {
            url: "/:page",
            templateUrl: templateUrl
        });
//        $locationProvider.html5Mode(true);
    }
]);
