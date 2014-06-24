<?php

class UsuarioController extends GxController {

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
//$gf = GastoFecha::model()->findBySql('SELECT * FROM gasto_fecha ORDER BY Fecha DESC LIMIT 1');
        $usuarios = Usuario::model()->findAll();
        for ($i = 0; $i < count($usuarios); $i++) {
            $salida[$i]['ID'] = $usuarios[$i]->ID;
            $salida[$i]['Nombre'] = $usuarios[$i]->Nombre;
            $salida[$i]['Apellido'] = $usuarios[$i]->Apellido;
            $salida[$i]['Cedula'] = $usuarios[$i]->Cedula;
            $salida[$i]['Correo'] = $usuarios[$i]->Correo;
            $salida[$i]['Contrasena'] = $usuarios[$i]->Contrasena;
            $salida[$i]['TipoUsuario'] = $usuarios[$i]->TipoUsuario;
        }
        echo $this->salida(true, $salida);
    }

    public function actionDetalle() {
        if (isset($_POST['datos'])) {
            $idUsuario = $_POST['datos'];
            $u = Usuario::model()->find("ID=$idUsuario");
            $array['datos'] = $u->getAttributes();
            $array['datos']["telefonos"] = $this->modelToArray($u->telefonos);
//            var_dump($array);
            echo $this->salida(true, $array);
        } else {
            echo $this->salida(false, "aviso", "Error en el servidor");
        }
    }

    public function modelToArray($models) {
        if ($models != null) {
            foreach ($models as $value) {
                $array[] = $value->getAttributes();
            }
            return $array;
        } else
            return array();
    }

    public function actionEliminar() {
        if (isset($_POST['datos'])) {
            $idUsuario = $_POST['datos'];
            $criteria = new CDbCriteria;
            echo var_dump($idUsuario);
            $criteria->addInCondition('ID', array($idUsuario));
            Usuario::model()->deleteAll($criteria);
            echo $this->salida();
        } else {
            echo $this->salida(false, "aviso", "Error en el servidor");
        }
    }

    public function actionInsertar() {
        if (isset($_POST['datos'])) {
            $usuario = $_POST['datos'];
            $model = new Usuario;
            $model->setAttributes($usuario);
            $model->insert();
        }

        if (isset($_POST['telefonos'])) {
            $telefonos = $_POST['telefonos'];
            $telefonos = (array) $_POST['telefonos'];
//echo var_dump($telefonos);
            foreach ($telefonos as $telefono) {
                $modelTelefono = new telefono;
                $telefono['IDUsuario'] = $model->ID;
                $modelTelefono->setAttributes($telefono);
                $modelTelefono->insert();
            }
        }
    }

    public function actionModificar() {
        if (isset($_POST['datos'])) {
            $usuario = (array) $_POST['datos'];
            echo var_dump($usuario);
            $model = Usuario::model()->findByPk($usuario['ID']);
            $model->setAttributes($usuario);
            if (($bandera = $model->update()))
                echo $this->salida();
            else
                echo $this->salida(false, "aviso", "Error al actualizar usuario");
        } else {
            echo $this->salida(false, "aviso", "Error en el servidor");
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

    public function actionUpdate($id) {
        $model = $this->loadModel($id, 'Usuario');

        $this->performAjaxValidation($model, 'usuario-form');

        if (isset($_POST['Usuario'])) {
            $model->setAttributes($_POST['Usuario']);

            if ($model->save()) {
                $this->redirect(array('view', 'id' => $model->ID));
            }
        }

        $this->render('update', array(
            'model' => $model,
        ));
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

    public function actionBuscar() {
        if (isset($_POST['datos'])) {
            $usuariocorreo = $_POST['datos'];
//            echo var_dump($usuariocorreo);
            $u = Usuario::model()->findByAttributes(["Correo" => $usuariocorreo['Correo']]);
            if ($u == null) {
                echo $this->salida(false, "aviso", "Correo invalido");
                return;
            }
            $u = Usuario::model()->findByAttributes(["Correo" => $usuariocorreo["Correo"], "Contrasena" => $usuariocorreo["Contrasena"]]);
            if ($u == null) {
                echo $this->salida(false, "aviso", "Contraseña invalida");
                return;
            }
            session_start();
            $_SESSION["ID"] = $u->ID;
            $_SESSION["Correo"] = $u->Correo;
            echo $this->salida(true);
        } else {
            echo $this->salida(false, "aviso", "Error en el servidor");
        }
    }

    public function actionUsuarioLogueado() {
        session_start();
        if (isset($_SESSION["ID"])) {
            echo $_SESSION["ID"];
        } else
            echo null;
    }

}
