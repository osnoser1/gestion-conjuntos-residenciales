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

    public function actionView() {
        $gf = GastoFecha::model()->findBySql('SELECT * FROM gasto_fecha ORDER BY Fecha DESC LIMIT 1');
//        var_dump($gf);
        $gh = GastoHistorial::model()->findAll("idGastoFecha=$gf->idGastoFecha");
        $salida["datos"]["Fecha"] = $gf->Fecha;
        $salida["datos"]["Ano"] = date('Y', strtotime($gf->Fecha));
        $salida["datos"]["Mes"] = date('M', strtotime($gf->Fecha));
        foreach ($gh as $value) {
            $el = $value->getAttributes();
            $el['Nombre'] = $value->idGasto0->Nombre;
            $salida["datos"]["gastos"][] = $el;
        }
        $salida["gastos"] = $this->modelToArray(Gasto::model()->findAll());
        $salida["Total"] = Yii::app()->db->createCommand()
                        ->select('SUM(Precio) as Total')
                        ->from('gasto_historial')
                        ->where("idGastoFecha=$gf->idGastoFecha")
                        ->queryRow()["Total"];
        echo $this->salida(true, $salida);
    }

    public function actionCreate() {
//        sleep(10);
        if (isset($_POST['datos'])) {
            $gasto = $_POST['datos'];
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

    public function modelToArray($models) {
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
