var myApp = angular.module('myApp');

myApp.controllerProvider.register('UsuarioRecuperarContrasenaCtrl', function($scope, $http, $q, $filter, $timeout, $rootScope, $location) {
	console.log("Controlador Recuperar contraseña");
	$scope.recuperarContrasena = function(user) {
		$http.post(location.pathname + 'models/usuario-recuperar-contrasena.php', $.param({correo: user.correo}), {timeout: 10000, headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
            ).success(function(data, status, headers, config) {
                console.log("data3");
                console.dir(data);
                if(data === 'true'){
                	show({message: {text: "Correo enviado exitosamente."}, type: 'success'});
                	$scope.user.correo = [];
                }
                else
                	show({message: {text: "El correo indicado no está registrado."}, type: 'danger'});
        }).error($scope.error);
	};
});
