<?php
 	define('Host', 'localhost');
	define('User', 'root');
	define('Pass', '');
 	define('BasedeDatos','conjunto_residencial');

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

function mensajes(){
		$mysqli = new mysqli(Host, User, "", BasedeDatos);
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
		
		$mysqli = new mysqli(Host, User, "", BasedeDatos);
		$titulo=$_REQUEST['para'];
		$contenido=$_REQUEST['contenido'];
		// $edificio=$_REQUESt['edificio'];
		// $apartamento=$_REQUESt["apartamento"];
		// $piso=$_REQUEST["piso"];
		$fecha=date("Y-m-d H:i:s");
		$salida="todo esta bien";
		$tupla="INSERT INTO `post` (`contenido`, `titulo`, `fecha`)  VALUES ('$contenido', '$titulo',  '$fecha')";
		$resultado = $mysqli->query($tupla) or $salida=$mysqli->error;
		$mysqli->close();
		echo json_encode($salida);
	}

	function ObtenerApartamentosdePisosdeunEdificio(){
			$mysqli = new mysqli(Host, User, "", BasedeDatos);
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
			$mysqli = new mysqli(Host, User, "", BasedeDatos);
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
			$mysqli = new mysqli(Host, User, "", BasedeDatos);
			$idEdificio=$_REQUEST['idEdificio'];
			$tupla="SELECT DISTINCT Piso FROM  apartamento where  idEdificio='$idEdificio'";
			$resultado = $mysqli->query($tupla);
			$objeto[0]['m']=$resultado->num_rows;	
			$i=0;
			while($db_resultado = mysqli_fetch_array($resultado, MYSQLI_ASSOC))
			{
				
				
				$objeto[$i]['idPiso']=$db_resultado['Piso'];
				
				$i++;	
			}		
			$mysqli->close();
			echo json_encode($objeto);
	}
?>