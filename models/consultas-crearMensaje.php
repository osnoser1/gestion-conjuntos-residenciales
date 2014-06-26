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
	function nuevosmensajes(){
		$mysqli = new mysqli(Host, User, Pass, BasedeDatos);
		$tupla="SELECT COUNT(*) as cantidad FROM mensaje WHERE  leido=0";
		$resultado = $mysqli->query($tupla);
		$objeto[0]['m']="";		
		if($db_resultado = mysqli_fetch_array($resultado, MYSQLI_ASSOC))
		{			
			$objeto[0]['m']=$db_resultado['cantidad'];			
		}		

		$tupla="SELECT mensaje.asunto, mensaje.descripcion, mensaje.idMensaje, mensaje.fecha, mensaje.leido, usuario.Nombre FROM mensaje  INNER JOIN  usuario ON mensaje.para=usuario.Correo WHERE leido=0 ORDER BY  mensaje.fecha DESC LIMIT 3";
		$resultado = $mysqli->query($tupla);				
		$i=0;
		while($db_resultado = mysqli_fetch_array($resultado, MYSQLI_ASSOC))
		{			
			$objeto[$i]['asunto']=$db_resultado['asunto'];
			$objeto[$i]['descripcion']=$db_resultado['descripcion'];	
			$objeto[$i]['idMensaje']=$db_resultado['idMensaje'];
			$objeto[$i]['fecha']=$db_resultado['fecha'];
			$objeto[$i]['leido']=$db_resultado['leido'];
			$objeto[$i]['Nombre']=$db_resultado['Nombre'];
			$i++;	
		}		
		$mysqli->close();
		echo json_encode($objeto);
	}
	function BuscarMensajeporFecha(){
		$mysqli = new mysqli(Host, User, Pass, BasedeDatos);
		$desde=$_REQUEST['desde'];
		$hasta=$_REQUEST['hasta'];
		$desde=str_replace("/","-",$desde);
		$hasta=str_replace("/","-",$hasta);
		$date = new DateTime($hasta);
		$hasta=$date->format('Y-m-d');			
		$date2 = new DateTime($desde);
		$desde=$date2->format('Y-m-d');		
		$tupla="SELECT * FROM mensaje  WHERE fecha BETWEEN '$desde' AND '$hasta' ORDER BY idMensaje DESC";
		$resultado = $mysqli->query($tupla);
		$objeto[0]['m']=$resultado->num_rows;		
		$i=0;
		while($db_resultado = mysqli_fetch_array($resultado, MYSQLI_ASSOC))
		{			
			$objeto[$i]['asunto']=$db_resultado['asunto'];
			$objeto[$i]['descripcion']=$db_resultado['descripcion'];	
			$objeto[$i]['idMensaje']=$db_resultado['idMensaje'];
			$objeto[$i]['fecha']=$db_resultado['fecha'];
			$objeto[$i]['leido']=$db_resultado['leido'];
			$i++;	
		}		
		$mysqli->close();
		echo json_encode($objeto);
	}
	function BuscarMensaje(){
		$mysqli = new mysqli(Host, User, Pass, BasedeDatos);
		$mensaje=$_REQUEST['mensaje'];
		$tupla = "SELECT * FROM mensaje WHERE  asunto LIKE '%$mensaje%'  OR descripcion LIKE '%$mensaje%' ORDER BY idMensaje DESC";
		$resultado = $mysqli->query($tupla);
		$objeto[0]['m']=$resultado->num_rows;		
		$i=0;
		while($db_resultado = mysqli_fetch_array($resultado, MYSQLI_ASSOC))
		{			
			$objeto[$i]['asunto']=$db_resultado['asunto'];
			$objeto[$i]['descripcion']=$db_resultado['descripcion'];	
			$objeto[$i]['idMensaje']=$db_resultado['idMensaje'];
			$objeto[$i]['fecha']=$db_resultado['fecha'];
			$objeto[$i]['leido']=$db_resultado['leido'];
			$i++;	
		}		
		$mysqli->close();
		echo json_encode($objeto);
	}
	function nuevapagina(){
		$mysqli = new mysqli(Host, User, Pass, BasedeDatos);
		$pagina=$_REQUEST['pagina'];
		$tamaño=5;
		$desde=$pagina*$tamaño;
		$tupla1="SELECT Count(*) as cantidad FROM mensaje";
		$resultado = $mysqli->query($tupla1);
		$cantidadderegistro="";
		if($db_resultado = mysqli_fetch_array($resultado, MYSQLI_ASSOC)){
			$cantidadderegistro=$db_resultado['cantidad'];
		}		
		$paginas=(int)($cantidadderegistro/$tamaño);
		$objeto[0]['paginas']=$paginas;	
		$tupla="SELECT * FROM mensaje ORDER BY idMensaje DESC LIMIT $desde,$tamaño";
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
			$objeto[$i]['leido']=$db_resultado['leido'];
			$i++;	
		}		
		$mysqli->close();
		echo json_encode($objeto);
	}
	function borrarMensajeEnviado(){
		$mysqli = new mysqli(Host, User, "", BasedeDatos);
		$idMensaje=$_REQUEST['idMensaje'];
		$tupla="DELETE FROM mensajesenviados WHERE idMensaje='$idMensaje'";
		$resultado = $mysqli->query($tupla);
		$mysqli->close();
		echo json_encode("true");
	}
	function obtenerMensajeEnviado(){
		$mysqli = new mysqli(Host, User, "", BasedeDatos);
		$idMensaje=$_REQUEST['idMensaje'];
		$tupla="SELECT * FROM mensajesenviados WHERE idMensaje='$idMensaje'";
		$resultado = $mysqli->query($tupla);
		$objeto[0]['m']=$resultado->num_rows;			
		if($db_resultado = mysqli_fetch_array($resultado, MYSQLI_ASSOC))
		{
			$objeto[0]['asunto']=$db_resultado['asunto'];
			$objeto[0]['descripcion']=$db_resultado['descripcion'];	
			$objeto[0]['idMensaje']=$db_resultado['idMensaje'];
			$objeto[0]['fecha']=$db_resultado['fecha'];
			$objeto[0]['para']=$db_resultado['para'];			
		}				
		$mysqli->close();
		echo json_encode($objeto);
	}
	function obtenertodoslosmensajesenviados(){
		$mysqli = new mysqli(Host, User, "", BasedeDatos);		
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
			$i++;	
		}		
		$mysqli->close();
		echo json_encode($objeto);
	}
	function marcarnoleido(){
		$mysqli = new mysqli(Host, User, "", BasedeDatos);
		$idMensaje=$_REQUEST['idMensaje'];
		$tupla="UPDATE mensaje SET leido='0' WHERE idMensaje='$idMensaje'";
		$resultado = $mysqli->query($tupla);
		$mysqli->close();
		echo json_encode("true");
	}
	function borrarMensaje(){
		$mysqli = new mysqli(Host, User, "", BasedeDatos);
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
		$mysqli = new mysqli(Host, User, "", BasedeDatos);
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
		}		
		$tupla="UPDATE mensaje SET leido='1' WHERE idMensaje='$idMensaje'";
		$resultado = $mysqli->query($tupla);
		$mysqli->close();
		echo json_encode($objeto);
	}
	function obtenermensaje(){
		$mysqli = new mysqli(Host, User, "", BasedeDatos);
		$idUsuario=1;		
		$tamaño=5;
		$tupla1="SELECT Count(*) as cantidad FROM mensaje";
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
			$objeto[$i]['leido']=$db_resultado['leido'];
			$i++;	
		}		
		$mysqli->close();
		echo json_encode($objeto);
	}
	function enviarmensaje(){
		date_default_timezone_set('America/Caracas');
		$mysqli = new mysqli(Host, User, "", BasedeDatos);
		$para=explode(",", $_REQUEST['para']);
		$titulo=$_REQUEST['titulo'];
		$mensaje=$_REQUEST['mensaje'];
		$fecha=date("Y-m-d H:i:s");
		for($i=0; $i<sizeof($para); $i++){
			$usuario=$para[$i];
			if(strlen($usuario)>4){
				$tupla="INSERT INTO mensaje (para, asunto, descripcion, fecha, leido) VALUES ('$usuario', '$titulo', '$mensaje', '$fecha', 'false')";
				$resultado = $mysqli->query($tupla);
				$tupla2="INSERT INTO mensajesenviados (para, asunto, descripcion, fecha) VALUES ('$usuario', '$titulo', '$mensaje', '$fecha')";
				$resultado2 = $mysqli->query($tupla2);
			}
		}
		$mysqli->close();
		echo json_encode("true");
	}
	function ObtenerUsuario(){
		$mysqli = new mysqli(Host, User, "", BasedeDatos);
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
			$mysqli = new mysqli(Host, User, "", BasedeDatos);
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
			$mysqli = new mysqli(Host, User, "", BasedeDatos);
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