<?php
header('content-type:text/html;charset=utf-8');
$id=$_POST['id'];
switch($id)
{
    case 1:
    CrearPago();
    break;
    case 2:
    ListarPagos();
    break;
    case 3:
    ModificarEstadoPago();
    break;
    default;
}



function CrearPago(){
    session_start();
    $mysqli = new mysqli("localhost", "root", "", "conjunto_residencial");
    $mysqli->query("SET NAMES 'utf8'");
    $nuevo=$_REQUEST['nuevo'];

    $idusuario=$_SESSION["ID"];
    $monto=$nuevo['monto'];
    $idtipo=$nuevo['idtipo'];
    $nro_referencia=$nuevo['nro_referencia'];
    $idbanco=$nuevo['idbanco'];
    $fecha=$nuevo['fecha'];
    $date = new DateTime($fecha);
    $fecha = $date->format('Y-m-d');
    $concepto=$nuevo['concepto'];

    $tupla="INSERT INTO pagos (idusuario, monto, idtipo, nro_referencia, idbanco, fecha, idEstado, concepto) VALUES ('$idusuario', '$monto', '$idtipo', '$nro_referencia', '$idbanco', '$fecha', '1', '$concepto')";
    $resultado = $mysqli->query($tupla);
}

function ListarPagos(){

    session_start();
    $mysqli = new mysqli("localhost", "root", "", "conjunto_residencial");
    $mysqli->query("SET NAMES 'utf8'");
    $permiso=$_SESSION['TipoUsuario'];
    $idusuario=$_SESSION["ID"];

    $tupla = "SELECT *,pagos.id as idpago FROM pagos INNER JOIN usuario ON pagos.idusuario = usuario.ID INNER JOIN pagos_tipos ON pagos.idtipo = pagos_tipos.id INNER JOIN pagos_bancos ON pagos.idbanco = pagos_bancos.id INNER JOIN pagos_estados ON pagos.idEstado = pagos_Estados.id";
    if($permiso != 2)
        $tupla .= " WHERE pagos.idusuario = '$idusuario'";
    else
        $tupla .= " WHERE pagos.idEstado = '1'";
    $tupla .= " ORDER BY pagos.id ASC";

    $resultado = $mysqli->query($tupla);

    $i = 0;
    $objeto = array();
    //$objeto[0]['m']="";
    while ($db_resultado = mysqli_fetch_array($resultado, MYSQLI_ASSOC)) {
        $objeto[$i]['id'] = $db_resultado['idpago'];
        $objeto[$i]['idusuario'] = $db_resultado['idusuario'];
        $objeto[$i]['Nombre'] = $db_resultado['Nombre'];
        $objeto[$i]['Apellido'] = $db_resultado['Apellido'];
        $objeto[$i]['monto'] = $db_resultado['monto'];
        $objeto[$i]['idtipo'] = $db_resultado['idtipo'];
        $objeto[$i]['tipo'] = $db_resultado['tipo'];
        $objeto[$i]['nro_referencia'] = $db_resultado['nro_referencia'];
        $objeto[$i]['idbanco'] = $db_resultado['idbanco'];
        $objeto[$i]['banco'] = $db_resultado['banco'];
        $objeto[$i]['fecha'] = $db_resultado['fecha'];
        $objeto[$i]['idEstado'] = $db_resultado['idEstado'];
        $objeto[$i]['estado'] = $db_resultado['estado'];
        $objeto[$i]['concepto'] = $db_resultado['concepto'];
        $i++;
    }
    echo json_encode($objeto);
}

function ModificarEstadoPago(){
    $mysqli = new mysqli("localhost", "root", "", "conjunto_residencial");
    $mysqli->query("SET NAMES 'utf8'");
    $idPago=$_REQUEST['idPago'];
    $estado=$_REQUEST['estado'];
    $idUsuario=$_REQUEST['idUsuario'];
    $monto=$_REQUEST['monto'];
    $tupla="UPDATE pagos SET idEstado='$estado' WHERE id=$idPago";
    $resultado = $mysqli->query($tupla);
    $tupla="UPDATE usuario SET Abono = Abono + $monto WHERE usuario.ID = $idUsuario";
    $resultado = $mysqli->query($tupla);
}