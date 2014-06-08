function eventos(){
		$.ajax
	        ({
	        type: "POST",
	        url: "models/consultas-crearMensaje.php",
	        data: {id:6},
	        async: false,
	        dataType: "json",
	        success:
	        function (msg) 
	        {       
	         
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
	        });

        $('tr').live("click",function(){ 
        	idMensaje = $(this).attr('id'); 
        	$('#mensajes').fadeOut(function(){
        		$.ajax
		        ({
		        type: "POST",
		        url: "models/consultas-crearMensaje.php",
		        data: {id:7, idMensaje:idMensaje},
		        async: false,
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
        	
		
        });

        $('#atras').click(function(){

        	$('#mensajeabierto').fadeOut(function(){
        		$.ajax
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
	        });
        		$('#mensajes').fadeIn();
        	});
        });

        $('#eliminar').click(function(){
        	$('#myModal').modal('show');

        });

        $('#confirmacion').click(function(){		          
        	$.ajax
		        ({
		        type: "POST",
		        url: "models/consultas-crearMensaje.php",
		        data: {id:8, idMensaje:idMensaje},
		        async: false,
		        dataType: "json",
		        success:
		        function (msg) 
		        {       
					$('#myModal').modal('hide');
					if(msg=="true"){
						show({message: {text: "El Mensaje ha sido eliminado exitosamente"}, type: 'success'});
					}   
		        },
		        error:
		        function (msg) {alert( msg +"No se pudo realizar la conexion");}
		        });

        });

}