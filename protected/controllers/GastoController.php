<?php

class GastoController extends GxController {

    /**
     * This is the default 'index' action that is invoked
     * when an action is not explicitly requested by users.
     */
    public function actionIndex() {
        // renders the view file 'protected/views/site/index.php'
        // using the default layout 'protected/views/layouts/main.php'
        $this->render('index');
    }

    public function getListadoSitios(&$o) {
        $array = [];
        if ($o instanceof Edificio) {
            $array[] = ["text" => "Edif. $o->Nombre", "idEdificio" => $o->idEdificio];
            for ($index = 1; $index <= $o->NroDePisos; $index++) {
                $array[] = ["text" => "Piso $index - Edif. $o->Nombre", "idEdificio" => $o->idEdificio, "NroDePiso" => $index + ""];
            }
        } else {
            $nombre = $o->idEdificio0->Nombre;
            $array[] = ["text" => "Apto. $o->Nombre - Edif. $nombre", "idEdificio" => $o->idEdificio, "idApartamento" => $o->idApartamento, "NroDePiso" => $o->Piso + ""];
        }
        return $array;
    }

    public function actionView() {
        $gf = GastoFecha::model()->findBySql('SELECT * FROM gasto_fecha ORDER BY Fecha DESC LIMIT 1');
//        var_dump($gf);
        echo $this->salida(true, $this->getDatos($gf));
    }

    public function getDatos(GastoFecha $gf) {
        $gh = GastoHistorial::model()->findAll("idGastoFecha=$gf->idGastoFecha");
        $salida["datos"]["Fecha"] = $gf->Fecha;
        $salida["datos"]["Ano"] = date('Y', strtotime($gf->Fecha));
        $salida["datos"]["Mes"] = date('M', strtotime($gf->Fecha));
        $salida["datos"]["GEH"] = [];
        foreach ($gh as $value) {
            $el = $value->getAttributes();
            $el['Nombre'] = $value->idGasto0->Nombre;
            $salida["datos"]["gastos"][] = $el;
            $gehs = GastoEntidadHistorial::model()->findAllByAttributes(["idGastoHistorial" => $value->idGastoHistorial]);
            $salida["datos"]["GEH"] = array_merge($salida["datos"]["GEH"], $this->modelToArray($gehs));
        }
        $salida["gastos"] = $this->modelToArray(Gasto::model()->findAll());
        $salida["Total"] = Yii::app()->db->createCommand()
                        ->select('SUM(Precio) as Total')
                        ->from('gasto_historial')
                        ->where("idGastoFecha=$gf->idGastoFecha")
                        ->queryRow()["Total"];
        $edificios = Edificio::model()->findAll();
        $salida["datos"]["sitios"] = array_merge([], $this->getListado($edificios));
        $aptos = Apartamento::model()->findAll();
        $salida["datos"]["sitios"] = array_merge($salida["datos"]["sitios"], $this->getListado($aptos));
        $salida["datos"]["sitios"][] = ["text" => "Todos"];
        return $salida;
    }

    public function getListado(&$array) {
        $a = [];
        foreach ($array as $value) {
            $a = array_merge($a, $this->getListadoSitios($value));
        }
        return $a;
    }

    public function actionCreate() {
//        sleep(10);
        if (isset($_POST['datos'])) {
            $datos = $_POST['datos'];
            $geh = new GastoEntidadHistorial;
            $geh->setAttributes($datos["tag"]);
            $geh->setAttribute("idGastoHistorial", $datos["id"]);
            if ($geh->insert()) {
                echo $this->salida(true, "id", $geh->idEntidadHistorial);
            } else {
                echo $this->salida(false, "aviso", "Error en el servidor");
            }
        } else {
            echo $this->salida(false, "aviso", "Error en el servidor");
        }
    }

