/*'use strict';*/
/* Controllers */
/*var myApp = angular.module('myApp');

myApp.controllerProvider.register('buzonentradaCtrl', function($scope, $http, $q, $filter, $timeout, $rootScope, , ['ngGrid']) {
			$http.post('models/consultas-crearMensaje.php', {'funcion': 'obtenermensaje'}).success(function(data) {
                 */              
			// var table=$('<table class="table table-hover" ></table>');

			// for(i=0; i<data[0].m; i++){
			// 	var tr="";
			// 	if(data[i].leido==0)
			//    	 tr=$('<tr ng-click="tr()" id="'+data[i].idMensaje+'" class="info"></tr>');          	
			// 	else
			// 		 tr=$('<tr ng-click="tr()" id="'+data[i].idMensaje+'" ></tr>'); 
			// 	var td1=$('<td ></td>').text(data[i].asunto);
			// 	var td2=$('<td></td>').text("administrador");
			// 	var td3=$('<td></td>').html("<b>"+data[i].descripcion+"</b>");
			// 	var td4=$('<td></td>').text(data[i].fecha);
			// 	tr.append(td1);
			// 	tr.append(td2);
			// 	tr.append(td3);
			// 	tr.append(td4);
			// 	table.append(tr);           
			// }	          
			// $('#contenido').append(table);

		
/*            }).error(function(data, status) {
                console.log(data + '\n' + status);
            });

    
});*/

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 'use strict';
 /* Controllers */
 var myApp = angular.module('myApp');

 myApp.controllerProvider.register('buzonentradaCtrl', function($scope, $http, $q, $filter, $timeout, $rootScope) {

 	

 	$scope.nuevo = {
 		idbanco: '',
 	};
 	$scope.datos = {
 		format: 'dd-MM-yyyy',
 	};


 	$scope.Calendario = function(nuevo){
 		
 		
 		nuevo.fecha = $filter('date')(nuevo.fecha, $scope.datos.format);
	
 			
 	}
 	$scope.Calendario2 = function(nuevo){
 		
 		
 		
		nuevo.fecha2 = $filter('date')(nuevo.fecha2, $scope.datos.format);
 			
 	}

 	$scope.BuscarPorFecha=function(nuevo){
 		
 		if(ValidarFecha(fechadesde.value)&&ValidarFecha(fechahasta.value)){
 			$rootScope.loading = true;
	 		$.ajax
		        ({
		        type: "POST",
		        url: "models/consultas-crearMensaje.php",
		        data: {id:15, desde:fechadesde.value, hasta:fechahasta.value},
		        async: true,
		        dataType: "json",
		        success:
		        function (msg) 
		        {      
					$('#contenido').html("");
					var table=$('<table class="table table-hover" ></table>');
					$('#contenido').append(listarmensajes(msg, table)); 
					console.log(msg);
		        },
		        error:
		        function (msg) {alert( msg +"No se pudo realizar la conexion");}
		        });
	 		$rootScope.loading = false;
 		}
 		else{
 			show({message: {text: "¡Error Coloque una fecha valida!"}, type: 'danger'});
 		}
 	}
 	function listarmensajes(msg, table){
	 	 for(i=0; i<msg[0].m; i++){
	               	var tr="";
		           	if(msg[i].leido==0)
			           	 tr=$("<tr id="+msg[i].idMensaje+" class='info'></tr>");          	
		           	else
		           		 tr=$("<tr id="+msg[i].idMensaje+" ></tr>"); 
	       			var td1=$('<td ></td>').text(msg[i].asunto);
		           	var td2=$('<td></td>').text(msg[i].de);
		           	var td3=$('<td></td>').html("<b>"+msg[i].descripcion+"</b>");
		           	var td4=$('<td></td>').text(msg[i].fecha);
		           	var td5=$('<td ></td>').html('<button type="button" class="ver btn btn-default btn-xs" name="'+msg[i].idMensaje+'" data-toggle="tooltip" data-placement="top" title="Ver">	<span class="glyphicon glyphicon-eye-open"></span></button>');
	           	  	var td6=$("<td ></td>").html('<button type="button" class="eliminar btn btn-default btn-xs" name="'+msg[i].idMensaje+'" data-toggle="tooltip" data-placement="top" title="Eliminar">	<span class="glyphicon glyphicon-remove"></span></button>');
		           	tr.append(td1);
		           	tr.append(td2);
		           	tr.append(td3);
		           	tr.append(td4);
	           		tr.append(td5);
	           		tr.append(td6);
		           	table.append(tr);  
      
	           }
	      return table;
	 }

	 function ValidarFecha(fecha)
		{
		var dtRegex = new RegExp(/\b\d{1,2}[\/-]\d{1,2}[\/-]\d{4}\b/);
		return dtRegex.test(fecha);
		}

 });