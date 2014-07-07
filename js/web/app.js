'use strict';

var myApp = angular.module('myApp', ['ui.router', 'myControllers', 'myServices', 'ngTagsInput', 'ngResource', 'ui.ladda', 'mgcrea.ngStrap', 'nya.bootstrap.select', 'ngAnimate', 'angular-loading-bar', 'ngSanitize']);


myApp.config(['$stateProvider', '$urlRouterProvider', '$controllerProvider',
    function($stateProvider, $urlRouterProvider, $controllerProvider, $datepickerProvider) {
        var comprobarLogin = function() {
            $http.get(url + 'usuario/usuarioLogueado').success(function(data) {
                console.log('IDUsuario logeado: ' + data);
                if ((typeof data === 'undefined' || data === "") && $location.path() !== "/web") {
                    $location.path("web/login");
                }
            });
        };
        myApp.controllerProvider = $controllerProvider;
        var templateUrl = function(stateParams) {
            console.log(stateParams);
            console.log("Comprobando Login");

            $.ajax
                    ({
                        type: "POST",
                        url: "models/consultas-crearseccion.php",
                        data: {id: 12},
                        async: true,
                        //dataType: "json",
                        success:
                                function(msg)
                                {
                                    if (msg === "fallo") {
                                        console.log(url);
                                        location.href = location.pathname + '#/web/login';
                                        return;
                                    }
                                },
                        error:
                                function(msg) {
                                    console.log("Error comprobando login");
                                }
                    });
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
        //$locationProvider.html5Mode(true);

    /*    myApp.controllerProvider.register('PanelHeaderCtrl', function($scope, $http, $q, $filter, $timeout, $rootScope, $location) {
    console.log("desde app.js");

});*/
    }
]);
