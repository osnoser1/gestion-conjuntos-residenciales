'use strict';

var myApp = angular.module('myApp', ['ui.router', 'myControllers', 'myServices']);

myApp.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");
        $stateProvider.state('index', {
            url: "/",
            templateUrl: 'partials/principal.html'
        }).state('state2', {
            url: "/:page",
            templateUrl: function(stateParams) {
                console.log(stateParams);
                return 'partials/' + stateParams.page + '.html';
            }
        });
//        $locationProvider.html5Mode(true);
    }
]);