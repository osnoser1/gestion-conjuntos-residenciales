<?php

class PagosController extends GxController {

    public function actionView($id) {
        $this->render('view', array(
            'model' => $this->loadModel($id, 'Pagos'),
        ));
    }

    public function actionViewPendientes() {
        session_start();
//        $idUsuario = $_POST["ID"];
        $idUsuario = 3;
        $salida["datos"]["pagos"] = Yii::app()->db->createCommand()
                ->select('idPagosUsuario, gasto_fecha.idGastoFecha, Fecha, IF(Estado="1", "Pagado", "No pagado") AS Estado')
                ->from('pagos_usuario, gasto_fecha')
                ->where("idUsuario=$idUsuario AND gasto_fecha.idGastoFecha=pagos_usuario.idGastoFecha")
                ->queryAll();
//        $gf = GastoFecha::model()->findBySql('SELECT * FROM gasto_fecha ORDER BY Fecha DESC LIMIT 1');
////        var_dump($gf);
//        $gh = GastoHistorial::model()->findAll("idGastoFecha=$gf->idGastoFecha");
//        $salida["datos"]["Fecha"] = $gf->Fecha;
//        $salida["datos"]["Ano"] = date('Y', strtotime($gf->Fecha));
//        $salida["datos"]["Mes"] = date('M', strtotime($gf->Fecha));
//        foreach ($gh as $value) {
//            $el = $value->getAttributes();
//            $el['Nombre'] = $value->idGasto0->Nombre;
//            $salida["datos"]["gastos"][] = $el;
//        }
//        $salida["gastos"] = $this->modelToArray(Gasto::model()->findAll());
//        $salida["Total"] = Yii::app()->db->createCommand()
//                        ->select('SUM(Precio) as Total')
//                        ->from('gasto_historial')
//                        ->where("idGastoFecha=$gf->idGastoFecha")
//                        ->queryRow()["Total"];
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
