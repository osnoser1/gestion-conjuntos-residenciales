function eventos (){

        var idpostEliminar="";

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
           
            
               var ul=$('<ul class="pagination" ></ul>');
                 for(i=0; i<=msg[0].paginas; i++){
                  var li=$('<li></li>');
                  li.html("<a  name="+i+" class='enlaces'>"+i+"</a>");
                  ul.append(li);
                  console.log(i);
               }
             $('#paginas').append(ul);            
            cargarcartelera();
          },
          error:
          function (msg) {alert( msg +"No se pudo realizar la conexion");}
          });

       $.ajax
        ({
        type: "POST",
        url: "models/cartelera.php",
        data: {id:1},
        async: false,
        dataType: "json",
        success:
        function (msg) 
        {       
         
            Edificios.options[0]= new Option ("");
            Edificios.options[0].text = "";
            Edificios.options[0].value ="-1" ; 
          for(i=0; i < msg[0].m; i++)
          {

            Edificios.options[i+1]= new Option (msg[i].nombre);
            Edificios.options[i+1].text = msg[i].nombre;
            Edificios.options[i+1].value = msg[i].idEdificio; 

          }          
          
        },
        error:
        function (msg) {alert( msg +"No se pudo realizar la conexion");}
        });

      $.ajax
        ({
        type: "POST",
        url: "models/cartelera.php",
        data: {id:1},
        async: false,
        dataType: "json",
        success:
        function (msg) 
        {       
         
            Edificios2.options[0]= new Option ("");
            Edificios2.options[0].text = "";
            Edificios2.options[0].value ="-1" ; 
          for(i=0; i < msg[0].m; i++)
          {

            Edificios2.options[i+1]= new Option (msg[i].nombre);
            Edificios2.options[i+1].text = msg[i].nombre;
            Edificios2.options[i+1].value = msg[i].idEdificio; 

          }          
          cargarpisos();
        },
        error:
        function (msg) {alert( msg +"No se pudo realizar la conexion");}
        });
 $.ajax
        ({
        type: "POST",
        url: "models/cartelera.php",
        data: {id:1},
        async: false,
        dataType: "json",
        success:
        function (msg) 
        {       
         
            Edificios3.options[0]= new Option ("");
            Edificios3.options[0].text = "";
            Edificios3.options[0].value ="-1" ; 
          for(i=0; i < msg[0].m; i++)
          {

            Edificios3.options[i+1]= new Option (msg[i].nombre);
            Edificios3.options[i+1].text = msg[i].nombre;
            Edificios3.options[i+1].value = msg[i].idEdificio; 

          }          
          
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
            // $('#Apartamentos').empty();Ç
          }
           function cargarpisos(){
                $.ajax
                  ({
                  type: "POST",
                  url: "models/cartelera.php",
                  data: {id:2, idEdificio:Edificios2.value},
                  async: false,
                  dataType: "json",
                  success:
                  function (msg) 
                  {    
                    Pisos.options[0]= new Option ("");
                    Pisos.options[0].text = "";
                    Pisos.options[0].value ="-1" ; 
                    for(i=0; i < msg[0].m; i++)
                    {
                      Pisos.options[i+1]= new Option ("Piso " + msg[i].idPiso);
                      Pisos.options[i+1].text ="Piso " + msg[i].idPiso ;
                      Pisos.options[i+1].value = msg[i].idPiso; 
                    } 
                      
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
            // $('#Apartamentos').empty();
            $.ajax
                  ({
                  type: "POST",
                  url: "models/cartelera.php",
                  data: {id:2, idEdificio:Edificios3.value},
                  async: false,
                  dataType: "json",
                  success:
                  function (msg) 
                  {    
                    Pisos2.options[0]= new Option ("");
                    Pisos2.options[0].text = "";
                    Pisos2.options[0].value ="-1" ; 
                    for(i=0; i < msg[0].m; i++)
                    {
                      Pisos2.options[i+1]= new Option ("Piso " + msg[i].idPiso);
                      Pisos2.options[i+1].text ="Piso " + msg[i].idPiso;
                      Pisos2.options[i+1].value = msg[i].idPiso; 
                    } 
                      
                  },
                  error:
                  function (msg) {alert( msg +"No se pudo realizar la conexion");}
                  });
          }
  

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
                      
                  },
                  error:
                  function (msg) {alert( msg +"No se pudo realizar la conexion");}
                  });
          }

          $('#publicar').click(function(){
            if(titulo.value!=''&& $('.sumernote').code()!=""){
          
                $.ajax
                ({
                type: "POST",
                url: "models/cartelera.php",
                data: {id:4, para:titulo.value,contenido:$('.summernote').code()},
                async: false,
                dataType: "json",
                success:
                function (msg) 
                {       
                           
                  $('#myModal').modal('hide');
                   show({message: {text: "El Mensaje ha sido enviado exitosamente"}, type: 'success'});
                 titulo.value="";
                    cargarcartelera();
               },
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


          $('#chkEdificio').click(function(){
            if ( $('#chkEdificio').is (':checked'))
              {
                console.log("sdfasdasd");

                $('#Pisos').fadeOut();
                 $('#Apartamentos').fadeOut();

                 $('#ckPiso').attr('checked',false);
                 $('#ckApartamentos').attr('checked',false);
              }
          });
           $('#ckPiso').click(function(){
            if ( $('#ckPiso').is (':checked'))
              {
                console.log("sdfasdasd");
                 $('#Pisos').fadeIn();
                $('#Apartamentos').fadeOut();
                  $('#chkEdificio').attr('checked',false);
                 $('#ckApartamentos').attr('checked',false);
              }
          });
            $('#ckApartamentos').click(function(){
            if ( $('#ckApartamentos').is (':checked'))
              {
                $('#ckPiso').attr('checked',false);
                 $('#chkEdificio').attr('checked',false);
                $('#Apartamentos').fadeIn();
                  $('#Pisos').fadeIn();
              }
          });


           function cargarcartelera(msg){
                   $('.sumernote').code("");
                   $('#contenedor2').html("");
                $.ajax
                  ({
                  type: "POST",
                  url: "models/cartelera.php",
                  data: {id:5},
                  async: false,
                  dataType: "json",
                  success:
                  function (msg) 
                  {      
                    for (var i =0; i<msg[0].m; i++) {
                        $('#contenedor2').append('<div><div><button class="eliminar btn btn-primary btn-xs" data-toggle="modal" data-target="#myModaleliminar" style="position: absolute; right:25px;" name='+msg[i].idpost+'>X</button><h4><b>'+msg[i].titulo+'</b></h4></div><div style="height:120px;  overflow: auto; border:1px solid #ccc; border-top-left-radius: 4px;     border-bottom-left-radius: 4px;     border-top-right-radius: 4px border-bottom-right-radius: 4px;" class="form-control">'+msg[i].contenido+'</div><a class="btn btn-default btn-xs" href="#/panel/crear-mensaje"><span class="glyphicon glyphicon-envelope"></a><span class="label label-primary" style="position: absolute; right:25px;">'+msg[i].fecha+'</span></div><div style="background-color:white;"><br></div>');
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
            async: false,
            dataType: "json",
            success:
            function (msg) 
            {       
              $('#myModaleliminar').modal('hide');
              if(msg=="true"){          
               
                  show({message: {text: "La publicacion ha sido eliminado exitosamente"}, type: 'success'});
              
                   $('#contenedor2').html("");
                    cargarcartelera();
            
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
    }
    $(document).on('click', '.enlaces', (function(e) {
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
               $('#contenedor2').html("");
               for (var i =0; i<msg[0].m; i++) {
                       $('#contenedor2').append('<div><div><button class="eliminar btn btn-primary btn-xs" data-toggle="modal" data-target="#myModaleliminar" style="position: absolute; right:25px;" name='+msg[i].idpost+'>X</button><h4><b>'+msg[i].titulo+'</b></h4></div><div style="height:120px;  overflow: auto; border:1px solid #ccc; border-top-left-radius: 4px;     border-bottom-left-radius: 4px;     border-top-right-radius: 4px border-bottom-right-radius: 4px;" class="form-control">'+msg[i].contenido+'</div><a class="btn btn-default btn-xs" href="#/panel/crear-mensaje"><span class="glyphicon glyphicon-envelope"></a><span class="label label-primary" style="position: absolute; right:25px;">'+msg[i].fecha+'</span></div><div style="background-color:white;"><br></div>');
                    }         
         
            },
            error:
            function (msg) {alert( msg +"No se pudo realizar la conexion");}
            });

          }));