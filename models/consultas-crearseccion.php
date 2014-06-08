<?php
    $id=$_POST['id'];
    switch($id)
    {
        case 1:
                GuardarSeccion();
        break;
        default;
    }
    
    function GuardarSeccion(){
        $mysqli = new mysqli("localhost", "root", "", "conjunto-residencial");
        $titulo=$_REQUEST['Titulo'];
        $contenido=$_REQUEST['contenido'];
        $tupla="INSERT INTO publicacion (titulo,contenido) VALUES ('$titulo','$contenido')";
	$resultado = $mysqli->query($tupla);
    }



?>