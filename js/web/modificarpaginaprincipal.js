function eventos(){
	 $.ajax
    ({
        type: "POST",
        url: "models/consultas-crearseccion.php",
        data: {id:6},
        async: true,
        dataType: "json",
        success:
        function(msg)
        {

       
        	$('.summernote').code(msg[0].footer);
        	Titulo.value=msg[0].titulo;
      },
      error:
      function (msg) {alert( msg +"No se pudo realizar la conexion");}
  });
    	
		$(document).on('click', '#actualizarfootter', (function(e) {
		
		 $.ajax
        ({
            type: "POST",
            url: "models/consultas-crearseccion.php",
            data: {id:5, footer: $('.summernote').code()},
            async: true,
            dataType: "json",
            success:
            function(msg)
            {

           
               show({message: {text: "La seccion Footer ha sido actualizada"}, type: 'success'});
          },
          error:
          function (msg) {alert( msg +"No se pudo realizar la conexion");}
          });
	}));

		$(document).on('click', '#actualizartitulo', (function(e) {
		if(Titulo.value!="")
		 $.ajax
        ({
            type: "POST",
            url: "models/consultas-crearseccion.php",
            data: {id:7, titulo:Titulo.value},
            async: true,
            dataType: "json",
            success:
            function(msg)
            {
           
               show({message: {text: "Se ha actualizado el titulo"}, type: 'success'});
          },
          error:
          function (msg) {alert( msg +"No se pudo realizar la conexion");}
          });
        else{
        	alertaTitulo.innerHTML='<div class="alert alert-danger">No puede estar vacio este campo</div>';
        }
	}));

	$(document).on('click', '#actualizarimagen', (function(e) {
		  var archivos = document.getElementById("archivos");//Damos el valor del input tipo file
		  var archivo = archivos.files; //Obtenemos el valor del input (los arcchivos) en modo de arreglo
		  var data = new FormData();

		  for(i=0; i<archivo.length; i++){
		    data.append('archivo'+i,archivo[i]);
		  }
	


		$.ajax({
			url:'models/subirimagen.php', //Url a donde la enviaremos
			type:'POST', //Metodo que usaremos
			contentType:false, //Debe estar en false para que pase el objeto sin procesar
			data:data, 
			//Le pasamos el objeto que creamos con los archivos
			processData:false, //Debe estar en false para que JQuery no procese los datos a enviar
			cache:false //Para que el formulario no guarde cache
		}).done(function(msg){
			console.log(msg);
		});	

        
	}));
}