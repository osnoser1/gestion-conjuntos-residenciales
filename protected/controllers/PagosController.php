<?php

class PagosController extends GxController {

    public function actionView($id) {
        $this->render('view', array(
            'model' => $this->loadModel($id, 'Pagos'),
        ));
    }

    public function actionDetallePendientes() {
        if (isset($_POST['datos'])) {
            $pu = PagosUsuario::model()->findByPk($_POST['datos']);
            $gf = $pu->idGastoFecha0;
//        var_dump($gf);
            $phu = PagosHistorialUsuario::model()->findAll("idPagosUsuario=$pu->idPagosUsuario");
            $salida["datos"]["Fecha"] = $gf->Fecha;
            $salida["datos"]["Ano"] = date('Y', strtotime($gf->Fecha));
            $salida["datos"]["Mes"] = date('M', strtotime($gf->Fecha));
            foreach ($phu as $value) {
                $el = $value->getAttributes();
                $gh = $value->idGastoHistorial0;
                $el['Nombre'] = $gh->idGasto0->Nombre;
                $el['Precio'] = $gh->Precio;
                $salida["datos"]["pagos"][] = $el;
            }
            $salida["datos"]["Total"] = Yii::app()->db->createCommand()
                            ->select('SUM(TotalAlicuota) as Total')
                            ->from('pagos_historial_usuario')
                            ->where("idPagosUsuario=$pu->idPagosUsuario")
                            ->queryRow()["Total"];
            echo $this->salida(true, $salida);
        } else {
            echo $this->salida(false, "aviso", "Error en el servidor");
        }
    }

    public function actionPagoPendientes() {
        echo $this->salida(true);
    }

    public function actionViewPendientes() {
        session_start();
//        $idUsuario = $_POST["ID"];
        $idUsuario = 3;
        $salida["datos"]["pagos"] = Yii::app()->db->createCommand()
                ->select('idPagosUsuario, gasto_fecha.idGastoFecha, Fecha, IF(Estado="1", "Pagado", "No pagado") AS Estado, (SELECT SUM(TotalAlicuota) FROM pagos_historial_usuario, pagos_usuario WHERE pagos_historial_usuario.idPagosUsuario=pagos_usuario.idPagosUsuario AND gasto_fecha.idGastoFecha=pagos_usuario.idGastoFecha) AS Total')
                ->from('pagos_usuario, gasto_fecha')
                ->where("idUsuario=$idUsuario AND gasto_fecha.idGastoFecha=pagos_usuario.idGastoFecha AND Estado=2")
                ->queryAll();
        $salida["datos"]["Abono"] = 0;
        echo $this->salida(true, $salida);
    }

    public function actionCreate() {
        $model = new Pagos;


        if (isset($_POST['Pagos'])) {
            $model->setAttributes($_POST['Pagos']);

            if ($model->save()) {
                if (Yii::app()->getRequest()->getIsAjaxRequest())
                    Yii::app()->end();
                else
                    $this->redirect(array('view', 'id' => $model->id));
            }
        }

        $this->render('create', array('model' => $model));
    }

    public function actionUpdate($id) {
        $model = $this->loadModel($id, 'Pagos');


        if (isset($_POST['Pagos'])) {
            $model->setAttributes($_POST['Pagos']);

            if ($model->save()) {
                $this->redirect(array('view', 'id' => $model->id));
            }
        }

        $this->render('update', array(
            'model' => $model,
        ));
    }

    public function actionDelete($id) {
        if (Yii::app()->getRequest()->getIsPostRequest()) {
            $this->loadModel($id, 'Pagos')->delete();

            if (!Yii::app()->getRequest()->getIsAjaxRequest())
                $this->redirect(array('admin'));
        } else
            throw new CHttpException(400, Yii::t('app', 'Your request is invalid.'));
    }

    public function actionIndex() {
        $dataProvider = new CActiveDataProvider('Pagos');
        $this->render('index', array(
            'dataProvider' => $dataProvider,
        ));
    }

    public function actionAdmin() {
        $model = new Pagos('search');
        $model->unsetAttributes();

        if (isset($_GET['Pagos']))
            $model->setAttributes($_GET['Pagos']);

        $this->render('admin', array(
            'model' => $model,
        ));
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

}
