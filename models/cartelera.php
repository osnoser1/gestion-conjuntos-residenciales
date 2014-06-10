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
		Ingresar();
	break;
	case 5:
		mensajes();
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

function mensajes(){
		$mysqli = new mysqli("localhost", "root", "", "conjuntoresidencial");
	
		$tupla="SELECT * FROM post";
		$resultado = $mysqli->query($tupla);
		$objeto[0]['m']=$resultado->num_rows;	
		$i=0;
		while($db_resultado = mysqli_fetch_array($resultado, MYSQLI_ASSOC))
		{
			
			$objeto[$i]['titulo']=$db_resultado['titulo'];
			$objeto[$i]['contenido']=$db_resultado['contenido'];	
			$objeto[$i]['idpost']=$db_resultado['idpost'];
			$objeto[$i]['fecha']=$db_resultado['fecha'];
			$i++;
		}		

		
		$mysqli->close();
		echo json_encode($objeto);

	}

	function Ingresar(){
		
		$mysqli = new mysqli("localhost", "root", "", "conjuntoresidencial");
		$titulo=$_REQUEST['para'];
		$contenido=$_REQUEST['contenido'];
		// $edificio=$_REQUESt['edificio'];
		// $apartamento=$_REQUESt["apartamento"];
		// $piso=$_REQUEST["piso"];
		$fecha=date("Y-m-d H:i:s");
		$tupla="INSERT INTO  post  (contenido, titulo,  fecha) VALUES ('$contenido', '$titulo',  '$fecha')";
		$resultado = $mysqli->query($tupla);
		$mysqli->close();
		echo json_encode("true");
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