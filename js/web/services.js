
/* Services */

var myServices = angular.module('myServices', ['ngResource']);

myServices.factory('Facebook', function($rootScope, $q) {
    return {
        getUserInfo: function() {
            var _user = $q.defer();
            FB.api('/me', function(response) {
                $rootScope.$apply(function() {
                    _user.resolve(response);
                });
            });
            return _user.promise;
        },
        login: function(success, fail) {
            FB.login(function(response) {
                if (response.authResponse) {
                    success(response);
                } else {
                    if (typeof fail !== 'undefined')
                        fail('User cancelled login or did not fully authorize.');
                }
            });
        },
        logout: function(success) {
            FB.logout(success);
        }
    };
});

myServices.factory('Auth', function($http, $location, $q, $rootScope, Facebook) {
//    var currentUser = $cookieStore.get('user');  //|| {usuario: '', role: 3};
//    console.log(currentUser);
//      $cookieStore.remove('user');
    var conexion = {email: 1, fb: 2, gplus: 3};
    function changeUser(user) {
//        _.extend(currentUser, user);
        localStorage.setItem("user", JSON.stringify(user));
    }
    return {
        registro: function(user, success, error, conexion) {
            if (conexion === this.conexion.fb) {
                Facebook.login(function(response) {
                    console.log('Welcome!  Fetching your information.... ');
                    Facebook.getUserInfo().then(function(user) {
                        console.log(response);
                        console.log('Good to see you, ' + user.name + '.');
                        $http.post('controllers/c-sign-usuario.php', {'funcion': 'registroFacebook', 'datos': user}).success(function(data) {
                            changeUser(data.user);
                            success(data);
                        }).error(error);
                    });
                });
            } else if (conexion === this.conexion.gplus) {

            } else if (conexion === this.conexion.email) {
                $http.post('controllers/c-sign-usuario.php', {'funcion': 'registroUsuario', 'datos': user}).success(function(data) {
                    if (data.respuesta) {
                        success(data);
                    } else {
                        error(data);
                    }
                }).error(error);
            }
        },
        login: function(user, success, error, conexion) {
            var done = function(data) {
                if (data.respuesta) {
                    changeUser(data.user);
                    success(data);
                } else {
                    error(data);
                }
            };
            if (conexion === this.conexion.email) {
                $http.post('controllers/c-sign-usuario.php', {'funcion': 'login', 'datos': user}).success(done).error(error);
            }
        },
        forgotPassword: function(datos, success, error) {
            $http.post('controllers/c-sign-usuario.php', {'funcion': 'forgotPassword', 'datos': datos}).success(function(data) {
                if (data.respuesta) {
                    success(data);
                } else {
                    error(data);
                }
            }).error(error);
        },
        logout: function(success, error) {
            $http.post('controllers/c-sign-usuario.php', {'funcion': 'logout'}).success(function(data) {
                if (data.respuesta) {
                    localStorage.removeItem("user");
                    success(data);
                } else {
                    error(data);
                }
            }).error(error);
        },
        isLoggedIn: function() {
            var user = localStorage.getItem("user");
            if (user === null)
                return;
            var logged = false;
            $.ajax({
                type: "POST", dataType: 'json',
                url: 'controllers/c-sign-usuario.php', data: {'funcion': 'isLoggedIn', 'datos': user},
                async: false})
                    .done(function(data) {
//                        $rootScope.$apply(function() {
                        logged = data.respuesta;
//                        console.log(data.respuesta);
//                        });
                    })
                    .fail(function(jqXHR, textStatus, errorThrown) {
                        console.log('Error al ejecutar la petición.',
                                jqXHR.responseText + '<br>' + textStatus +
                                '<br>' + errorThrown);
                    });
            return logged;
        }, user: function() {
            return JSON.parse(localStorage.getItem("user"));
        }, conexion: conexion
    };
});