    public function actionCreateHistorial() {
        if (isset($_POST['datos'])) {
            $gasto = $_POST['datos'];
            if (!isset($gasto['idGasto'])) {
                $model = new Gasto;
                $model->setAttributes($gasto);
                $model->insert();
            } else {
                $model = Gasto::model()->findByPk($gasto['idGasto']);
                if ($model == NULL) {
                    echo $this->salida(false, "aviso", "Error en el servidor");
                    return;
                }
            }
            $gf = GastoFecha::model()->findByAttributes(array('Fecha' => $gasto['Fecha']));
            $gh = new GastoHistorial;
            $gh->setAttributes(['idGasto' => $model->idGasto, 'Precio' => $gasto['Precio'], 'idGastoFecha' => $gf->getPrimaryKey()]);
            $gh->insert();
            $salida = $gh->getAttributes();
            $salida['Nombre'] = $gh->idGasto0->Nombre;
            echo $this->salida(true, "gasto_historial", $salida);
//
//            if ($model->save()) {
//                if (Yii::app()->getRequest()->getIsAjaxRequest())
//                    Yii::app()->end();
//                else
//                    $this->redirect(array('view', 'id' => $model->ID));
//            }
        } else {
            echo $this->salida(false, "aviso", "Error en el servidor");
        }
    }

    public function actionUpdateHistorial() {
        if (isset($_POST['datos'])) {
            $gastoHistorial = (array) $_POST['datos'];
            $gh = GastoHistorial::model()->findByPk($gastoHistorial['idGastoHistorial']);
            $gh->setAttributes($gastoHistorial);
            if (($bandera = $gh->update()))
                echo $this->salida();
            else
                echo $this->salida(false, "aviso", "Error al actualizar gasto");
        } else {
            echo $this->salida(false, "aviso", "Error en el servidor");
        }
    }

    public function actionDeleteHistorial() {
        if (isset($_POST['datos'])) {
            $gastos = (array) $_POST['datos'];
            $criteria = new CDbCriteria;
            $criteria->addInCondition('idGastoHistorial', $gastos);
            GastoHistorial::model()->deleteAll($criteria);
            echo $this->salida();
        } else {
            echo $this->salida(false, "aviso", "Error en el servidor");
        }
    }

    public function actionListar() {
        $gf = Yii::app()->db->createCommand('SELECT gf.idGastoFecha, gf.Fecha, SUM(gh.Precio) AS Total FROM gasto_historial gh, gasto_fecha gf WHERE gf.idGastoFecha=gh.idGastoFecha GROUP BY gf.idGastoFecha')->queryAll();
//        var_dump($gf);
        echo $this->salida(true, 'datos', ['gastos' => $gf]);
    }

    public function actionDetalle() {
        if (isset($_POST['datos'])) {
            $id = $_POST['datos'];
            $gh = GastoHistorial::model()->findAll("idGastoFecha=$id");
            $gf = GastoFecha::model()->find("idGastoFecha=$id");
            $salida["datos"]["Fecha"] = $gf->Fecha;
            $salida["datos"]["Ano"] = date('Y', strtotime($gf->Fecha));
            $salida["datos"]["Mes"] = date('M', strtotime($gf->Fecha));
            $salida["datos"]["GEH"] = [];
            foreach ($gh as $value) {
                $el = $value->getAttributes();
                $el['Nombre'] = $value->idGasto0->Nombre;
                $salida["datos"]["gastos"][] = $el;
                $gehs = GastoEntidadHistorial::model()->findAllByAttributes(["idGastoHistorial" => $value->idGastoHistorial]);
                $salida["datos"]["GEH"] = array_merge($salida["datos"]["GEH"], $this->modelToArray($gehs));
            }
            $salida["Total"] = Yii::app()->db->createCommand()
                            ->select('SUM(Precio) as Total')
                            ->from('gasto_historial')
                            ->where("idGastoFecha=$id")
                            ->queryRow()["Total"];
            $edificios = Edificio::model()->findAll();
            $salida["datos"]["sitios"] = array_merge([], $this->getListado($edificios));
            $aptos = Apartamento::model()->findAll();
            $salida["datos"]["sitios"] = array_merge($salida["datos"]["sitios"], $this->getListado($aptos));
            $salida["datos"]["sitios"][] = ["text" => "Todos"];
            echo $this->salida(true, $salida);
        } else {
            echo $this->salida(false, "aviso", "Error en el servidor");
        }
    }

