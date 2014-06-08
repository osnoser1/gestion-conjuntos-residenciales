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

    public function actionView($id) {
        $this->render('view', array(
            'model' => $this->loadModel($id, 'Usuario'),
        ));
    }

    public function actionCreate() {
//        sleep(10);
        if (isset($_POST['datos'])) {
            $gasto = $_POST['datos'];
//            $model->setAttributes($_POST['Usuario']);
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

    public function actionCreateHistorial() {
        if (isset($_POST['datos'])) {
            $gasto = $_POST['datos'];
            if (!isset($gasto['idGasto'])) {
                $model = new Gasto;
                $model->setAttributes($gasto);
                $model->insert();
            } else {
                $model = Gasto::model()->findAllByPk($gasto['idGasto']);
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

    public function actionUpdate($id) {
//        $model = $this->loadModel($id, 'Usuario');
//        if (isset($_POST['Usuario'])) {
//            $model->setAttributes($_POST['Usuario']);
//            if ($model->save()) {
//                $this->redirect(array('view', 'id' => $model->ID));
//            }
//        }
//        $this->render('update', array(
//            'model' => $model,
//        ));
    }

    public function actionDelete($id) {
//        if (Yii::app()->getRequest()->getIsPostRequest()) {
//            $this->loadModel($id, 'Usuario')->delete();
//
//            if (!Yii::app()->getRequest()->getIsAjaxRequest())
//                $this->redirect(array('admin'));
//        } else
//            throw new CHttpException(400, Yii::t('app', 'Your request is invalid.'));
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
