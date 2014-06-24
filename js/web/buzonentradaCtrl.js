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

 	

 	
 		fecha = $filter('date')(nuevo.fecha, $scope.datos.format);
 			
 	
 });