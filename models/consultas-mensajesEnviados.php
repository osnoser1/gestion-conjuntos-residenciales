<?php
	include("conector.php");


	if(isset($_POST['id'])){
		$id=$_POST['id'];

		switch($id)
		{
			case 1:
				 BuscarMensajeporFecha();
				break;
			case 2:
				 nuevapagina();
				 break;
			case 3:
				 obtenertodoslosmensajesenviados();
				 break;
			case 4:
				BuscarMensaje();
				break;
			default;
		}
	}

	function BuscarMensaje(){
		$mysqli = new mysqli(Host, User, Pass, BasedeDatos);
		$mensaje=$_REQUEST['mensaje'];
		$tupla = "SELECT * FROM mensajesenviados WHERE  asunto LIKE '%$mensaje%'  OR descripcion LIKE '%$mensaje%' ORDER BY idMensaje DESC";
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
	function obtenertodoslosmensajesenviados(){
		$mysqli = new mysqli(Host, User, Pass, BasedeDatos);
		$idUsuario=1;		
		$tamaño=5;
		$tupla1="SELECT Count(*) as cantidad FROM mensajesenviados";
		$resultado = $mysqli->query($tupla1);
		$cantidadderegistro="";
		if($db_resultado = mysqli_fetch_array($resultado, MYSQLI_ASSOC)){
			$cantidadderegistro=$db_resultado['cantidad'];
		}		
		$paginas=(int)($cantidadderegistro/$tamaño);
		$tupla="SELECT * FROM mensajesenviados ORDER BY idMensaje DESC limit $tamaño";
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
		$tupla1="SELECT Count(*) as cantidad FROM mensajesenviados";
		$resultado = $mysqli->query($tupla1);
		$cantidadderegistro="";
		if($db_resultado = mysqli_fetch_array($resultado, MYSQLI_ASSOC)){
			$cantidadderegistro=$db_resultado['cantidad'];
		}
		
		$paginas=(int)($cantidadderegistro/$tamaño);
		$objeto[0]['paginas']=$paginas;	

		$tupla="SELECT * FROM mensajesenviados ORDER BY idMensaje DESC LIMIT $desde,$tamaño";
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
			
			$i++;	
		}		
		$mysqli->close();
		echo json_encode($objeto);
	}

	function  BuscarMensajeporFecha(){
		$mysqli = new mysqli(Host, User, Pass, BasedeDatos);				
		$desde=$_REQUEST['desde'];
		$hasta=$_REQUEST['hasta'];
		$desde=str_replace("/","-",$desde);
		$hasta=str_replace("/","-",$hasta);
		$date = new DateTime($hasta);
		$hasta=$date->format('Y-m-d');				
		$date2 = new DateTime($desde);
		$desde=$date2->format('Y-m-d');


		$tupla="SELECT * FROM mensajesenviados WHERE fecha BETWEEN '$desde' AND '$hasta'";
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
?>