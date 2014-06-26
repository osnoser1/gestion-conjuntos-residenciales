function eventos () {

      var idEdificio=-1, idPiso=-1;

       $.ajax
        ({
        type: "POST",
        url: "models/consultas-crearMensaje.php",
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

        Edificios.onchange = function () 
          { 
            idEdificio=Edificios.value;
            $('#Pisos').empty();
            $('#Apartamentos').empty();
            $.ajax
                  ({
                  type: "POST",
                  url: "models/consultas-crearMensaje.php",
                  data: {id:2, idEdificio:Edificios.value},
                  async: false,
                  dataType: "json",
                  success:
                  function (msg) 
                  {    
                    
                    for(i=0; i < msg[0].m; i++)
                    {
                      Pisos.options[i]= new Option ("Piso" + msg[i].idPiso);
                      Pisos.options[i].text ="Piso" + msg[i].idPiso;
                      Pisos.options[i].value = msg[i].idPiso; 
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
                  url: "models/consultas-crearMensaje.php",
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
                      Apartamentos.options[i].text ="Apartamento " + msg[i].Nombre ;
                      Apartamentos.options[i].value = msg[i].idUsuario; 
                    } 
                      
                  },
                  error:
                  function (msg) {alert( msg +"No se pudo realizar la conexion");}
                  });
          }

          Apartamentos.onclick=function(){
               $.ajax
                  ({
                  type: "POST",
                  url: "models/consultas-crearMensaje.php",
                  data: {id:4, idUsuario:Apartamentos.value},
                  async: false,
                  dataType: "json",
                  success:
                  function (msg) 
                  {    

                       console.log("para " + para.value + " email: "+msg[0].email);
                       para.value+=msg[0].email+",";
                       $("#Apartamentos option[value="+Apartamentos.value+"]").remove();
                      
                  },
                  error:
                  function (msg) {alert( msg +"No se pudo realizar la conexion");}
                  });

          }

}