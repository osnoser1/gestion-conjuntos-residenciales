function eventos(){
		$.ajax
	        ({
	        type: "POST",
	        url: "models/consultas-crearMensaje.php",
	        data: {id:10},
	        async: false,
	        dataType: "json",
	        success:
	        function (msg) 
	        {       
	         
	           var table=$('<table class="table table-hover" ></table>');

	           for(i=0; i<msg[0].m; i++){
	               	var tr="";
		           
		           	tr=$("<tr id="+msg[i].idMensaje+" ></tr>"); 
					var td1=$('<td ></td>').text(msg[i].asunto);
		           	var td2=$('<td></td>').text("administrador");
		           	var td3=$('<td></td>').html("<b>"+msg[i].descripcion+"</b>");
		           	var td4=$('<td></td>').text(msg[i].fecha);
		           	var td5=$('<td ></td>').html('<button type="button" class="ver btn btn-default btn-xs" name="'+msg[i].idMensaje+'">	<span class="glyphicon glyphicon-eye-open"></span></button>');
	           	  	var td6=$("<td ></td>").html('<button type="button" class="eliminar btn btn-default btn-xs" name="'+msg[i].idMensaje+'">	<span class="glyphicon glyphicon-remove"></span></button>');
		           	tr.append(td1);
		           	tr.append(td2);
		           	tr.append(td3);
		           	tr.append(td4);
	           		tr.append(td5);
	           		tr.append(td6);
		           	table.append(tr);              
	           }
	          
	          $('#contenido').append(table);
	        },
	        error:
	        function (msg) {alert( msg +"No se pudo realizar la conexion");}
	        });

         $('.ver').click(function(){
        	idMensaje = $(this).attr('name'); 
        	
        	console.log(idMensaje );
        	$('#mensajes').fadeOut(function(){
        		$.ajax
		        ({
		        type: "POST",
		        url: "models/consultas-crearMensaje.php",
		        data: {id:11, idMensaje:idMensaje},
		        async: false,
		        dataType: "json",
		        success:
		        function (msg) 
		        {       
			         de.innerHTML="administrador";
			         titulo.innerHTML=msg[0].asunto;
			         fecha.innerHTML=msg[0].fecha;
			         para.innerHTML=msg[0].para;
			         descripcion.innerHTML=msg[0].descripcion;
			         bodymensaje.innerHTML=msg[0].descripcion;
			          $('#mensajeabierto').fadeIn(); 
		          
		        },
		        error:
		        function (msg) {alert( msg +"No se pudo realizar la conexion");}
		        });
        	});
        	
		
        });
      

         $('#marcar').click(function(){
         	console.log("sdassdasd: " + idMensaje);
         	$.ajax
		        ({
		        type: "POST",
		        url: "models/consultas-crearMensaje.php",
		        data: {id:9, idMensaje:idMensaje},
		        async: false,
		        dataType: "json",
		        success:
		        function (msg) 
		        {       
			         
		          
		        },
		        error:
		        function (msg) {alert( msg +"No se pudo realizar la conexion");}
		        });
         });          

        $('#confirmacion').click(function(){		          
        	$.ajax
		        ({
		        type: "POST",
		        url: "models/consultas-crearMensaje.php",
		        data: {id:12, idMensaje:idMensajeEliminar},
		        async: false,
		        dataType: "json",
		        success:
		        function (msg) 
		        {       
					$('#myModal').modal('hide');
					if(msg=="true"){
						$('#mensajeabierto').fadeOut(function(){
							$('#mensajes').fadeIn();
							show({message: {text: "El Mensaje ha sido eliminado exitosamente"}, type: 'success'});
							$('#' + id).remove();
						});
						
						
					}   
		        },
		        error:
		        function (msg) {alert( msg +"No se pudo realizar la conexion");}
		        });

        });
			$('.eliminar').click(function(){
	        	id=$(this).attr('name');
	        	idMensajeEliminar=id;
	        	console.log("click en boton" + id);
	        	$('#myModal').modal('show');

	        });
		 	var idMensajeEliminar="";

		 	 $('#atras').click(function(){
        		$('#mensajeabierto').fadeOut(function(){
        			$('#mensajes').fadeIn();
        		});
       		 });
}