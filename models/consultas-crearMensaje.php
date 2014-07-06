<?php
	include("conector.php");
	include "Edificio.php";
	include "Mensajes.php";
	if(isset($_POST['id'])){
	$id=$_POST['id'];

	switch($id)
	{
		case 1:
				{
					$e=new Edificio();
					$e->obtenerEdificios();
					break;
				}
		case 2:{
					$e=new Edificio();
					$e->ObtenerPisosdeunEdificio($_REQUEST['idEdificio']);
					break;
				}
		case 3:{
					$e=new Edificio();
					$e->ObtenerApartamentosdePisosdeunEdificio($_REQUEST['idPiso'], $_REQUEST['idEdificio']);
					break;
								/*ObtenerApartamentosdePisosdeunEdificio();
			break;*/
				}
		case 4:
				{
					$e=new Edificio();
					$e->ObtenerUsuario($_REQUEST['idUsuario']);
					break;
					/*ObtenerUsuario();
					break;*/
				}
		case 5: 
				{
					$m=new Mensaje();
					$m->enviarmensaje($_REQUEST['titulo'], $_REQUEST['mensaje'], $_REQUEST['para']);
					break;
					/*enviarmensaje();
					break;*/
				}
		case 6:
				{	
					$m=new Mensaje();
					echo $m->obtenermensaje();
					//obtenermensaje();
							break;
			    }
		case 7:
			     {
			     	$m=new Mensaje();
					echo $m->leermensaje($_REQUEST['idMensaje']);
			     	//leermensaje();
	     		     break;
	     		 }
		case 8:
				{
					$m=new Mensaje();
					echo $m->borrarMensaje($_REQUEST['idMensaje']);
					// borrarMensaje();
					break;
				}
		case 9:
				{ 
					$m=new Mensaje();
					echo $m->marcarnoleido($_REQUEST['idMensaje']);				
				    break;
				}
		case 10:
				{
					$m=new Mensaje();
					echo $m->obtenertodoslosmensajesenviados();
					//obtenertodoslosmensajesenviados();
					break;
				}
		case 11:
				{	
					$m=new Mensaje();
					echo $m->obtenerMensajeEnviado($_REQUEST['idMensaje']);
					//obtenerMensajeEnviado();
					break;
				}
		case 12:{
					$m=new Mensaje();
					echo $m->borrarMensajeEnviado($_REQUEST['idMensaje']);
					//borrarMensajeEnviado();
					break;
				}
		case 13:{
					$m=new Mensaje();
					echo $m->nuevapagina($_REQUEST['pagina']);
					 //nuevapagina();
					break;
				}
		case 14: 
				{ 
					$m=new Mensaje();
					echo $m->BuscarMensaje($_REQUEST['mensaje']);
					//BuscarMensaje();			 	
			 		break;
			 	}
		case 15:{
					$m=new Mensaje();
					echo $m->BuscarMensajeporFecha($_REQUEST['desde'],$_REQUEST['hasta']);
					// BuscarMensajeporFecha();
					 break;
				}
		case 16:
				 {
				 	$m=new Mensaje();
					echo $m->nuevosmensajes();
				 	//nuevosmensajes();
		 			 break;
	 			}
		case 17: {
					obtenerprivilegiodelusuario();
					break;
				 }
		case 18:{
					 $e=new Edificio();
					 echo $e->obtenercorreosdeunedificio($_REQUEST['edificios']);
					 //obtenercorreosdeunedificio();
					 break;
				}
		case 19:{
					 $e=new Edificio();
					 echo $e->obtenercorreosdeunPiso($_REQUEST['edificio'],$_REQUEST['piso'] );
					//obtenercorreosdeunPiso();
					 break;
				}
		case 20:{
					$e=new Edificio();
					 echo $e->obtenercorreosdeunApartamento($_REQUEST['edificio'],$_REQUEST['piso'], $_REQUEST['apartamentos'] );
					// obtenercorreosdeunApartamento();
					 break;
				}
		case 21: 
				{			 
					obtenerAdministradores();
					 break;
				}
		case 22:{
					obtenernombredelusuariologueado();
					break;
				}
		case 23:{
					$m=new Mensaje();
					echo $m->obtenermensajesEspecifico($_REQUEST["ID"]);
					//obtenermensajesEspecifico();
					break;
				}
			

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
	function obtenerprivilegiodelusuario(){
		session_start();
		echo json_encode($_SESSION["TipoUsuario"]);

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
	
?>