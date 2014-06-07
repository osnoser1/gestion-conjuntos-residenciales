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
	default;

}
}
/*echo call_user_func(array($_POST['funcion']));*/
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
			$mysqli = new mysqli("localhost", "root", "", "conjuntoresidencial");
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