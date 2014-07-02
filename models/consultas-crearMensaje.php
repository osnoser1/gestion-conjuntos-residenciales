<?php
	include("conector.php");
	if(isset($_POST['id'])){
	$id=$_POST['id'];

	switch($id)
	{
		case 1:
			ObtenerEdificios();
			break;

		case 2:
			ObtenerPisosdeunEdificio();
			break;

		case 3:
			ObtenerApartamentosdePisosdeunEdificio();
			break;

		case 4:
			ObtenerUsuario();
			break;

		case 5: 
			enviarmensaje();
			break;

		case 6:
			obtenermensaje();
			break;

		case 7:
		     leermensaje();
		     break;
		case 8:
			 borrarMensaje();
			 break;
		case 9:
			 marcarnoleido();
			 break;
		case 10:
			obtenertodoslosmensajesenviados();
			break;
		case 11:
			obtenerMensajeEnviado();
			break;
		case 12:
			borrarMensajeEnviado();
			break;
		case 13:
			 nuevapagina();
			break;
		case 14: 
			 BuscarMensaje();
			 break;
		case 15:
			 BuscarMensajeporFecha();
			 break;
		case 16:
			 nuevosmensajes();
			 break;
		case 17: 
			 obtenerprivilegiodelusuario();
			 break;
		case 18:
			 obtenercorreosdeunedificio();
			 break;
		case 19:
			obtenercorreosdeunPiso();
			break;
		case 20:
			 obtenercorreosdeunApartamento();
			 break;
		case 21: 
			 obtenerAdministradores();
			 break;
		case 22:
			obtenernombredelusuariologueado();
			break;
		case 23:
			obtenermensajesEspecifico();
			break;

		default;
	}
}
else{
	$input = json_decode(file_get_contents("php://input"));
	if ($input != null) {
		echo call_user_func($input->funcion);
	}
}
/*echo call_user_func(array($_POST['funcion']));*/
	function obtenermensajesEspecifico(){
		session_start();
		$mysqli = new mysqli(Host, User, Pass, BasedeDatos);		
		$idMensaje= $_REQUEST["ID"];								
		$tupla="SELECT * FROM mensaje WHERE idMensaje='$idMensaje'";
		$resultado = $mysqli->query($tupla);
		$objeto[0]['m']=$resultado->num_rows;
		$i=0;
		if($db_resultado = mysqli_fetch_array($resultado, MYSQLI_ASSOC))
		{			
			$objeto[$i]['asunto']=$db_resultado['asunto'];
			$objeto[$i]['descripcion']=$db_resultado['descripcion'];	
			$objeto[$i]['idMensaje']=$db_resultado['idMensaje'];
			$objeto[$i]['fecha']=$db_resultado['fecha'];
			$date= new DateTime($objeto[$i]['fecha']);
			$objeto[$i]['fecha']=$date->format('d-m-y H:i:s');
			$objeto[$i]['leido']=$db_resultado['leido'];
			$objeto[$i]['de']=$db_resultado['de'];
			$i++;	
		}		
		$tupla="UPDATE mensaje SET leido='1' WHERE idMensaje='$idMensaje'";
		$resultado = $mysqli->query($tupla);

		$mysqli->close();
		echo json_encode($objeto);
	}
	function obtenernombredelusuariologueado(){
		session_start();
		echo json_encode($_SESSION["Nombre"]);
	}
	function obtenerAdministradores(){
		$mysqli = new mysqli(Host, User, Pass, BasedeDatos);
		$tupla="SELECT Correo FROM usuario  WHERE  TipoUsuario='2'";
		$resultado = $mysqli->query($tupla);	
		$objeto[0]['m']=$resultado->num_rows;		
		$i=0;	
			while($db_resultado = mysqli_fetch_array($resultado, MYSQLI_ASSOC))
			{			
				$objeto[$i]['correo']=$db_resultado['Correo'];
				$i++;	
			}	
		
		$mysqli->close();
		echo json_encode($objeto);

	}
	function obtenercorreosdeunApartamento(){
		$mysqli = new mysqli(Host, User, Pass, BasedeDatos);
		$edificio=$_REQUEST['edificio'];
		$piso=$_REQUEST['piso'];
		$apartamentos=$_REQUEST['apartamentos'];
		$tupla="";		
		$t=0;
		$j=1;	
		for ($i=0; $i<sizeof($apartamentos); $i++) { 
			$idapartamentos=$apartamentos[$i];
			$tupla="SELECT DISTINCT usuario.Correo FROM apartamento INNER JOIN  apartamento_usuario ON apartamento.idApartamento=apartamento_usuario.idapartamento  INNER JOIN  usuario ON apartamento_usuario.idusuario=usuario.ID WHERE   apartamento.idEdificio='$edificio' AND apartamento.Piso='$piso' AND apartamento.idApartamento='$idapartamentos' ";
			$resultado = $mysqli->query($tupla);			
			while($db_resultado = mysqli_fetch_array($resultado, MYSQLI_ASSOC))
			{			
				$objeto[$j]=$db_resultado['Correo'];
				$j++;	
			}	
		}
		$objeto[0]=$j;
		$objeto=array_unique($objeto);
		$mysqli->close();
		echo json_encode($objeto);
	}
	function obtenercorreosdeunPiso(){
		$mysqli = new mysqli(Host, User, Pass, BasedeDatos);
		$edificio=$_REQUEST['edificio'];
		$piso=$_REQUEST['piso'];
		$tupla="";		
		$t=0;
		$j=1;	
		for ($i=0; $i<sizeof($piso); $i++) { 
			$idpiso=$piso[$i];
			$tupla="SELECT DISTINCT usuario.Correo FROM apartamento INNER JOIN  apartamento_usuario ON apartamento.idApartamento=apartamento_usuario.idapartamento  INNER JOIN  usuario ON apartamento_usuario.idusuario=usuario.ID WHERE   apartamento.idEdificio='$edificio' AND apartamento.Piso='$idpiso'";
			$resultado = $mysqli->query($tupla);			
			while($db_resultado = mysqli_fetch_array($resultado, MYSQLI_ASSOC))
			{			
				$objeto[$j]=$db_resultado['Correo'];
				$j++;	
			}	
		}
		$objeto[0]=$j;
		$objeto=array_unique($objeto);
		$mysqli->close();
		echo json_encode($objeto);
	}
	function obtenercorreosdeunedificio(){
		$mysqli = new mysqli(Host, User, Pass, BasedeDatos);
		$edificio=$_REQUEST['edificios'];
		$tupla="";		
		$t=0;
		$j=1;		
		for ($i=0; $i<sizeof($edificio); $i++) { 
			$id=$edificio[$i];
			$tupla="SELECT DISTINCT usuario.Correo FROM apartamento INNER JOIN  apartamento_usuario ON apartamento.idApartamento=apartamento_usuario.idapartamento  INNER JOIN  usuario ON apartamento_usuario.idusuario=usuario.ID WHERE   apartamento.idEdificio='$id'";
			$resultado = $mysqli->query($tupla);			
			while($db_resultado = mysqli_fetch_array($resultado, MYSQLI_ASSOC))
			{			
				$objeto[$j]=$db_resultado['Correo'];
				$j++;	
			}	
		}
		$objeto[0]=$j;
		$objeto=array_unique($objeto);
		$mysqli->close();
		echo json_encode($objeto);

	}
	function obtenerprivilegiodelusuario(){
		session_start();
		echo json_encode($_SESSION["TipoUsuario"]);

	}
	function nuevosmensajes(){
		session_start();
	    $correo=$_SESSION["Correo"];
		$mysqli = new mysqli(Host, User, Pass, BasedeDatos);
		$tupla="SELECT COUNT(*) as cantidad FROM mensaje WHERE  leido=0 AND para='$correo'";
		$resultado = $mysqli->query($tupla);
		$objeto[0]['m']="";		
		if($db_resultado = mysqli_fetch_array($resultado, MYSQLI_ASSOC))
		{			
			$objeto[0]['m']=$db_resultado['cantidad'];			
		}	

		$tupla="SELECT mensaje.asunto, mensaje.descripcion, mensaje.idMensaje, mensaje.fecha, mensaje.leido, usuario.Nombre FROM mensaje  INNER JOIN  usuario ON mensaje.para=usuario.Correo WHERE leido=0 AND para='$correo' ORDER BY  mensaje.fecha DESC LIMIT 3";
		$resultado = $mysqli->query($tupla);				
		$i=0;
		while($db_resultado = mysqli_fetch_array($resultado, MYSQLI_ASSOC))
		{			
			$objeto[$i]['asunto']=$db_resultado['asunto'];
			$objeto[$i]['descripcion']=$db_resultado['descripcion'];	
			$objeto[$i]['idMensaje']=$db_resultado['idMensaje'];
			
			$objeto[$i]['leido']=$db_resultado['leido'];
			$objeto[$i]['Nombre']=$db_resultado['Nombre'];
			$objeto[$i]['fecha']=$db_resultado['fecha'];
			$date= new DateTime($objeto[$i]['fecha']);
			$objeto[$i]['fecha']=$date->format('d-m-y H:i:s');
			$i++;	
		}		
		$mysqli->close();
		echo json_encode($objeto);
	}
	function BuscarMensajeporFecha(){
		session_start();
		$correo=$_SESSION["Correo"];
		$mysqli = new mysqli(Host, User, Pass, BasedeDatos);
		$desde=$_REQUEST['desde'];
		$hasta=$_REQUEST['hasta'];
		$desde=str_replace("/","-",$desde);
		$hasta=str_replace("/","-",$hasta);
		$date = new DateTime($hasta);
		$hasta=$date->format('Y-m-d');			
		$date2 = new DateTime($desde);
		$desde=$date2->format('Y-m-d')	;		
		$tupla="SELECT * FROM mensaje  WHERE fecha BETWEEN '$desde' AND '$hasta'  AND para='$correo' ORDER BY idMensaje DESC";
		$resultado = $mysqli->query($tupla);
		$objeto[0]['m']=$resultado->num_rows;		
		$i=0;
		while($db_resultado = mysqli_fetch_array($resultado, MYSQLI_ASSOC))
		{			
			$objeto[$i]['asunto']=$db_resultado['asunto'];
			$objeto[$i]['descripcion']=$db_resultado['descripcion'];	
			$objeto[$i]['idMensaje']=$db_resultado['idMensaje'];
			$objeto[$i]['fecha']=$db_resultado['fecha'];
			$date= new DateTime($objeto[$i]['fecha']);
			$objeto[$i]['fecha']=$date->format('d-m-y H:i:s');
			$objeto[$i]['leido']=$db_resultado['leido'];
			$objeto[$i]['de']=$db_resultado['de'];
			$i++;	
		}		
		$mysqli->close();
		echo json_encode($objeto);
	}
	function BuscarMensaje(){
		session_start();
		$correo=$_SESSION["Correo"];
		$mysqli = new mysqli(Host, User, Pass, BasedeDatos);
		$mensaje=$_REQUEST['mensaje'];
		$tupla = "SELECT * FROM mensaje WHERE  (asunto LIKE '%$mensaje%'  OR descripcion LIKE '%$mensaje%') AND para='$correo' ORDER BY idMensaje DESC";
		$resultado = $mysqli->query($tupla);
		$objeto[0]['m']=$resultado->num_rows;		
		$i=0;
		while($db_resultado = mysqli_fetch_array($resultado, MYSQLI_ASSOC))
		{			
			$objeto[$i]['asunto']=$db_resultado['asunto'];
			$objeto[$i]['descripcion']=$db_resultado['descripcion'];	
			$objeto[$i]['idMensaje']=$db_resultado['idMensaje'];
			$objeto[$i]['fecha']=$db_resultado['fecha'];
			$date= new DateTime($objeto[$i]['fecha']);
			$objeto[$i]['fecha']=$date->format('d-m-y H:i:s');
			$objeto[$i]['leido']=$db_resultado['leido'];
			$objeto[$i]['de']=$db_resultado['de'];
			$i++;	
		}		
		$mysqli->close();
		echo json_encode($objeto);
	}
	function nuevapagina(){
		session_start();
		$correo=$_SESSION["Correo"];

		$mysqli = new mysqli(Host, User, Pass, BasedeDatos);
		$pagina=$_REQUEST['pagina'];
		$tamaño=5;
		$desde=$pagina*$tamaño;
		$tupla1="SELECT Count(*) as cantidad FROM mensaje WHERE para='$correo'";
		$resultado = $mysqli->query($tupla1);
		$cantidadderegistro="";
		if($db_resultado = mysqli_fetch_array($resultado, MYSQLI_ASSOC)){
			$cantidadderegistro=$db_resultado['cantidad'];
		}		
		$paginas=(int)($cantidadderegistro/$tamaño);
		$objeto[0]['paginas']=$paginas;	
		$tupla="SELECT * FROM mensaje  WHERE para='$correo' ORDER BY idMensaje DESC LIMIT $desde,$tamaño";
		$resultado = $mysqli->query($tupla);
		$objeto[0]['m']=$resultado->num_rows;	
		$objeto[0]['paginaactual']=$pagina;
		$i=0;
		while($db_resultado = mysqli_fetch_array($resultado, MYSQLI_ASSOC))
		{			
			$objeto[$i]['asunto']=$db_resultado['asunto'];
			$objeto[$i]['descripcion']=$db_resultado['descripcion'];	
			$objeto[$i]['idMensaje']=$db_resultado['idMensaje'];
			$objeto[$i]['fecha']=$db_resultado['fecha'];
			$date= new DateTime($objeto[$i]['fecha']);
			$objeto[$i]['fecha']=$date->format('d-m-y H:i:s');
			$objeto[$i]['leido']=$db_resultado['leido'];
			$objeto[$i]['de']=$db_resultado['de'];
			$i++;	
		}		
		$mysqli->close();
		echo json_encode($objeto);
	}
	function borrarMensajeEnviado(){
		$mysqli = new mysqli(Host, User, Pass, BasedeDatos);
		$idMensaje=$_REQUEST['idMensaje'];
		$tupla="DELETE FROM mensajesenviados WHERE idMensaje='$idMensaje'";
		$resultado = $mysqli->query($tupla);
		$mysqli->close();
		echo json_encode("true");
	}
	function obtenerMensajeEnviado(){
		session_start();
		$correo=$_SESSION["Correo"];
		$mysqli = new mysqli(Host, User, Pass, BasedeDatos);
		$idMensaje=$_REQUEST['idMensaje'];
		$tupla="SELECT * FROM mensajesenviados WHERE de='$correo'";
		$resultado = $mysqli->query($tupla);
		$objeto[0]['m']=$resultado->num_rows;			
		if($db_resultado = mysqli_fetch_array($resultado, MYSQLI_ASSOC))
		{
			$objeto[0]['asunto']=$db_resultado['asunto'];
			$objeto[0]['descripcion']=$db_resultado['descripcion'];	
			$objeto[0]['idMensaje']=$db_resultado['idMensaje'];
			
			$objeto[0]['para']=$db_resultado['para'];	
			$objeto[0]['de']=$db_resultado['de'];		
			$objeto[0]['fecha']=$db_resultado['fecha'];
			$date= new DateTime($objeto[0]['fecha']);
			$objeto[0]['fecha']=$date->format('d-m-y H:i:s');
			$objeto[0]['de']=$db_resultado['de'];	
		}				
		$mysqli->close();
		echo json_encode($objeto);
	}
	function obtenertodoslosmensajesenviados(){
		$mysqli = new mysqli(Host, User, Pass, BasedeDatos);	
		$tupla="SELECT * FROM mensajesenviados";
		$resultado = $mysqli->query($tupla);
		$objeto[0]['m']=$resultado->num_rows;	
		$i=0;
		while($db_resultado = mysqli_fetch_array($resultado, MYSQLI_ASSOC))
		{			
			$objeto[$i]['asunto']=$db_resultado['asunto'];
			$objeto[$i]['descripcion']=$db_resultado['descripcion'];	
			$objeto[$i]['idMensaje']=$db_resultado['idMensaje'];
			$objeto[$i]['fecha']=$db_resultado['fecha'];
			$date= new DateTime($objeto[$i]['fecha']);
			$objeto[$i]['fecha']=$date->format('d-m-y H:i:s');
			$objeto[$i]['de']=$db_resultado['de'];
			$i++;	
		}		
		$mysqli->close();
		echo json_encode($objeto);
	}
	function marcarnoleido(){
		$mysqli = new mysqli(Host, User, Pass, BasedeDatos);
		$idMensaje=$_REQUEST['idMensaje'];
		$tupla="UPDATE mensaje SET leido='0' WHERE idMensaje='$idMensaje'";
		$resultado = $mysqli->query($tupla);
		$mysqli->close();
		echo json_encode("true");
	}
	function borrarMensaje(){
		$mysqli = new mysqli(Host, User, Pass, BasedeDatos);
		$idMensaje=$_REQUEST['idMensaje'];
		$tupla="DELETE FROM mensaje WHERE idMensaje='$idMensaje'";
		$resultado = $mysqli->query($tupla);
		$tamaño=5;
		$tupla1="SELECT Count(*) as cantidad FROM mensaje";
		$resultado = $mysqli->query($tupla1);
		$cantidadderegistro="";
		if($db_resultado = mysqli_fetch_array($resultado, MYSQLI_ASSOC)){
			$cantidadderegistro=$db_resultado['cantidad'];
		}		
		$paginas=(int)($cantidadderegistro/$tamaño);		
		$objeto[0]['paginas']=$paginas;	
		$mysqli->close();
		echo json_encode($objeto);
	}
	function leermensaje(){
		$mysqli = new mysqli(Host, User, Pass, BasedeDatos);
		$idMensaje=$_REQUEST['idMensaje'];
		$tupla="SELECT * FROM mensaje WHERE idMensaje='$idMensaje'";
		$resultado = $mysqli->query($tupla);
		$objeto[0]['m']=$resultado->num_rows;			
		if($db_resultado = mysqli_fetch_array($resultado, MYSQLI_ASSOC))
		{			
			$objeto[0]['asunto']=$db_resultado['asunto'];
			$objeto[0]['descripcion']=$db_resultado['descripcion'];	
			$objeto[0]['idMensaje']=$db_resultado['idMensaje'];
			$objeto[0]['fecha']=$db_resultado['fecha'];
			$date= new DateTime($objeto[0]['fecha']);
			$objeto[0]['fecha']=$date->format('d-m-y H:i:s');	
			$objeto[0]['de']=$db_resultado['de'];	

		}		
		$tupla="UPDATE mensaje SET leido='1' WHERE idMensaje='$idMensaje'";
		$resultado = $mysqli->query($tupla);
		$mysqli->close();
		echo json_encode($objeto);
	}
	function obtenermensaje(){
		session_start();
		$correo=$_SESSION["Correo"];         
		$mysqli = new mysqli(Host, User, Pass, BasedeDatos);
		$idUsuario= $_SESSION["ID"];		
		$tamaño=5;
		$tupla1="SELECT Count(*) as cantidad FROM mensaje WHERE para='$correo'";
		$resultado = $mysqli->query($tupla1);
		$cantidadderegistro="";
		if($db_resultado = mysqli_fetch_array($resultado, MYSQLI_ASSOC)){
			$cantidadderegistro=$db_resultado['cantidad'];
		}		
		$paginas=(int)($cantidadderegistro/$tamaño);					
		$tupla="SELECT *, usuario.ID FROM mensaje INNER JOIN  usuario on mensaje.para=usuario.Correo WHERE usuario.ID='$idUsuario'  ORDER BY idMensaje DESC limit $tamaño";
		$resultado = $mysqli->query($tupla);
		$objeto[0]['m']=$resultado->num_rows;
		$objeto[0]['paginas']=$paginas;	
		$i=0;
		while($db_resultado = mysqli_fetch_array($resultado, MYSQLI_ASSOC))
		{			
			$objeto[$i]['asunto']=$db_resultado['asunto'];
			$objeto[$i]['descripcion']=$db_resultado['descripcion'];	
			$objeto[$i]['idMensaje']=$db_resultado['idMensaje'];
			$objeto[$i]['fecha']=$db_resultado['fecha'];
			$date= new DateTime($objeto[$i]['fecha']);
			$objeto[$i]['fecha']=$date->format('d-m-y H:i:s');
			$objeto[$i]['leido']=$db_resultado['leido'];
			$objeto[$i]['de']=$db_resultado['de'];

			$i++;	
		}		
		$mysqli->close();
		echo json_encode($objeto);
	}
	function enviarmensaje(){
		session_start();    
		date_default_timezone_set('America/Caracas');
		$mysqli = new mysqli(Host, User, Pass, BasedeDatos);
		$para=explode(",", $_REQUEST['para']);
		$titulo=$_REQUEST['titulo'];
		$mensaje=$_REQUEST['mensaje'];
		$fecha=date("Y-m-d H:i:s");
		$correo=$_SESSION["Correo"];
		for($i=0; $i<sizeof($para); $i++){
			$usuario=$para[$i];
			if(strlen($usuario)>4){
				$tupla="INSERT INTO mensaje (para, asunto, descripcion, fecha, leido, de) VALUES ('$usuario', '$titulo', '$mensaje', '$fecha', 'false', '$correo')";
				$resultado = $mysqli->query($tupla);
				$tupla2="INSERT INTO mensajesenviados (para, asunto, descripcion, fecha, de) VALUES ('$usuario', '$titulo', '$mensaje', '$fecha', '$correo')";
				$resultado2 = $mysqli->query($tupla2);
			}
		}
		$mysqli->close();
		echo json_encode("true");
	}
	function ObtenerUsuario(){
		$mysqli = new mysqli(Host, User, Pass, BasedeDatos);
		$idUsuario=$_REQUEST['idUsuario'];		
		$tupla="SELECT Correo  FROM  usuario  where ID='$idUsuario'";
		$resultado = $mysqli->query($tupla);
		$objeto[0]['m']=$resultado->num_rows;		
		if($db_resultado = mysqli_fetch_array($resultado, MYSQLI_ASSOC))
		{			
			$objeto[0]['email']=$db_resultado['Correo'];			
		}		
		$mysqli->close();
		echo json_encode($objeto);
	}
	function ObtenerApartamentosdePisosdeunEdificio(){
			$mysqli = new mysqli(Host, User, Pass, BasedeDatos);
			$idPiso=$_REQUEST['idPiso'];
			$idEdificio=$_REQUEST['idEdificio'];
			$tupla="SELECT  apartamento.idApartamento, apartamento.idUsuario, apartamento.Nombre  FROM  apartamento INNER JOIN usuario ON apartamento.idUsuario=usuario.ID where  apartamento.idEdificio='$idEdificio' and apartamento.Piso='$idPiso'";
			$resultado = $mysqli->query($tupla);
			$objeto[0]['m']=$resultado->num_rows;	
			$i=0;
			while($db_resultado = mysqli_fetch_array($resultado, MYSQLI_ASSOC))
			{				
				$objeto[$i]['idapartamento']=$db_resultado['idApartamento'];
				$objeto[$i]['idUsuario']=$db_resultado['idUsuario'];
				$objeto[$i]['Nombre']=$db_resultado['Nombre'];					
				$i++;	
			}		
			$mysqli->close();
			echo json_encode($objeto);
	}

	function ObtenerEdificios(){
			$mysqli = new mysqli(Host, User, Pass, BasedeDatos);
			$tupla="SELECT Nombre, idEdificio FROM  edificio";
			$resultado = $mysqli->query($tupla);
			$objeto[0]['m']=$resultado->num_rows;	
			$i=0;
			while($db_resultado = mysqli_fetch_array($resultado, MYSQLI_ASSOC))
			{				
				$objeto[$i]['nombre']=$db_resultado['Nombre'];
				$objeto[$i]['idEdificio']=$db_resultado['idEdificio'];
				$i++;	
			}		
			$mysqli->close();
			echo json_encode($objeto);
	}
	function ObtenerPisosdeunEdificio(){
			$mysqli = new mysqli(Host, User, Pass, BasedeDatos);
			$idEdificio=$_REQUEST['idEdificio'];
			$tupla="SELECT * FROM  apartamento where  idEdificio='$idEdificio'";
			$resultado = $mysqli->query($tupla);
			$objeto[0]['m']=$resultado->num_rows;	
			$i=0;
			while($db_resultado = mysqli_fetch_array($resultado, MYSQLI_ASSOC))
			{				
				$objeto[$i]['id']=$db_resultado['idApartamento'];
				$objeto[$i]['idPiso']=$db_resultado['Piso'];
				$objeto[$i]['idEdificio']=$db_resultado['idEdificio'];
				$i++;	
			}		
			$mysqli->close();
			echo json_encode($objeto);
	}
?>