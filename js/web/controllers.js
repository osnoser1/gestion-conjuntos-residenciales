'use strict';
/* Controllers */

var pruebaControllers = angular.module('myControllers', []);

pruebaControllers.controller('PrincipalCtrl', function($state, $scope, $http, $location, $sce, $rootScope) {
    $scope.cargando = false;
    $scope.error = function(data) {
        console.log(data);
        if (typeof data !== "object") {
            $('.modal-content').html(data);
            $('#myModal').modal('show');
            show({message: {text: "Error en el servidor."}, type: 'danger'});
        } else {
            show({message: {text: data.aviso}, type: 'danger'});
        }
        $scope.cargando = false;
    };
    $scope.showConfirmDialog = function(params, success) {
        $scope.successDialog = success;
        if (params.src && params.message) {
            console.log('No puede existir atributos html y message al mismo tiempo');
            return;
        }
        var o;
        if (params.message) {
            o = {title: "", message: "Mensaje de prueba."};
        } else {
            o = {title: ""};
        }
        $.extend(o, params);
        var modalHtml = "";
        if (o.title !== "") {
            modalHtml = '<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title">' + o.title + '</h4></div>';
        }
        if (params.message)
            modalHtml += '<div class="modal-body">' + o.message + '</div>';
        else
            modalHtml += '<div class="modal-body"><div ng-include src="' + o.src + '"></div></div>';
        modalHtml += '<div class="modal-footer"><button data-ui-ladda="myModalAccept" class="btn btn-primary ladda-button" data-style="zoom-in" ng-click="successDialog()"><span class="ladda-label">Aceptar</span></button><button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button></div>';
        $scope.modalHtml = modalHtml;
        $('#myModal').modal({show: true, backdrop: 'static'});
    };
    $scope.showDialog = function(params) {
        var o = {title: "", message: "Mensaje de prueba."};
        $.extend(o, params);
        var modalHtml = "";
        if (o.title !== "") {
            modalHtml = '<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title">' + o.title + '</h4></div>';
        }
        modalHtml += '<div class="modal-body">' + o.message + '</div>';
        $scope.modalHtml = modalHtml;
        $('#myModal').modal('show');
    };
});

pruebaControllers.controller('LoginCtrl', ['$scope', '$state', '$location', '$http', function($scope, $state, $location, $http) {
        $scope.login = function(user) {
            $state.go('panel');
        };
    }]);

pruebaControllers.controller('PanelCtrl', function($scope, $http, $location) {
    $scope.header = "partials/panel-header.html";
});

pruebaControllers.controller('PanelHeaderCtrl', function($scope, $http) {
    $scope.header = "partials/panel-header.html";
    $scope.header = "partials/panel-header.html";
    $scope.CrearMensaje = function(datos) {
        console.log($('.summernote').code());
        if (para.value != "" && Titulo.value != "" && $('.summernote').code() != "") {
            $.ajax
                    ({
                        type: "POST",
                        url: "models/consultas-crearMensaje.php",
                        data: {id: 5, para: para.value, titulo: Titulo.value, mensaje: $('.summernote').code()},
                        async: false,
                        dataType: "json",
                        success:
                                function(msg)
                                {
                                    console.log(msg);
                                    show({message: {text: "El Mensaje ha sido enviado exitosamente"}, type: 'success'});
                                    para.value = "";
                                    titulo:Titulo.value = "";
                                    $('.summernote').code("");
                                },
                        error:
                                function(msg) {
                                    alert(msg + "No se pudo realizar la conexion");
                                }
                    });

        }
        else {
            show({message: {text: "Debe llenar todos los campos para poder enviar el mensaje"}, type: 'danger'});
        }
    };
});



function show(params) {
    $('.bottom-right').notify(params).show();
}

function alert(options) {
    var o = {html: "", enable: true};
    $.extend(o, options);
    $('.alert').html(o.html);
    if (o.enable) {
        $('.alert').css('display', 'flex');
        $('.alert').addClass('in');
    } else {
        $('.alert').removeClass('in');
        $('.alert').css('display', 'block');
    }
}

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};
