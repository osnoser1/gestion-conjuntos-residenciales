<?php
$id=$_POST['id'];
switch($id)
{
    case 1:
    GuardarSeccion();
    break;
    case 2:
    ListarSeccion();
    break;
    case 3:
    ModificarSeccion();
    break;
    default;
}

function GuardarSeccion(){
    $mysqli = new mysqli("localhost", "root", "", "conjunto_residencial");
    $titulo=$_REQUEST['titulo'];
    $contenido=$_REQUEST['contenido'];
    $tupla="INSERT INTO publicacion (titulo,contenido) VALUES ('$titulo','$contenido')";
    $resultado = $mysqli->query($tupla);
}

function ListarSeccion(){
    $mysqli = new mysqli("localhost", "root", "", "conjunto_residencial");

    $tupla = "SELECT * FROM publicacion";
    $resultado = $mysqli->query($tupla);

    $i = 0;
    $objeto = array();
    while ($db_resultado = mysqli_fetch_array($resultado, MYSQLI_ASSOC)) {
        $objeto[$i]['id'] = $db_resultado['id'];
        $objeto[$i]['titulo'] = $db_resultado['titulo'];
        $objeto[$i]['contenido'] = $db_resultado['contenido'];
        $i++;
    }
    echo json_encode($objeto);
}

function ModificarSeccion(){
    $mysqli = new mysqli("localhost", "root", "", "conjunto_residencial");
    $idseccion=$_REQUEST['idseccion'];
    $titulo=$_REQUEST['titulo'];
    $contenido=$_REQUEST['contenido'];
    $tupla="UPDATE publicacion SET titulo='$titulo', contenido='$contenido' WHERE id=$idseccion";
    $resultado = $mysqli->query($tupla);
    $objeto = true;
    echo json_encode($objeto);
}