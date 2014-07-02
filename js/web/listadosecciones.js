function eventos () {
	idModificar="";
	 $.ajax
        ({
            type: "POST",
            url: "models/consultas-crearseccion.php",
            data: {id: 2},
            async: false,
            dataType: "json",
            success:
            function(msg)
            {

            for (var i =0; i<msg[0].m; i++) {
                $('#contenedor2').append('<div id="'+msg[i].id+'" ><div><button class="eliminar btn btn-primary btn-xs" data-toggle="modal" data-target="#myModaleliminar" style="position: absolute; right:25px;" name='+msg[i].id+'>X</button><h4><b>'+msg[i].titulo+'</b></h4></div><div  style="height:120px;  overflow: auto; border:1px solid #ccc; border-top-left-radius: 4px;     border-bottom-left-radius: 4px;     border-top-right-radius: 4px border-bottom-right-radius: 4px;" class="form-control">'+msg[i].contenido+'</div><button class="modificar btn btn-default btn-xs"  name='+msg[i].id+' data-toggle="modal" data-target="#myModal" ><span class="glyphicon glyphicon-pencil" title="Modificar Seccion"></span> Modificar</button></div>');
            }
                    
          },
          error:
          function (msg) {alert( msg +"No se pudo realizar la conexion");}
          });

		$(document).on('click', '.modificar', (function(e) {
			idseccion = $(this).attr('name');  
			
			$.ajax
	        ({
				type: "POST",
				url: "models/consultas-crearseccion.php",
				data: {id:4, idseccion:idseccion},
				async: false,
				dataType: "json",
				success:
				function(msg)
				{
					Titulo.value=msg[0].titulo;
					$('.summernote').code(msg[0].contenido);
					idModificar=idseccion;
				    
				},
				error:
				function (msg) {alert( msg +"No se pudo realizar la conexion");}
				});

		}));

		$(document).on('click', '#modificar', (function(e) {

			if(Titulo.value!=""&&$('.summernote').code()!=""){
				$.ajax
		        ({
		            type: "POST",
		            url: "models/consultas-crearseccion.php",
		            data: {id:3, idseccion:idModificar, titulo:Titulo.value, contenido:$('.summernote').code()},
		            async: false,
		            success:
		            function (msg) 
		            {       
		               $('#myModal').modal('hide');
		               document.getElementByID(_)
		               show({message: {text: "Seccion modificado exitosamente"}, type: 'success'});
		           },
		           error:
		           function (msg) {console.log( msg);}
		       });
			}else{

			}

		}));


		$(document).on('click', '.eliminar', (function(e) {
			idseccion = $(this).attr('name'); 
			$(document.getElementById(idseccion)).fadeOut();
		}));
}