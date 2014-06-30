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
		seleccionarEdificios();
		break;

	case 2:
		Seleccionarpisos();
		break;

	case 3:
		seleccionaraptos();
		break;

	case 4: 
		Ingresar();
		break;
	case 5:
		publicaciones();
		break;
	case 6:
		borrarPublicacion();
		break;
	case 7:
		siguientepagina();
		break;
	case 8:
		seleccionaraptosdeedif();
		case 9:
		restringir();
		break;
		case 10:
		RestringirdeEdificio();
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
// $nueva=a:8:{i:0;s:1:"2";i:1;s:1:"4";i:2;s:1:"6";i:3;s:1:"8";i:4;s:2:"10";i:5;s:2:"12";i:6;s:2:"14";i:7;s:2:"19";};
// $nueva=unserialize($nueva);
function restringir(){
	session_start();
		echo json_encode($_SESSION["TipoUsuario"]);

}
function RestringirdeEdificio(){
$mysqli = new mysqli(Host, User, Pass, BasedeDatos);
		$objeto=array();
		$edificio=$_REQUEST['edificios'];
		$tupla="";
		
		$t=0;
		$j=1;
		
		for ($i=0; $i<sizeof($edificio); $i++) { 
			$id=$edificio[$i];
			$tupla="SELECT idApartamento FROM apartamento where idEdificio=$edificio";
			$resultado = $mysqli->query($tupla);
			
			
			while($db_resultado = mysqli_fetch_array($resultado, MYSQLI_ASSOC))
			{			
				$objeto[$j]=$db_resultado['idapartamento'];
				$j++;	
			}	
		}
		echo json_encode($objeto);
}
function seleccionaraptosdeedif(){
	$mysqli = new mysqli(Host, User, "", BasedeDatos);
	$idEdificio=$_REQUEST['idEdificio'];
	$tupla="SELECT  apartamento.idApartamento, apartamento.Nombre  FROM  apartamento  where  apartamento.idEdificio='$idEdificio'";
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
function siguientepagina(){
		$mysqli = new mysqli(Host, User, Pass, BasedeDatos);
		$pagina=$_REQUEST['pagina'];
		$tamaño=5;
		$desde=$pagina*$tamaño;
		
		


		$mysqli = new mysqli(Host, User, Pass, BasedeDatos);
		
		
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
			$objeto[$i]['usuario']=$db_resultado['usuario'];

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
function publicaciones(){
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
		 	$objeto[$i]['usuario']=$db_resultado['usuario'];
	

			$i++;	
		}		

	$mysqli->close();
	echo json_encode($objeto);
	}
	

	function Ingresar(){
		
		$mysqli = new mysqli(Host, User, Pass, BasedeDatos);
		$objeto=array();
		$edificio=$_REQUEST['edificios'];
		$tupla="";
		
		$t=0;
		$j=0;
		
		for ($i=0; $i<sizeof($edificio); $i++) { 
			$id=$edificio[$i];
			$tupla="SELECT idApartamento FROM apartamento where idEdificio=$id";
			$resultado = $mysqli->query($tupla);
			
			
			while($db_resultado = mysqli_fetch_array($resultado, MYSQLI_ASSOC))
			{			
				$objeto[$j]=$db_resultado['idApartamento'];
				$j++;	
			}	
		} 
		$objeto=serialize($objeto);
		session_start();
		$nombre=$_SESSION["Nombre"];
		$titulo=$_REQUEST['para'];
		$contenido=$_REQUEST['contenido'];
		$fecha=date("Y-m-d H:i:s");
		$salida="todo esta bien";
		$tupla="INSERT INTO `post` (`contenido`, `titulo`, `fecha`, `usuario`, `aptos`)  VALUES ('$contenido', '$titulo',  '$fecha', '$nombre', '$objeto')";
		$resultado = $mysqli->query($tupla) or $salida=$mysqli->error;
		$mysqli->close();
		echo json_encode($salida);
	}

	function seleccionaraptos(){
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
	function seleccionarEdificios(){
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

	function Seleccionarpisos(){
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