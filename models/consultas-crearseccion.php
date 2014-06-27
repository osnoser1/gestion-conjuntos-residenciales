<?php
    include("conector.php");
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
        case 4:
            obtenerseccion();
        default;
    }
function obtenerseccion(){
    $mysqli = new mysqli(Host, User, Pass, BasedeDatos);
    $idseccion=$_REQUEST['idseccion'];
    $tupla="SELECT  * FROM  publicacion  WHERE  id='$idseccion'";
    $resultado = $mysqli->query($tupla);
    $objeto[0]['m']=$resultado->num_rows;
    $i = 0;   
    if($db_resultado = mysqli_fetch_array($resultado, MYSQLI_ASSOC)) {
        $objeto[$i]['id'] = $db_resultado['id'];
        $objeto[$i]['titulo'] = $db_resultado['titulo'];
        $objeto[$i]['contenido'] = $db_resultado['contenido'];        
    }
    echo json_encode($objeto);
}
function GuardarSeccion(){
    $mysqli = new mysqli(Host, User, Pass, BasedeDatos);
    $titulo=$_REQUEST['titulo'];
    $contenido=$_REQUEST['contenido'];
    $tupla="INSERT INTO publicacion (titulo,contenido) VALUES ('$titulo','$contenido')";
    $resultado = $mysqli->query($tupla);
}

function ListarSeccion(){
    $mysqli = new mysqli(Host, User, Pass, BasedeDatos);

    $tupla = "SELECT * FROM publicacion";
    $resultado = $mysqli->query($tupla);
    $objeto[0]['m']=$resultado->num_rows;
    $i = 0;
   
    while ($db_resultado = mysqli_fetch_array($resultado, MYSQLI_ASSOC)) {
        $objeto[$i]['id'] = $db_resultado['id'];
        $objeto[$i]['titulo'] = $db_resultado['titulo'];
        $objeto[$i]['contenido'] = $db_resultado['contenido'];
        $i++;
    }
    echo json_encode($objeto);
}

function ModificarSeccion(){
    $mysqli = new mysqli(Host, User, Pass, BasedeDatos);
    $idseccion=$_REQUEST['idseccion'];
    $titulo=$_REQUEST['titulo'];
    $contenido=$_REQUEST['contenido'];
    
    $tupla="UPDATE publicacion SET titulo='$titulo', contenido='$contenido' WHERE id=$idseccion";
    $resultado = $mysqli->query($tupla);
    $objeto = true;
    echo json_encode($objeto);
}