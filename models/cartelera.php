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
	case 6:
		borrarPublicacion();
		break;
	case 7:
		siguientepagina();
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
function siguientepagina(){
		$mysqli = new mysqli(Host, User, Pass, BasedeDatos);
		$pagina=$_REQUEST['pagina'];
		$tamaño=5;
		$desde=$pagina*$tamaño;
		
		


		$mysqli = new mysqli(Host, User, "", BasedeDatos);
		
		
		$tupla1="SELECT Count(*) as cantidad FROM post";
		$resultado = $mysqli->query($tupla1);
		$cantidadderegistro="";
		if($db_resultado = mysqli_fetch_array($resultado, MYSQLI_ASSOC)){
			$cantidadderegistro=$db_resultado['cantidad'];
		}
		
		$paginas=(int)($cantidadderegistro/$tamaño);
		
					
		$tupla="SELECT * FROM post order by idpost desc LIMIT $desde,$tamaño";
		$resultado = $mysqli->query($tupla);
		$objeto[0]['m']=$resultado->num_rows;
		$objeto[0]['paginas']=$paginas;	
		$objeto[0]['paginaactual']=$pagina;
		$i=0;
		while($db_resultado = mysqli_fetch_array($resultado, MYSQLI_ASSOC))
		{
			
			$objeto[$i]['titulo']=$db_resultado['titulo'];
		 	$objeto[$i]['contenido']=$db_resultado['contenido'];	
		 	$objeto[$i]['idpost']=$db_resultado['idpost'];
		 	$objeto[$i]['fecha']=$db_resultado['fecha'];
			/*$objeto[0]['paginasiguiente']=1;*/

			$i++;	
		}		

	$mysqli->close();
	echo json_encode($objeto);
	}
function borrarPublicacion(){
		$mysqli = new mysqli(Host, User, "", BasedeDatos);
		$id=$_REQUEST['idpost'];
		$tupla="DELETE  FROM post WHERE  idpost='$id'";
		$resultado = $mysqli->query($tupla);
		$mysqli->close();
		echo json_encode("true");
}
function mensajes(){
		// $mysqli = new mysqli(Host, User, "", BasedeDatos);
		// $tupla="SELECT * FROM post";
		// $resultado = $mysqli->query($tupla);
		// $objeto[0]['m']=$resultado->num_rows;	
		// $i=0;
		// while($db_resultado = mysqli_fetch_array($resultado, MYSQLI_ASSOC))
		// {
			
		// 	$objeto[$i]['titulo']=$db_resultado['titulo'];
		// 	$objeto[$i]['contenido']=$db_resultado['contenido'];	
		// 	$objeto[$i]['idpost']=$db_resultado['idpost'];
		// 	$objeto[$i]['fecha']=$db_resultado['fecha'];
		// 	$i++;
		// }		

		
		// $mysqli->close();
		// echo json_encode($objeto);
		$mysqli = new mysqli(Host, User, "", BasedeDatos);
		
		$tamaño=5;
		$tupla1="SELECT Count(*) as cantidad FROM post";
		$resultado = $mysqli->query($tupla1);
		$cantidadderegistro="";
		if($db_resultado = mysqli_fetch_array($resultado, MYSQLI_ASSOC)){
			$cantidadderegistro=$db_resultado['cantidad'];
		}
		
		$paginas=(int)($cantidadderegistro/$tamaño);
		
					
		$tupla="SELECT * FROM post  order by idpost desc limit $tamaño" ;
		$resultado = $mysqli->query($tupla);
		$objeto[0]['m']=$resultado->num_rows;
		$objeto[0]['paginas']=$paginas;	
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
			$tupla="SELECT  apartamento.idApartamento, apartamento.Nombre  FROM  apartamento  where  apartamento.idEdificio='$idEdificio' and apartamento.Piso='$idPiso'";
			$resultado = $mysqli->query($tupla);
			$objeto[0]['m']=$resultado->num_rows;	
			$i=0;
			while($db_resultado = mysqli_fetch_array($resultado, MYSQLI_ASSOC))
			{
				
				$objeto[$i]['idapartamento']=$db_resultado['idApartamento'];
				$objeto[$i]['Nombre']=$db_resultado['Nombre'];					
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