function eventos (){

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
            // $('#Apartamentos').empty();
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
  


          Pisos.onchange = function () 
          {   idPiso=Pisos.value;
               $('#Apartamentos').empty();
                $.ajax
                  ({
                  type: "POST",
                  url: "models/cartelera.php",
                  data: {id:3, idEdificio:Edificios.value, idPiso:Pisos.value},
                  async: false,
                  dataType: "json",
                  success:
                  function (msg) 
                  {    
                    console.log("Piso: "+ Pisos.value + "Numero de apartamentos" + msg[0].m);
                    for(i=0; i < msg[0].m; i++)
                    {
                      Apartamentos.options[i]= new Option ("Apartamento" + msg[i].idapartamento);
                      Apartamentos.options[i].text ="Apartamento" + msg[i].idapartamento ;
                      Apartamentos.options[i].value = msg[i].idUsuario; 
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
                  $('.sumernote').code("");


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
                          for (var i =msg[0].m-1; i>=0; i--) {
                             $('#contenedor2').append('<div><h4><b>'+msg[i].titulo+'</b></h4></div>');
                             $('#contenedor2').append('<div style="height:120px;  overflow: auto; border:1px solid #ccc; border-top-left-radius: 4px;     border-bottom-left-radius: 4px;     border-top-right-radius: 4px border-bottom-right-radius: 4px;" class="form-control">'+msg[i].contenido+'</div>');
                             $('#contenedor2').append('<a class="btn btn-default btn-xs" href="#/panel/crear-mensaje"><span class="glyphicon glyphicon-envelope"></span></a>');   
                             $('#contenedor2').append('<button class="btn btn-default btn-xs" data-toggle="modal" data-target="#myModaleliminar">Eliminar</button>');
                             $('#contenedor2').append('<label style="position: absolute; right:25px;">'+msg[i].fecha+'</label><br>');
                          }
                                  
                        },
                        error:
                        function (msg) {alert( msg +"No se pudo realizar la conexion");}
                        });






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
}
