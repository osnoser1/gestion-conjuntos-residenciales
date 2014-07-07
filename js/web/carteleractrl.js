function eventos (){  
  var idpostEliminar="";
  var tipousuario="";
 
 
  obtenerUsuario();
  
  function inicio(){
      console.log("entro en inicio");
    $.ajax({
      type: "POST",
      url: "models/cartelera.php",
      data: {id:12},
      async: true,
      dataType: "json",
      success:
      function(msg){
        console.log("entro en inicio parte2");
        if(msg[0].paginas>0){
            $('#paginas').empty();
            var ul=$('<ul class="pagination" ></ul>');

            for(i=0; i<=msg[0].paginas; i++){
                var li=$('<li></li>');
                li.html("<a  name="+i+" class='enlaces'>"+i+"</a>");
                ul.append(li);
            }
            $('#paginas').append(ul);
            
        }
        console.log("cargando cartelera")
        if(msg[0].m>0)
        cargarcartelera(msg);
       
      },
      error: function (msg) {console.log( msg +"No se pudo realizar la conexion");}
    });
  }
    function inicio2(){
    $.ajax({
      type: "POST",
      url: "models/cartelera.php",
      data: {id:5},
      async: true,
      dataType: "json",
      success:
      function (msg){
        
        if(msg[0].paginas>0){
            $('#paginas').empty();
            var ul=$('<ul class="pagination" ></ul>');

            for(i=0; i<=msg[0].paginas; i++){
                var li=$('<li></li>');
                li.html("<a  name="+i+" class='enlaces'>"+i+"</a>");
                ul.append(li);
            }
            $('#paginas').append(ul);
            
        }
       /* console.log("")*/
        if(msg[0].m>0)
        cargarcartelera(msg);
       
      },
      error: function (msg) {console.log( msg +"No se pudo realizar la conexion");}
    });
  }


  function obtenerUsuario(){
    $.ajax({
      type: "POST",
      url: "models/cartelera.php",
      data: {id:9},
      async: true,
      dataType: "json",
      success:
      function (msg){       
      console.log("privilegio: "+msg);
        tipousuario=msg;
        if(msg==="2"){
          $('#restringir').fadeIn();
           inicio2();
           cargardatosEdificios();
        }
        else{
            console.log("INICIO");
          inicio();
        }
      },
      error:
      function (msg) {alert( msg +"No se pudo realizar la conexion");}
    });
  }
  $(document).on('click', '.enlaces', (function() {
    pagina=$(this).attr('name');
    console.log(pagina);
    $.ajax({
      type: "POST",
      url: "models/cartelera.php",
      data: {id:7, pagina:pagina},
      async: true,
      dataType: "json",
      success:
      function (msg) {    
        $('#paginas').empty();
        //console.log("Paginas " + msg[0].paginas);
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
          //console.log("pagina actual " + msg[0].paginaactual);
        }
        $('#paginas').append(ul); 
        $('#contenedor2').html("");
        for (var i =0; i<msg[0].m; i++) {
          $('#contenedor2').append('<div><h4><b>'+msg[i].titulo+'</b></h4>');
          if(tipousuario==2)
            $('#contenedor2').append('<button class="eliminar btn btn-primary btn-xs" data-toggle="modal" data-target="#myModaleliminar" style="position: absolute; right:25px;" name='+msg[i].idpost+'>X</button><div>');
          $('#contenedor2').append('<div style="height:120px;  overflow: auto; border:1px solid #ccc; border-top-left-radius: 4px;     border-bottom-left-radius: 4px;     border-top-right-radius: 4px border-bottom-right-radius: 4px;" class="form-control">'+msg[i].contenido+'</div>');
          if(tipousuario==1)
            $('#contenedor2').append('<a class="btn btn-default btn-xs" href="#/panel/crear-mensaje"><span class="glyphicon glyphicon-envelope"></a>');
          $('#contenedor2').append('<span class="label label-primary">Publicado por: '+msg[i].usuario+' '+msg[i].Apellido+'</span>');
          $('#contenedor2').append('<span class="label label-primary" style="position: absolute; right:25px;">'+msg[i].fecha+'</span>');
          $('#contenedor2').append('<div><hr style="border: 0; height: 0; box-shadow: 0 1px 5px 1px black;"><br></div>');
        }               
      },
      error: function (msg) {alert( msg +"No se pudo realizar la conexion");}
    });
  }));
  function cargardatosEdificios(){
    $.ajax({
      type: "POST",
      url: "models/cartelera.php",
      data: {id:1},
      async: true,
      dataType: "json",
      success:
      function (msg) {
        for(i=0; i < msg[0].m; i++){
          Edificios.options[i]= new Option (msg[i].nombre);
          Edificios.options[i].text = msg[i].nombre;
         Edificios.options[i].value = msg[i].idEdificio; 
        }
        $('#Edificios').multiselect('rebuild');
        $('#Edificios').multiselect({
          onChange: function(element, checked) {
          }
        });
      },
      error: function (msg) {alert( msg +"No se pudo realizar la conexion");}
    });
    $.ajax({
      type: "POST",
      url: "models/cartelera.php",
      data: {id:1},
      async: true,
      dataType: "json",
      success:
      function (msg) {
        Edificios2.options[0]= new Option ("");
        Edificios2.options[0].text = "seleccione un edificio";
        Edificios2.options[0].value ="" ; 
        for(i=0; i < msg[0].m; i++){
          Edificios2.options[i+1]= new Option (msg[i].nombre);
          Edificios2.options[i+1].text = msg[i].nombre;
          Edificios2.options[i+1].value = msg[i].idEdificio; 
        }
        $('#Edificios2').multiselect('rebuild');
      },
      error: function (msg) {alert( msg +"No se pudo realizar la conexion");}
    });
    $.ajax({
      type: "POST",
      url: "models/cartelera.php",
      data: {id:1},
      async: true,
      dataType: "json",
      success:
      function (msg) {
        Edificios3.options[0]= new Option ("");
        Edificios3.options[0].text = "seleccione un edificio";
        Edificios3.options[0].value ="" ; 
        for(i=0; i < msg[0].m; i++){
          Edificios3.options[i+1]= new Option (msg[i].nombre);
          Edificios3.options[i+1].text = msg[i].nombre;
          Edificios3.options[i+1].value = msg[i].idEdificio; 
        }
        $('#Edificios3').multiselect('rebuild');
      },
      error: function (msg) {alert( msg +"No se pudo realizar la conexion");}
    });

    $.ajax({
      type: "POST",
      url: "models/cartelera.php",
      data: {id:1},
      async: true,
      dataType: "json",
      success:
      function (msg) {
        Edificios4.options[0]= new Option ("");
        Edificios4.options[0].text = "seleccione un edificio";
        Edificios4.options[0].value ="" ; 
        for(i=0; i < msg[0].m; i++){
          Edificios4.options[i+1]= new Option (msg[i].nombre);
          Edificios4.options[i+1].text = msg[i].nombre;
          Edificios4.options[i+1].value = msg[i].idEdificio; 
        }
        $('#Edificios4').multiselect('rebuild');
      },
      error: function (msg) {alert( msg +"No se pudo realizar la conexion");}
    });
  }
  $('#Edificios2').multiselect({
    onChange: function(element, checked) {
      idEdificio=Edificios2.value;
      // console.log(idEdificio);
      $('#Pisos').empty();
      cargarpisos();
    }
  });
  function cargarpisos(){
    $.ajax({
      type: "POST",
      url: "models/cartelera.php",
      data: {id:2, idEdificio:Edificios2.value},
      async: true,
      dataType: "json",
      success:
      function (msg) {    
        for(i=0; i < msg[0].m; i++){
          Pisos.options[i]= new Option ("Piso " + msg[i].idPiso);
          Pisos.options[i].text ="Piso " + msg[i].idPiso ;
          Pisos.options[i].value = msg[i].idPiso; 
        } 
        $('#Pisos').multiselect('rebuild');
      },
      error: function (msg) {alert( msg +"No se pudo realizar la conexion");}
    });  
  }
 $('#Edificios3').multiselect({
    onChange: function(element, checked) {
      idEdificio=Edificios3.value;
      $('#Pisos2').empty();
      $('#Apartamentos').empty();
      $('#Apartamentos').multiselect('rebuild');
      $.ajax({
        type: "POST",
        url: "models/cartelera.php",
        data: {id:2, idEdificio:Edificios3.value},
        async: true,
        dataType: "json",
        success:
        function (msg) {
          Pisos2.options[0]= new Option ("");
          Pisos2.options[0].text = "seleccione un piso";
          Pisos2.options[0].value ="-1" ; 
          for(i=0; i < msg[0].m; i++)
          {
            Pisos2.options[i+1]= new Option ("Piso " + msg[i].idPiso);
            Pisos2.options[i+1].text ="Piso " + msg[i].idPiso;
            Pisos2.options[i+1].value = msg[i].idPiso; 
          } 
          $('#Pisos2').multiselect('rebuild'); 
        },
        error: function (msg) {alert( msg +"No se pudo realizar la conexion");}
      });
    }
  });
  $('#Pisos2').multiselect({              
    onChange: function(element, checked) {
      idPiso=Pisos2.value;
      $('#Apartamentos').empty();
      $.ajax({
        type: "POST",
        url: "models/cartelera.php",
        data: {id:3, idEdificio:Edificios3.value, idPiso:Pisos2.value},
        async: true,
        dataType: "json",
        success:
        function (msg) {    
          for(i=0; i < msg[0].m; i++){
            Apartamentos.options[i]= new Option ("Apartamento" + msg[i].idapartamento);
            Apartamentos.options[i].text ="Apartamento "+ msg[i].Nombre;
            Apartamentos.options[i].value = msg[i].idapartamento;
          } 
          $('#Apartamentos').multiselect('rebuild');
        },
        error: function (msg) {alert( msg +"No se pudo realizar la conexion");}
      });
    }
  }); 
  $('#Edificios4').multiselect({
    onChange: function(element, checked) {
      idEdificio=Edificios4.value;
      console.log(idEdificio+'estoy en el evento onChange');
      $('#Apartamentos2').empty();
      console.log('entre aquiaquiiii cargarAptos');
    $.ajax({
      type: "POST",
      url: "models/cartelera.php",
      data: {id:8, idEdificio:Edificios4.value},
      async: true,
      dataType: "json",
      success:
      function (msg) {    
         console.log('entre en fuction  tamano  '+ msg[0].m);
          for(i=0; i < msg[0].m; i++){
            Apartamentos2.options[i]= new Option ("Apartamento" + msg[i].idApartamento);
            Apartamentos2.options[i].text ="Apartamento "+ msg[i].Nombre;
            Apartamentos2.options[i].value = msg[i].idApartamento;
            console.log('entre aquiaquiiii en el for');
          } 
           console.log('entre');
          $('#Apartamentos2').multiselect('rebuild');
        },
        error: function (msg) {console.log( msg +"error");}
    });    
     console.log('entre xd');
    }
  });
  $('#publicar').click(function(){
    if(titulo.value!==''&& $('.summernote').code()!==""){
      $('#Apartamentos').multiselect({
      enableFiltering: true
      });
      if($('#poredificios').attr('class')=="active"){
        if($('#Edificios').val()!=null){
        /*console.log("por edificios " + $('#poredificios').attr('class'));*/
         console.log($('#Edificios').val());
          $.ajax({
            type: "POST",
            url: "models/cartelera.php",
            data: {id:4, para:titulo.value,contenido:$('.summernote').code(),edificios:$('#Edificios').val()},
            async: true,
            dataType: "json",
            success:
            function () {                 
              $('#myModal').modal('hide');
              show({message: {text: "El Mensaje ha sido enviado exitosamente"}, type: 'success'});
              titulo.value="";
                console.log("cargar inicio");
               $('.summernote').code('');
               inicio2();},
            error: function (msg) {alert( msg +"No se pudo realizar la conexion");}
          });
        }
        else{
          $('#myModal').modal('hide');
          show({message: {text: "Debe elejir una restriccion"}, type: 'danger'});
        }
      }
      console.log('aqui voy');
      if ($('#selectPisos').attr('class')=="active") {
        console.log('aqui voy otra vez');
         console.log("Piso : " +$('#Pisos').val());
                   console.log("Edificio: " + $('#Edificios2').val());
        if($('#Pisos').val()!=null){
          $.ajax({
            type: "POST",
            url: "models/cartelera.php",
            data: {id:10, para:titulo.value,contenido:$('.summernote').code(),edificios:$('#Edificios2').val(),piso:$('#Pisos').val()},
            async: true,
            dataType: "json",
            success:
            function () {                 
              $('#myModal').modal('hide');
              show({message: {text: "El Mensaje ha sido enviado exitosamente"}, type: 'success'});
              titulo.value="";
              $('.sumernote').code("");
               inicio2();},
            error: function (msg) {alert( msg +"No se pudo realizar la conexion");}
          });
        }
      }
      if($('#Selectapartametos').attr('class')=="active"){
        console.log("Selectapartametos")
        if($('#aptos1').attr('class')=="active"){
          console.log("aptos1")
          if($('#Apartamentos').val()!=null){
            console.log("apartamentos")
            $.ajax({
              type: "POST",
              url: "models/cartelera.php",
              data: {id:11, para:titulo.value,contenido:$('.summernote').code(),apartamentos:$('#Apartamentos').val()},
              async: true,
              dataType: "json",
              success:
              function () {                 
                $('#myModal').modal('hide');
                show({message: {text: "El Mensaje ha sido enviado exitosamente"}, type: 'success'});
                titulo.value="";
                 $('.summernote').code()==='';
                inicio2();},
              error: function (msg) {alert( msg +"No se pudo realizar la conexion");}
            });
          }
          else{
            $('#myModal').modal('hide');
            show({message: {text: "Debe elejir una restriccion"}, type: 'danger'});
          }
        }
        if($('#aptos2').attr('class')=="active"){
          console.log("aptos1")
          if($('#Apartamentos').val()!=null){
            console.log("apartamentos")
            $.ajax({
              type: "POST",
              url: "models/cartelera.php",
              data: {id:11, para:titulo.value,contenido:$('.summernote').code(),apartamentos:$('#Apartamentos2').val()},
              async: true,
              dataType: "json",
              success:
              function () {                 
                $('#myModal').modal('hide');
                show({message: {text: "El Mensaje ha sido enviado exitosamente"}, type: 'success'});
                titulo.value="";
                 $('.summernote').code("");
                 inicio2();},
              error: function (msg) {alert( msg +"No se pudo realizar la conexion");}
            });
          }
          else{
            $('#myModal').modal('hide');
            show({message: {text: "Debe elejir una restriccion"}, type: 'danger'});
          }
        }
      }
    }
    else{
      $('#myModal').modal('hide');
      show({message: {text: "Debe rellenar titulo y contenido"}, type: 'danger'});
      }
  });
  function cargarcartelera(msg){
                       $('#contenedor2').html("");

     
                      for (var i =0; i<msg[0].m; i++) {
                          $('#contenedor2').append('<div><h4><b>'+msg[i].titulo+'</b></h4>');
                            if(tipousuario==2){
                              $('#contenedor2').append('<button class="eliminar btn btn-primary btn-xs" data-toggle="modal" data-target="#myModaleliminar" style="position: absolute; right:25px;" name='+msg[i].idpost+'>X</button><div>');

                            }                           
                           $('#contenedor2').append('<div style="height:120px;  overflow: auto; border:1px solid #ccc; border-top-left-radius: 4px;     border-bottom-left-radius: 4px;     border-top-right-radius: 4px border-bottom-right-radius: 4px;" class="form-control">'+msg[i].contenido+'</div>');
                           if(tipousuario==1)
                             $('#contenedor2').append('<a class="btn btn-default btn-xs" href="#/panel/crear-mensaje"><span class="glyphicon glyphicon-envelope"></a>');
                          $('#contenedor2').append('<span class="label label-primary">Publicado por: '+msg[i].usuario+' '+msg[i].Apellido+'</span>');
                           $('#contenedor2').append('<span class="label label-primary" style="position: absolute; right:25px;">'+msg[i].fecha+'</span>');
                           $('#contenedor2').append('<div><hr style="border: 0; height: 0; box-shadow: 0 1px 5px 1px black;"><br></div>');
                          console.log("lleno");
                      }
                              
                
                    

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
                      inicio2();
              
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

      