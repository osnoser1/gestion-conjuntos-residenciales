<?php
    include("conector.php");
    $id=$_POST['id'];
    switch($id)
    {
        case 1:
                listarSeccion();
        break;
        default;
    }
    
    function listarSeccion(){
       $mysqli = new mysqli(Host, User, Pass, BasedeDatos);
        $tupla="Select * from publicacion";
	    $resultado = $mysqli->query($tupla);
        $objeto[0]['m']=$resultado->num_rows;	
		$i=0;
		while($db_resultado = mysqli_fetch_array($resultado, MYSQLI_ASSOC))
		{
			
			$objeto[$i]['titulo']=$db_resultado['titulo'];
			$objeto[$i]['contenido']=$db_resultado['contenido'];	
			$objeto[$i]['id']=$db_resultado['id'];	
                        $i++;	
		}		
		$mysqli->close();
		echo json_encode($objeto);
    }

?>