    public function actionProcesarMes() {
        $gf = GastoFecha::model()->findBySql('SELECT * FROM gasto_fecha ORDER BY Fecha DESC LIMIT 1');
        $gh = GastoHistorial::model()->findAll("idGastoFecha=$gf->idGastoFecha");
        foreach ($gh as $value) {
            $geh = $value->gastoEntidadHistorials;
            $array = [];
            foreach ($geh as $g) {
                $array = array_merge($array, $this->getReverseListado($g));
            }
            $tAlicuota = 0;
            foreach ($array as &$v) {
                $tAlicuota += floatval($v->idapartamento0->idTipo0->Alicuota);
            }
            foreach ($array as &$v) {
                $model = PagosUsuario::model()->findByAttributes(["idUsuario" => $v->idusuario, "idGastoFecha" => $gf->idGastoFecha]);
                if ($model == NULL) {
                    $model = new PagosUsuario;
                    $model->setAttributes(["idUsuario" => $v->idusuario, "idGastoFecha" => $gf->idGastoFecha]);
                    if (!$model->insert()) {
                        echo $this->salida(false, "aviso", "Error en el servidor");
                        return;
                    }
                }
                $phu = new PagosHistorialUsuario;
                $phu->setAttributes(["idPagosUsuario" => $model->idPagosUsuario, "idGastoHistorial" => $value->idGastoHistorial, "TotalAlicuota" => floatval($v->idapartamento0->idTipo0->Alicuota) / $tAlicuota * floatval($value->Precio)]);
                if (!$phu->insert()) {
                    echo $this->salida(false, "aviso", "Error en el servidor");
                    return;
                }
            }
        }
        $date = new DateTime($gf->Fecha);
        $date->add(new DateInterval('P1M'));
        $gf = new GastoFecha;
        $gf->setAttribute("Fecha", $date->format('Y-m-d'));
        if (!$gf->insert()) {
            echo $this->salida(false, "aviso", "Error en el servidor");
            return;
        }
        echo $this->salida();
    }

    public function getReverseListado($geh) {
        if ($geh->idApartamento == NULL && $geh->NroDePiso == NULL) {
            return $geh->idEdificio == NULL ? ApartamentoUsuario::model()->findAll() : ApartamentoUsuario::model()->findAllBySql("SELECT * FROM " . Apartamento::model()->tableName() . "," . ApartamentoUsuario::model()->tableName() . " WHERE " . ApartamentoUsuario::model()->tableName() . '.idapartamento=' . Apartamento::model()->tableName() . '.idApartamento AND idEdificio=' . $geh->idEdificio);
        } else if ($geh->idApartamento == NULL) {
            return ApartamentoUsuario::model()->findAllBySql("SELECT * FROM " . Apartamento::model()->tableName() . "," . ApartamentoUsuario::model()->tableName() . " WHERE " . ApartamentoUsuario::model()->tableName() . '.idapartamento=' . Apartamento::model()->tableName() . ".idApartamento AND idEdificio=$geh->idEdificio AND Piso=$geh->NroDePiso");
        } else {
            return [ApartamentoUsuario::model()->findByAttributes(["idapartamento" => $geh->idApartamento])];
        }
    }

    public function modelToArray($models) {
        if (is_null($models) || count($models) == 0) {
            return [];
        }
        foreach ($models as $value) {
            $array[] = $value->getAttributes();
        }
        return $array;
    }

    function salida($respuesta = true, $key = null, $value = null) {
        if ($key == null) {
            return json_encode(array('respuesta' => $respuesta));
        } else if ($value == null) {
            $key["respuesta"] = $respuesta;
            return json_encode($key);
        }
        return json_encode(array('respuesta' => $respuesta, $key => $value));
    }

    public function actionFunctionName() {
        echo $this->salida('false');
    }

//    public function accessRules() {
//        return array(
//            array('allow',
//                'actions' => array('index', 'view', 'procesarcedula'),
//                'users' => array('*')
//            ),
//        );
//    }
}
