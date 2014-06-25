<?php

class EdificioController extends GxController {

    public function actionView($id) {
        $this->render('view', array(
            'model' => $this->loadModel($id, 'Usuario'),
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

    public function actionListar() {
        $edificios = Edificio::model()->findAll();
        foreach ($edificios as &$value) {
            $salida[] = $value->getAttributes();
        }
        echo $this->salida(true, 'edificios', $salida);
    }

    public function actionEliminar() {
        if (isset($_POST['datos'])) {
            $idUsuario = (array) $_POST['datos'];
//            var_dump($idUsuario);
            $criteria = new CDbCriteria;
            $criteria->addInCondition('idEdificio', $idUsuario);

            if (Edificio::model()->deleteAll($criteria)) {

                echo $this->salida();
            } else {
                echo $this->salida(false, "aviso", "Error en el servidor");
            }
        } else {
            echo $this->salida(false, "aviso", "Error en el servidor");
        }
    }

    public function actionDetalle() {
        if (isset($_POST['datos'])) {
            $idEdificio = (array) $_POST['datos'];
//            var_dump($idUsuario);
            $model = Edificio::model()->findByPk($idEdificio);
            $salida["edificio"] = $model->getAttributes();
            echo $this->salida(true, $salida);
        } else {
            echo $this->salida(false, "aviso", "Error en el servidor");
        }
    }

    public function actionAgregar() {
        if (isset($_POST['datos'])) {
            $edificio = $_POST['datos'];
            $model = new Edificio;
            $model->setAttributes($edificio);
            $model->insert();
            echo $this->salida();
        } else {
            echo $this->salida(false);
        }
    }

    public function actionCreate() {
        $model = new Usuario;

        $this->performAjaxValidation($model, 'usuario-form');

        if (isset($_POST['Usuario'])) {
            $model->setAttributes($_POST['Usuario']);

            if ($model->save()) {
                if (Yii::app()->getRequest()->getIsAjaxRequest())
                    Yii::app()->end();
                else
                    $this->redirect(array('view', 'id' => $model->ID));
            }
        }

        $this->render('create', array('model' => $model));
    }

    public function actionUpdate() {
        if (isset($_POST['datos'])) {
            $edificio = $_POST['datos'];
            $model = Edificio::model()->findByPk($edificio["idEdificio"]);
            $model->setAttributes($edificio);
            if ($model->save()) {
                echo $this->salida();
            } else {
                echo $this->salida(false, "aviso", "Error en el servidor");
            }
        } else {
            echo $this->salida(false);
        }
    }

    public function actionDelete($id) {
        if (Yii::app()->getRequest()->getIsPostRequest()) {
            $this->loadModel($id, 'Usuario')->delete();

            if (!Yii::app()->getRequest()->getIsAjaxRequest())
                $this->redirect(array('admin'));
        } else
            throw new CHttpException(400, Yii::t('app', 'Your request is invalid.'));
    }

    public function actionIndex() {
        $dataProvider = new CActiveDataProvider('Usuario');
        $this->render('index', array(
            'dataProvider' => $dataProvider,
        ));
    }

    public function actionAdmin() {
        $model = new Usuario('search');
        $model->unsetAttributes();

        if (isset($_GET['Usuario']))
            $model->setAttributes($_GET['Usuario']);

        $this->render('admin', array(
            'model' => $model,
        ));
    }

}
