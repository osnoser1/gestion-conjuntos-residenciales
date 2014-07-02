
<?php
      include("conector.php");
      $mysqli = new mysqli(Host, User, Pass, BasedeDatos);
      foreach ($_FILES as $key) {
        $imagen_temporal = $key['tmp_name'];
        //archivo temporal en binario
        $itmp = fopen($imagen_temporal, 'r+b');
        $archivo = fread($itmp, filesize($imagen_temporal));
        $archivo  =$mysqli->real_escape_string($archivo);  

        $tupla="UPDATE `conjunto_residencial`.`paginaprincipal` SET  `imagenfondo`='$archivo' WHERE  id='1' ";
        $resultado = $mysqli->query($tupla) or die( $mysqli->error); 
      }

?>