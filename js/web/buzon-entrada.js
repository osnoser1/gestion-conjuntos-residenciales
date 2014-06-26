function eventos(){
		$.ajax
	        ({
	        type: "POST",
	        url: "models/consultas-crearMensaje.php",
	        data: {id:6},
	        async: true,
	        dataType: "json",
	        success:
	        function (msg) 
	        {       
	         
	           var table=$('<table class="table table-hover" ></table>');
               var ul=$('<ul class="pagination" ></ul>');
	   	           for(i=0; i<=msg[0].paginas; i++){
			           	var li=$('<li></li>');
			           	li.html("<a  name="+i+" class='enlaces' >"+i+"</a>");
			           	ul.append(li);
			           	console.log(i);
		           }
	           $('#paginas').append(ul);	          
	           $('#contenido').append(listarmensajes(msg, table));
	        },
	        error:
	        function (msg) {alert( msg +"No se pudo realizar la conexion");}
	        });


		$(document).on('click', '.ver', (function(e) {
      

      //  $('.ver').click(function(){
        	idMensaje = $(this).attr('name');    	
        	$(document.getElementById(idMensaje)).removeClass('info');
        	$('#mensajes').fadeOut(function(){
        		$.ajax
		        ({
		        type: "POST",
		        url: "models/consultas-crearMensaje.php",
		        data: {id:7, idMensaje:idMensaje},
		        async: true,
		        dataType: "json",
		        success:
		        function (msg) 
		        {       
			         de.innerHTML="administrador";
			         titulo.innerHTML=msg[0].asunto;
			         fecha.innerHTML=msg[0].fecha;
			         descripcion.innerHTML=msg[0].descripcion;
			         bodymensaje.innerHTML=msg[0].descripcion;
			          $('#mensajeabierto').fadeIn(); 
		          
		        },
		        error:
		        function (msg) {alert( msg +"No se pudo realizar la conexion");}
		        });
        	});
        	
		
        }));
      

         $('#marcar').click(function(){
         	console.log("sdassdasd: " + idMensaje);
         	$.ajax
		        ({
		        type: "POST",
		        url: "models/consultas-crearMensaje.php",
		        data: {id:9, idMensaje:idMensaje},
		        async: true,
		        dataType: "json",
		        success:
		        function (msg) 
		        {       
			         
		          $(document.getElementById(idMensaje)).addClass('info');
		        },
		        error:
		        function (msg) {alert( msg +"No se pudo realizar la conexion");}
		        });
         });

          $('#atras').click(function(){

        	$('#mensajeabierto').fadeOut(function(){
        /*		$.ajax
	        ({
	        type: "POST",
	        url: "models/consultas-crearMensaje.php",
	        data: {id:6},
	        async: false,
	        dataType: "json",
	        success:
	        function (msg) 
	        {       
	         contenido.innerHTML="";
	           var table=$('<table class="table table-hover" ></table>');

	           for(i=0; i<msg[0].m; i++){
	               	var tr="";
		           	if(msg[i].leido==0)
			           	 tr=$("<tr id="+msg[i].idMensaje+" class='info'></tr>");          	
		           	else
		           		 tr=$("<tr id="+msg[i].idMensaje+" ></tr>"); 
	       			var td1=$('<td ></td>').text(msg[i].asunto);
		           	var td2=$('<td></td>').text("administrador");
		           	var td3=$('<td></td>').html("<b>"+msg[i].descripcion+"</b>");
		           	var td4=$('<td></td>').text(msg[i].fecha);
		           	tr.append(td1);
		           	tr.append(td2);
		           	tr.append(td3);
		           	tr.append(td4);
		           	table.append(tr);           
	           }
	          
	          $('#contenido').append(table);
	        },
	        error:
	        function (msg) {alert( msg +"No se pudo realizar la conexion");}
	        });*/
        		$('#mensajes').fadeIn();
        	});
        });

        $('#confirmacion').click(function(){		          
        	$.ajax
		        ({
		        type: "POST",
		        url: "models/consultas-crearMensaje.php",
		        data: {id:8, idMensaje:idMensajeEliminar},
		        async: true,
		        dataType: "json",
		        success:
		        function (msg) 
		        {       
					$('#myModal').modal('hide');
					if(msg=="true"){
						
						show({message: {text: "El Mensaje ha sido eliminado exitosamente"}, type: 'success'});
						$('#' + id).remove();
					}  
		        },
		        error:
		        function (msg) {alert( msg +"No se pudo realizar la conexion");}
		        });

        });
        	$(document).on('click', '.eliminar', (function(e) {
       		//$('.eliminar').click(function(){
	        	id=$(this).attr('name');
	        	idMensajeEliminar=id;
	        
	        	$('#myModal').modal('show');

	        }));
	        $(document).on('click', '.enlaces', (function(e) {
	     //   $('a.enlaces').click(function(){
	        	pagina=$(this).attr('name');
	        	console.log(pagina);
	        	$.ajax
		        ({
		        type: "POST",
		        url: "models/consultas-crearMensaje.php",
		        data: {id:13, pagina:pagina},
		        async: true,
		        dataType: "json",
		        success:
		        function (msg) 
		        {       
		        	$('#contenido').html("");
					var table=$('<table class="table table-hover" ></table>');


		           $('#paginas').empty();
		           console.log("Paginas " + msg[0].paginas);
		            var ul=$('<ul class="pagination" ></ul>');
		   	           for(i=0; i<=msg[0].paginas; i++){
				           	var li; 
				           	if(msg[0].paginaactual==i){
				           		li=$('<li class="active"></li>');
				           		li.html("<a  class='enlaces' name="+i+" >"+i+"</a>");
				           	}
				           	
				           else{
					           	li=$('<li></li>');
					           	li.html("<a   name="+i+" class='enlaces' >"+i+"</a>");
				           }
				           	
				           	ul.append(li);
				           	console.log("pagina actual " + msg[0].paginaactual);
			           }
		           $('#paginas').append(ul);		          
		          $('#contenido').append(listarmensajes(msg, table)); 
		        },
		        error:
		        function (msg) {alert( msg +"No se pudo realizar la conexion");}
		        });

	        }));
	 
			$('#simple').click(function(){	
	 			console.log("click en simple");
	 			$('#fecha').prop('checked', false);	 
	 			$(busquedapofecha2).fadeOut();			
	 			$(busquedapofecha).fadeOut(function(){
	 				
	 				$(busquedasimple).fadeIn();
	 			});

	 		});
	 		
	 		$('#fecha').click(function(){	
	 			console.log("click en fecha");
	 			$('#simple').prop('checked', false);
	 			$(busquedasimple).fadeOut(function(){
	 					$(busquedapofecha).fadeIn();
	 					$(busquedapofecha2).fadeIn();
	 			});
	 			
	 		});
	 		$('#buscarporfecha').click(function(){	
	 			console.log(fechadesde.value + "  " + fechahasta.value);

	 		});
	 		$('#buscar').click(function(){	
	 		 if(tbuscar.value!=""){
	 		 	$.ajax
		        ({
		        type: "POST",
		        url: "models/consultas-crearMensaje.php",
		        data: {id:14, mensaje:tbuscar.value},
		        async: true,
		        dataType: "json",
		        success:
		        function (msg) 
		        {       
					$('#contenido').html("");
					var table=$('<table class="table table-hover" ></table>');


		           $('#paginas').empty();
		           console.log("Paginas " + msg[0].paginas);
		            var ul=$('<ul class="pagination" ></ul>');
		   	           for(i=0; i<=msg[0].paginas; i++){
				           	var li; 
				           	if(msg[0].paginaactual==i){
				           		li=$('<li class="active"></li>');
				           		li.html("<a  class='enlaces' name="+i+" >"+i+"</a>");
				           	}
				           	
				           else{
					           	li=$('<li></li>');
					           	li.html("<a   name="+i+" class='enlaces' >"+i+"</a>");
				           }
				           	
				           	ul.append(li);
				           	console.log("pagina actual " + msg[0].paginaactual);
			           }
		           $('#paginas').append(ul);		          
		          $('#contenido').append(listarmensajes(msg, table)); 
		          
		        },
		        error:
		        function (msg) {alert( msg +"No se pudo realizar la conexion");}
		        });
	 		 }

	 		 else{
	 		 	show({message: {text: "¡Error Debe escribir algun titulo o descripcion!"}, type: 'danger'});
	 		 }
	 			
	 			
	 		});
	 var idMensajeEliminar="";


	 function listarmensajes(msg, table){
	 	 for(i=0; i<msg[0].m; i++){
	               	var tr="";
		           	if(msg[i].leido==0)
			           	 tr=$("<tr id="+msg[i].idMensaje+" class='info'></tr>");          	
		           	else
		           		 tr=$("<tr id="+msg[i].idMensaje+" ></tr>"); 
	       			var td1=$('<td ></td>').text(msg[i].asunto);
		           	var td2=$('<td></td>').text("administrador");
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
}
