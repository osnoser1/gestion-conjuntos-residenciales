function eventos (){  
 var idpostEliminar="";
 var tipousuario="";
 inicio();
 obtenerUsuario();
 function inicio(){
     $.ajax({
        type: "POST",
        url: "models/cartelera.php",
        data: {id:5},
        async: true,
        dataType: "json",
        success:
        function (msg){
            $('#paginas').empty();
            var ul=$('<ul class="pagination" ></ul>');
            for(i=0; i<=msg[0].paginas; i++){
                var li=$('<li></li>');
                li.html("<a  name="+i+" class='enlaces'>"+i+"</a>");
                ul.append(li);
        }
        $('#paginas').append(ul);
        cargarcartelera();
        },
        error:
        function (msg) {alert( msg +"No se pudo realizar la conexion");}
     });
};
function obtenerUsuario(){
      $.ajax
            ({
            type: "POST",
            url: "models/cartelera.php",
            data: {id:9},
            async: true,
            dataType: "json",
            success:
            function (msg) 
            {       console.log("privilegio: "+msg);
            tipousuario=msg;
              if(msg==="2"){
                $('#restringir').fadeIn();
              }
                
              },
            error:
            function (msg) {alert( msg +"No se pudo realizar la conexion");}
            });
}
$(document).on('click', '.enlaces', (function() {
        pagina=$(this).attr('name');
            console.log(pagina);
            $.ajax
            ({
            type: "POST",
            url: "models/cartelera.php",
            data: {id:7, pagina:pagina},
            async: true,
            dataType: "json",
            success:
            function (msg) 
            {    
        
             
               $('#paginas').empty();
               console.log("Paginas " + msg[0].paginas);
                var ul=$('<ul class="pagination" ></ul>');
                   for(i=0; i<=msg[0].paginas; i++){
                    var li; 
                    if(msg[0].paginaactual===i){
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
               $('#contenedor2').html("");
               for (var i =0; i<msg[0].m; i++) {
                  $('#contenedor2').append('<div><h4><b>'+msg[i].titulo+'</b></h4>');
                 if(tipousuario==2)
                    $('#contenedor2').append('<button class="eliminar btn btn-primary btn-xs" data-toggle="modal" data-target="#myModaleliminar" style="position: absolute; right:15px;" name='+msg[i].idpost+'>X</button><div>');
                  $('#contenedor2').append('<div style="height:120px;  overflow: auto; border:1px solid #ccc; border-top-left-radius: 4px;     border-bottom-left-radius: 4px;     border-top-right-radius: 4px border-bottom-right-radius: 4px;" class="form-control">'+msg[i].contenido+'</div>');
                 if(tipousuario==1)
                    $('#contenedor2').append('<a class="btn btn-default btn-xs" href="#/panel/crear-mensaje"><span class="glyphicon glyphicon-envelope"></a>');
                  $('#contenedor2').append('<span class="label label-primary">Publicado por:'+msg[i].usuario+'</span>');
                  $('#contenedor2').append('<span class="label label-primary" style="position: absolute; right:25px;">'+msg[i].fecha+'</span>');
                  $('#contenedor2').append('<div><hr style="border: 0; height: 0; box-shadow: 0 1px 5px 1px black;"><br></div>');
                }       
         
            },
            error:
            function (msg) {alert( msg +"No se pudo realizar la conexion");}
            });

          }));
   
  $(document).ready(function() {
    
  });

       $.ajax
        ({
        type: "POST",
        url: "models/cartelera.php",
        data: {id:1},
        async: true,
        dataType: "json",
        success:
        function (msg) 
        {
          for(i=0; i < msg[0].m; i++)
          {

            Edificios.options[i]= new Option (msg[i].nombre);
            Edificios.options[i].text = msg[i].nombre;
            Edificios.options[i].value = msg[i].idEdificio; 
           }
           $('#Edificios').multiselect('rebuild');
           $('#Edificios').multiselect({
		buttonText: function(options) {
		if (options.length === 0) {
		   return 'Seleccionar Edificios <b class="caret"></b>';
		}
		else if (options.length > 6) {
                        return options.length + ' selected  <b class="caret"></b>';
                    }
                    else {
                        var selected = '';
			options.each(function() {
                            selected += $(this).text() + ', ';
			});
                        return selected.substr(0, selected.length -2) + ' <b class="caret"></b>';
			}
			},
			            onChange: function(element, checked) {
			                if(checked === true) {
			                    //action taken here if true
			                }
			                else if(checked === false) {
			                    if(confirm('¿desea deseleccionar este elemento?')) {
			                        //action taken here
			                    }
			                    else {
			                        $("#Edificios").multiselect('select', element.val());
			                    }
			                }
			            }
			        });

       },
        error:
        function (msg) {alert( msg +"No se pudo realizar la conexion");}
        });

      $.ajax
        ({
        type: "POST",
        url: "models/cartelera.php",
        data: {id:1},
        async: true,
        dataType: "json",
        success:
        function (msg) 
        {
          Edificios2.options[0]= new Option ("");
            Edificios2.options[0].text = "seleccione un edificio";
            Edificios2.options[0].value ="" ; 
          for(i=0; i < msg[0].m; i++)
          {

            Edificios2.options[i+1]= new Option (msg[i].nombre);
            Edificios2.options[i+1].text = msg[i].nombre;
            Edificios2.options[i+1].value = msg[i].idEdificio; 
           }
           $('#Edificios2').multiselect('rebuild');

        },
        error:
        function (msg) {alert( msg +"No se pudo realizar la conexion");}
        });
 $.ajax
        ({
        type: "POST",
        url: "models/cartelera.php",
        data: {id:1},
        async: true,
        dataType: "json",
        success:
        function (msg) 
        {       
          Edificios3.options[0]= new Option ("");
            Edificios3.options[0].text = "seleccione un edificio";
            Edificios3.options[0].value ="" ; 
          for(i=0; i < msg[0].m; i++)
          {

            Edificios3.options[i+1]= new Option (msg[i].nombre);
            Edificios3.options[i+1].text = msg[i].nombre;
            Edificios3.options[i+1].value = msg[i].idEdificio; 

          }         
          $('#Edificios3').multiselect('rebuild'); 
          
        },
        error:
        function (msg) {alert( msg +"No se pudo realizar la conexion");}
        });

         $.ajax
        ({
        type: "POST",
        url: "models/cartelera.php",
        data: {id:1},
        async: true,
        dataType: "json",
        success:
        function (msg) 
        {
             Edificios4.options[0]= new Option ("");
            Edificios4.options[0].text = "seleccione un edificio";
            Edificios4.options[0].value ="" ; 
          for(i=0; i < msg[0].m; i++)
          {

            Edificios4.options[i]= new Option (msg[i].nombre);
            Edificios4.options[i].text = msg[i].nombre;
            Edificios4.options[i].value = msg[i].idEdificio; 
           }
           $('#Edificios4').multiselect('rebuild');

       },
        error:
        function (msg) {alert( msg +"No se pudo realizar la conexion");}
        });



       Edificios2.onchange = function () 
          { 
            idEdificio=Edificios2.value;
            console.log(idEdificio);
            $('#Pisos').empty();
            cargarpisos();
          };
           function cargarpisos(){
                $.ajax
                  ({
                  type: "POST",
                  url: "models/cartelera.php",
                  data: {id:2, idEdificio:Edificios2.value},
                  async: true,
                  dataType: "json",
                  success:
                  function (msg) 
                  {    
                      
                    
                    for(i=0; i < msg[0].m; i++)
                    {
                      Pisos.options[i]= new Option ("Piso " + msg[i].idPiso);
                      Pisos.options[i].text ="Piso " + msg[i].idPiso ;
                      Pisos.options[i].value = msg[i].idPiso; 
                    } 
                    $('#Pisos').multiselect('rebuild');
                  },
                  error:
                  function (msg) {alert( msg +"No se pudo realizar la conexion");}
                  });
          }
          Edificios3.onchange = function () 
          { 
            idEdificio=Edificios3.value;
            console.log(idEdificio);
            $('#Pisos2').empty();
            $('#Apartamentos').empty();
            $.ajax
                  ({
                  type: "POST",
                  url: "models/cartelera.php",
                  data: {id:2, idEdificio:Edificios3.value},
                  async: false,
                  dataType: "json",
                  success:
                  function (msg) {
                   Pisos2.options[0]= new Option ("");
            Pisos2.options[0].text = "seleccione un Piso";
            Pisos2.options[0].value ="" ; 
                    for(i=0; i < msg[0].m; i++)
                    {
                      Pisos2.options[i+1]= new Option ("Piso " + msg[i].idPiso);
                      Pisos2.options[i+1].text ="Piso " + msg[i].idPiso;
                      Pisos2.options[i+1].value = msg[i].idPiso; 
                    } 
                    $('#Pisos2').multiselect('rebuild');
$('#Pisos2').multiselect({
                  buttonText: function(options) {
                      if (options.length === 0) {
                          return 'seleccione un piso <b class="caret"></b>';
                      }
                      else if (options.length > 6) {
                          return options.length + ' selected  <b class="caret"></b>';
                      }
                      else {
                          var selected = '';
                          options.each(function() {
                              selected += $(this).text() + ', ';
                          });

                          return selected.substr(0, selected.length -2) + ' <b class="caret"></b>';
                      }
                  },
                  onChange: function(element, checked) {
                      if(checked === true) {
                          //action taken here if true
                      }
                      else if(checked === false) {
                          if(confirm('¿desea deseleccionar este elemento?')) {
                              //action taken here
                          }
                          else {
                              $("#Pisos2").multiselect('select', element.val());
                          }
                      }
                  }
              });
                  },
                  error:
                  function (msg) {alert( msg +"No se pudo realizar la conexion");}
                  });
          };
  

         Pisos2.onchange = function () 
          {   idPiso=Pisos2.value;
               $('#Apartamentos').empty();
                 console.log('´9idsadasdo0'+idPiso);
                $.ajax
                  ({
                  type: "POST",
                  url: "models/cartelera.php",
                  data: {id:3, idEdificio:Edificios3.value, idPiso:Pisos2.value},
                  async: false,
                  dataType: "json",
                  success:
                  function (msg) 
                  {    
                    console.log("Piso: "+ Pisos2.value + "Numero de apartamentos" + msg[0].m);
                    for(i=0; i < msg[0].m; i++)
                    {
                      Apartamentos.options[i]= new Option ("Apartamento" + msg[i].idapartamento);
                      Apartamentos.options[i].text ="Apartamento "+ msg[i].Nombre;
                    } 
                    $('#Apartamentos').multiselect('rebuild');
                    
                  },
                  error:
                  function (msg) {alert( msg +"No se pudo realizar la conexion");}
                  });
          };
          Edificios4.onchange = function () 
          {   idEdificio=Edificios4.value;
               $('#Apartamentos').empty();
                 console.log('´9idsadasdo0'+idEdificio);
                $.ajax
                  ({
                  type: "POST",
                  url: "models/cartelera.php",
                  data: {id:8, idEdificio:Edificios4.value},
                  async: true,
                  dataType: "json",
                  success:
                  function (msg) 
                  {    
                    for(i=0; i < msg[0].m; i++)
                    {
                      Apartamentos2.options[i]= new Option ("Apartamento" + msg[i].idapartamento);
                      Apartamentos2.options[i].text ="Apartamento "+ msg[i].Nombre;
                    }
                     $('#Apartamentos2').multiselect('rebuild');   
                  },
                  error:
                  function (msg) {alert( msg +"No se pudo realizar la conexion");}
                  });
          };


          $('#publicar').click(function(){
            if(titulo.value!==''&& $('.sumernote').code()!==""){
          
                $.ajax
                ({
                type: "POST",
                url: "models/cartelera.php",
                data: {id:4, para:titulo.value,contenido:$('.summernote').code()},
                async: true,
                dataType: "json",
                success:
                function () 
                {       
                           
                  $('#myModal').modal('hide');
                   show({message: {text: "El Mensaje ha sido enviado exitosamente"}, type: 'success'});
                 titulo.value="";
                    inicio();},
                error:
                function (msg) {alert( msg +"No se pudo realizar la conexion");}
                });
            }
            else
            {
             $('#myModal').modal('hide');
               show({message: {text: "Debe rellenar titulo y contenido"}, type: 'danger'});
            }


          });
          function cargarcartelera(){
                   $('#contenedor2').html("");

                $.ajax
                  ({
                  type: "POST",
                  url: "models/cartelera.php",
                  data: {id:5},
                  async: true,
                  dataType: "json",
                  success:
                  function (msg) 
                  {      
                    for (var i =0; i<msg[0].m; i++) {
                      $('#contenedor2').append('<div><h4><b>'+msg[i].titulo+'</b></h4>');
                      if(tipousuario==2){
                        $('#contenedor2').append('<button class="eliminar btn btn-primary btn-xs" data-toggle="modal" data-target="#myModaleliminar" style="position: absolute; right:15px;" name='+msg[i].idpost+'>X</button><div>');

                      }
                         
                         $('#contenedor2').append('<div style="height:120px;  overflow: auto; border:1px solid #ccc; border-top-left-radius: 4px;     border-bottom-left-radius: 4px;     border-top-right-radius: 4px border-bottom-right-radius: 4px;" class="form-control">'+msg[i].contenido+'</div>');
                         if(tipousuario==1)
                           $('#contenedor2').append('<a class="btn btn-default btn-xs" href="#/panel/crear-mensaje"><span class="glyphicon glyphicon-envelope"></a>');
                        $('#contenedor2').append('<span class="label label-primary">Publicado por: '+msg[i].usuario+'</span>');
                         $('#contenedor2').append('<span class="label label-primary" style="position: absolute; right:25px;">'+msg[i].fecha+'</span>');
                         $('#contenedor2').append('<div><hr style="border: 0; height: 0; box-shadow: 0 1px 5px 1px black;"><br></div>');
                    }
                            
                  },
                  error:
                  function (msg) {alert( msg +"No se pudo realizar la conexion");}
                  });
                  

      }
       $('#confirmacion').click(function(){             
          $.ajax
            ({
            type: "POST",
            url: "models/cartelera.php",
            data: {id:6, idpost:idpostEliminar},
            async: true,
            dataType: "json",
            success:
            function (msg) 
            {       
              $('#myModaleliminar').modal('hide');
              if(msg==="true"){          
               
                  show({message: {text: "La publicacion ha sido eliminado exitosamente"}, type: 'success'});
              
                   $('#contenedor2').html("");
                    inicio();
            
            }   
            },
            error:
            function (msg) {alert( msg +"No se pudo realizar la conexion");}
            });

        });
     $(document).on('click', '.eliminar', (function(e) {
            id=$(this).attr('name');
            idpostEliminar=id;
            console.log("click en boton" + id);     

          }));
      $(document).on('click', '#seeccionar', (function(e) {
          $('#Apartamentos').multiselect({
              enableFiltering: true
            });

        para.value="";
          if ($('#porpisos').attr('class')=="active") {
              if($('#Pisos').val()!=null){
                 /* console.log("por pisos " + $('#porpisos').attr('class'));
                  console.log($('#Pisos').val());*/
              }
              
          }
          if($('#porapartametos').attr('class')=="active"){
            if($('#Apartamentos').val()!=null){
              /*console.log("por apartamentos " +$('#porapartametos').attr('class'));
              console.log($('#Apartamentos').val());*/
            }
                  
          }
          if($('#poredificios').attr('class')=="active"){
             if($('#Edificios').val()!=null){
              /*console.log("por edificios " + $('#poredificios').attr('class'));*/
               console.log($('#Edificios').val());

               
                $.ajax
                  ({
                  type: "POST",
                  url: "models/consultas-crearMensaje.php",
                  data: {id:9, edificios:$('#Edificios').val()},
                  async: false,
                  dataType: "json",
                  success:
                  function (msg) 
                  {                        
                    console.log(msg[0]);
                   for(i=1; i < msg[0]; i++)
                    {
                      if(msg[i]!=undefined)
                      para.value+=msg[i]+",";

                    }

                   /* $('#restringir').fadeOut();
                    $('#apartamentos').fadeOut();  */                 
                    
                  },

                  error:
                  function (msg) {console.log("error");}
                  });


            }
          }
        }));
    }

    