<?php


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
	function borrarMensajeEnviado(){
		$mysqli = new mysqli("localhost", "root", "", "conjuntoresidencial");
		$idMensaje=$_REQUEST['idMensaje'];
		$tupla="DELETE FROM mensajesenviados WHERE idMensaje='$idMensaje'";
		$resultado = $mysqli->query($tupla);
		$mysqli->close();
		echo json_encode("true");
	}

	function obtenerMensajeEnviado(){
		$mysqli = new mysqli("localhost", "root", "", "conjuntoresidencial");
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
			
		}		

		
		$mysqli->close();
		echo json_encode($objeto);

	}
	function obtenertodoslosmensajesenviados(){
		$mysqli = new mysqli("localhost", "root", "", "conjuntoresidencial");
		
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
		$mysqli = new mysqli("localhost", "root", "", "conjuntoresidencial");
		$idMensaje=$_REQUEST['idMensaje'];
		$tupla="UPDATE mensaje SET leido='0' WHERE idMensaje='$idMensaje'";
		$resultado = $mysqli->query($tupla);
		$mysqli->close();
		echo json_encode("true");
	}
	function borrarMensaje(){
		$mysqli = new mysqli("localhost", "root", "", "conjuntoresidencial");
		$idMensaje=$_REQUEST['idMensaje'];
		$tupla="DELETE FROM mensaje WHERE idMensaje='$idMensaje'";
		$resultado = $mysqli->query($tupla);
		$mysqli->close();
		echo json_encode("true");
	}
	function leermensaje(){
		$mysqli = new mysqli("localhost", "root", "", "conjuntoresidencial");
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
		$mysqli = new mysqli("localhost", "root", "", "conjuntoresidencial");
		$idUsuario=1;
		$tupla1="SELECT Count(*) FROM mensaje";
		$resultado = $mysqli->query($tupla1);
		if()

		$tupla="SELECT *, usuario.idUsuario FROM mensaje INNER JOIN  usuario on mensaje.para=usuario.email where usuario.idUsuario='$idUsuario'";
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

	function enviarmensaje(){
		date_default_timezone_set('America/Caracas');
		$mysqli = new mysqli("localhost", "root", "", "conjuntoresidencial");
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

			$mysqli = new mysqli("localhost", "root", "", "conjuntoresidencial");
			$idUsuario=$_REQUEST['idUsuario'];		
			$tupla="SELECT email  FROM  usuario  where idUsuario='$idUsuario'";
			$resultado = $mysqli->query($tupla);
			$objeto[0]['m']=$resultado->num_rows;	
			
			if($db_resultado = mysqli_fetch_array($resultado, MYSQLI_ASSOC))
			{
				
				$objeto[0]['email']=$db_resultado['email'];
								
				
			}		
			$mysqli->close();
			echo json_encode($objeto);
	}
	function ObtenerApartamentosdePisosdeunEdificio(){
			$mysqli = new mysqli("127.0.0.1", "root", "", "conjuntoresidencial");
			$idPiso=$_REQUEST['idPiso'];
			$idEdificio=$_REQUEST['idEdificio'];
			$tupla="SELECT DISTINCT  apartamentos.idApartamento as idApartamento,  apartamentos.idUsuario  FROM  apartamentos INNER JOIN pisos on pisos.idPiso=apartamentos.idPiso INNER JOIN edificio on edificio.idEdificio=apartamentos.idEdificio where  apartamentos.idEdificio='$idEdificio' and apartamentos.idPiso='$idPiso'";
			$resultado = $mysqli->query($tupla);
			$objeto[0]['m']=$resultado->num_rows;	
			$i=0;
			while($db_resultado = mysqli_fetch_array($resultado, MYSQLI_ASSOC))
			{
				
				$objeto[$i]['idapartamento']=$db_resultado['idApartamento'];
				$objeto[$i]['idUsuario']=$db_resultado['idUsuario'];					
				$i++;	
			}		
			$mysqli->close();
			echo json_encode($objeto);
	}
	function ObtenerEdificios(){
			$mysqli = new mysqli("localhost", "root", "", "conjuntoresidencial");
			$tupla="SELECT nombre, idEdificio FROM  edificio";
			$resultado = $mysqli->query($tupla);
			$objeto[0]['m']=$resultado->num_rows;	
			$i=0;
			while($db_resultado = mysqli_fetch_array($resultado, MYSQLI_ASSOC))
			{
				
				$objeto[$i]['nombre']=$db_resultado['nombre'];
				$objeto[$i]['idEdificio']=$db_resultado['idEdificio'];
				$i++;	
			}		
			$mysqli->close();
			echo json_encode($objeto);
	}

	function ObtenerPisosdeunEdificio(){
			$mysqli = new mysqli("localhost", "root", "", "conjuntoresidencial");
			$idEdificio=$_REQUEST['idEdificio'];
			$tupla="SELECT * FROM  pisos INNER JOIN edificio on edificio.idEdificio=pisos.idEdificio where  pisos.idEdificio='$idEdificio'";
			$resultado = $mysqli->query($tupla);
			$objeto[0]['m']=$resultado->num_rows;	
			$i=0;
			while($db_resultado = mysqli_fetch_array($resultado, MYSQLI_ASSOC))
			{
				
				$objeto[$i]['id']=$db_resultado['id'];
				$objeto[$i]['idPiso']=$db_resultado['idPiso'];
				$objeto[$i]['idEdificio']=$db_resultado['idEdificio'];
				$i++;	
			}		
			$mysqli->close();
			echo json_encode($objeto);
	}
?>