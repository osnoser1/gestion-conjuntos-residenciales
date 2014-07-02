<?php
    include("conector.php");
    if(isset($_POST['id'])){$id=$_POST['id'];
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
            break;
        case 5:
            actualizarfooter();
            break;
        case 6:
            obtenerfootter();
            break;
        case 7:
            actualizartitulo();
            break;
        case 8: 
            obtenerimagen();
            break;
        default;
    }
   }
        
       /* if(isset($_FILES['archivos'])){
            $mysqli = new mysqli(Host, User, Pass, BasedeDatos);

          foreach ($_FILES as $key) {
            $imagen_temporal = $key['tmp_name'];
            //archivo temporal en binario
            $itmp = fopen($imagen_temporal, 'r+b');
            $archivo = fread($itmp, filesize($imagen_temporal));
            $archivo  =$mysqli->real_escape_string($archivo);  

            $tupla="INSERT INTO `conjunto_residencial`.`paginaprincipal` (`imagenfondo`) VALUES ('$archivo') ";
            $resultado = $mysqli->query($tupla) or die( $mysqli->error); 
          }
        }*/
    if(isset($_GET['id'])){
        $mysqli = new mysqli(Host, User, Pass, BasedeDatos);
        $tupla="SELECT imagenfondo FROM  paginaprincipal WHERE id='1'";
        $resultado = $mysqli->query($tupla);
        $objeto[0]['m']=$resultado->num_rows;
        if($db_resultado = mysqli_fetch_array($resultado, MYSQLI_ASSOC)) {
            $objeto[0]['imagenfondo'] = $db_resultado['imagenfondo'];                 
        }

        echo $objeto[0]['imagenfondo'];

    }
   function obtenerimagen(){
        $mysqli = new mysqli(Host, User, Pass, BasedeDatos);
        $tupla="SELECT imagenfondo FROM  paginaprincipal WHERE id='1'";
        $resultado = $mysqli->query($tupla);
        $objeto[0]['m']=$resultado->num_rows;
        if($db_resultado = mysqli_fetch_array($resultado, MYSQLI_ASSOC)) {
            $objeto[0]['imagenfondo'] = $db_resultado['imagenfondo'];                 
        }

        echo $objeto[0]['imagenfondo'];

    }
    function actualizartitulo(){
        $mysqli = new mysqli(Host, User, Pass, BasedeDatos);
        $titulo=$_REQUEST['titulo'];
        $tupla="UPDATE `paginaprincipal` SET `titulo`='$titulo' WHERE id='1'";
        $resultado = $mysqli->query($tupla);       
        echo json_encode("true");
    }
    function obtenerfootter(){
        $mysqli = new mysqli(Host, User, Pass, BasedeDatos);
        $tupla="SELECT footer,titulo, imagenfondo FROM  `paginaprincipal` WHERE id='1'";
         $resultado = $mysqli->query($tupla);
         $objeto[0]['m']=$resultado->num_rows;
        if($db_resultado = mysqli_fetch_array($resultado, MYSQLI_ASSOC)) {
            $objeto[0]['footer'] = $db_resultado['footer']; 
            $objeto[0]['titulo'] = $db_resultado['titulo'];         
        }

        echo json_encode($objeto);
    }
    function actualizarfooter(){
        $mysqli = new mysqli(Host, User, Pass, BasedeDatos);
        $footer=$_REQUEST['footer'];
        $tupla="UPDATE `paginaprincipal` SET `footer`='$footer' WHERE id='1'";
        $resultado = $mysqli->query($tupla);       
        echo json_encode("true");

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