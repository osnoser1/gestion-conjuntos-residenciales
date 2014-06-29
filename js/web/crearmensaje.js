function eventos () {

      var idEdificio=-1, idPiso=-1;
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
            Edificios.options[0]= new Option ("");
            Edificios.options[0].text = "";
            Edificios.options[0].value ="-1" ; 
          for(i=0; i < msg[0].m; i++)
          {

            Edificios.options[i+1]= new Option (msg[i].nombre);
            Edificios.options[i+1].text = msg[i].nombre;
            Edificios.options[i+1].value = msg[i].idEdificio; 
           }
           $('#Edificios').multiselect('rebuild');
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
            Edificios2.options[0].text = "";
            Edificios2.options[0].value ="-1" ; 
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
            Edificios3.options[0].text = "";
            Edificios3.options[0].value ="-1" ; 
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


          $('#Edificios2').multiselect({
            buttonText: function(options) {
                  if (options.length === 0) {
                      return 'seleccione un edificio <b class="caret"></b>';
                  }
            },
            onChange: function(element, checked) {
               idEdificio=Edificios2.value;
              console.log(idEdificio);
              $('#Pisos').empty();
              cargarpisos();
            }
          });


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
                      
                              Pisos.options[0]= new Option ("");
                              Pisos.options[0].text = "";
                              Pisos.options[0].value ="-1" ; 
                              for(i=0; i < msg[0].m; i++)
                              {
                                Pisos.options[i+1]= new Option ("Piso " + msg[i].idPiso);
                                Pisos.options[i+1].text ="Piso " + msg[i].idPiso ;
                                Pisos.options[i+1].value = msg[i].idPiso; 
                              }                              
                           
                          $('#Pisos').multiselect('rebuild');
                  },
                  error:
                  function (msg) {alert( msg +"No se pudo realizar la conexion");}
                  });
          }
       
            $('#Edificios3').multiselect({
              buttonText: function(options) {
                if (options.length === 0) {
                    return 'Seleccione un Edificio<b class="caret"></b>';
                }
              },
              onChange: function(element, checked) {
                  idEdificio=Edificios3.value;
                  console.log(idEdificio);
                  $('#Pisos2').empty();
                  $('#Apartamentos').empty();
                  console.log("paso 1");
                  $('#Apartamentos').multiselect('rebuild');
                  console.log("paso 2");
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
                          Pisos2.options[0].text = "";
                          Pisos2.options[0].value ="-1" ; 
                          for(i=0; i < msg[0].m; i++)
                          {
                            Pisos2.options[i+1]= new Option ("Piso " + msg[i].idPiso);
                            Pisos2.options[i+1].text ="Piso " + msg[i].idPiso;
                            Pisos2.options[i+1].value = msg[i].idPiso; 
                          } 
                      $('#Pisos2').multiselect('rebuild');

                  },
                  error:
                  function (msg) {alert( msg +"No se pudo realizar la conexion");}
                  });
                

              }
           });

           
          $('#Pisos2').multiselect({
                buttonText: function(options) {
                if (options.length === 0) {
                    return 'Seleccione un Piso<b class="caret"></b>';
                }
              },
              onChange: function(element, checked) {
                idPiso=Pisos2.value;
               $('#Apartamentos').empty();
                
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
              }
            });

        
       // $.ajax
       //  ({
       //  type: "POST",
       //  url: "models/consultas-crearMensaje.php",
       //  data: {id:1},
       //  async: false,
       //  dataType: "json",
       //  success:
       //  function (msg) 
       //  {       
         
       //      Edificios.options[0]= new Option ("");
       //      Edificios.options[0].text = "";
       //      Edificios.options[0].value ="-1" ; 
       //    for(i=0; i < msg[0].m; i++)
       //    {

       //      Edificios.options[i+1]= new Option (msg[i].nombre);
       //      Edificios.options[i+1].text = msg[i].nombre;
       //      Edificios.options[i+1].value = msg[i].idEdificio; 

       //    }   


     


       //  },
       //  error:
       //  function (msg) {alert( msg +"No se pudo realizar la conexion");}
       //  });

        

                     

       //  Edificios.onchange = function () 
       //    { 
       //      idEdificio=Edificios.value;
       //      $('#Pisos').empty();
       //      $('#Apartamentos').empty();
       //      $.ajax
       //            ({
       //            type: "POST",
       //            url: "models/consultas-crearMensaje.php",
       //            data: {id:2, idEdificio:Edificios.value},
       //            async: false,
       //            dataType: "json",
       //            success:
       //            function (msg) 
       //            {    
                    
       //              for(i=0; i < msg[0].m; i++)
       //              {
       //                Pisos.options[i]= new Option ("Piso" + msg[i].idPiso);
       //                Pisos.options[i].text ="Piso" + msg[i].idPiso;
       //                Pisos.options[i].value = msg[i].idPiso; 
       //              } 
                      
                      
       //            },
       //            error:
       //            function (msg) {alert( msg +"No se pudo realizar la conexion");}
       //            });
       //    }
        //   Pisos.onchange = function () 
        //   {   idPiso=Pisos.value;
        //        $('#Apartamentos').empty();
        //         $.ajax
        //           ({
        //           type: "POST",
        //           url: "models/consultas-crearMensaje.php",
        //           data: {id:3, idEdificio:Edificios.value, idPiso:Pisos.value},
        //           async: false,
        //           dataType: "json",
        //           success:
        //           function (msg) 
        //           {    
        //             console.log("Piso: "+ Pisos.value + "Numero de apartamentos" + msg[0].m);
        //             for(i=0; i < msg[0].m; i++)
        //             {
        //               Apartamentos.options[i]= new Option ("Apartamento" + msg[i].idapartamento);
        //               Apartamentos.options[i].text ="Apartamento " + msg[i].Nombre ;
        //               Apartamentos.options[i].value = msg[i].idUsuario; 
        //             } 
                      
        //           },
        //           error:
        //           function (msg) {alert( msg +"No se pudo realizar la conexion");}
        //           });
        //   }

        //   Apartamentos.onclick=function(){
        //        $.ajax
        //           ({
        //           type: "POST",
        //           url: "models/consultas-crearMensaje.php",
        //           data: {id:4, idUsuario:Apartamentos.value},
        //           async: false,
        //           dataType: "json",
        //           success:
        //           function (msg) 
        //           {    

        //                console.log("para " + para.value + " email: "+msg[0].email);
        //                para.value+=msg[0].email+",";
        //                $("#Apartamentos option[value="+Apartamentos.value+"]").remove();
                      
        //           },
        //           error:
        //           function (msg) {alert( msg +"No se pudo realizar la conexion");}
        //           });

        //   }

}