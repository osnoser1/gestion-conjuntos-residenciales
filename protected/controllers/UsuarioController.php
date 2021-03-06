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

    public function actionDetalleConApartamento() {
        if (isset($_POST['datos'])) {
            $idUsuario = $_POST['datos'];
            $salida = Yii::app()->db->createCommand('SELECT usuario.*, apartamento.idEdificio, apartamento.Piso,apartamento_usuario.idapartamento, apartamento.Nombre as NombreApartamento, edificio.Nombre as NombreEdificio FROM usuario LEFT JOIN apartamento_usuario ON usuario.ID = apartamento_usuario.idusuario LEFT JOIN apartamento ON apartamento.idApartamento = apartamento_usuario.idapartamento LEFT JOIN edificio ON edificio.idEdificio = apartamento.idEdificio LEFT JOIN telefono ON usuario.ID = telefono.IDUsuario WHERE usuario.ID = ' . $idUsuario . '')->queryAll();
            echo $this->salida(true, $salida);
        }
    }

    public function actionListarConApartamento() {
        $salida = Yii::app()->db->createCommand('SELECT usuario.*, apartamento.idEdificio, apartamento.Piso,apartamento_usuario.idapartamento, apartamento.Nombre as NombreApartamento, edificio.Nombre as NombreEdificio FROM usuario LEFT JOIN apartamento_usuario ON usuario.ID = apartamento_usuario.idusuario LEFT JOIN apartamento ON apartamento.idApartamento = apartamento_usuario.idapartamento LEFT JOIN edificio ON edificio.idEdificio = apartamento.idEdificio ORDER BY usuario.ID ASC')->queryAll();
        echo $this->salida(true, 'usuarios', $salida);
    }

    public function actionDetalle() {
        if (isset($_POST['datos'])) {
            $idUsuario = $_POST['datos'];
            $u = Usuario::model()->find("ID=$idUsuario");
            $array['datos'] = $u->getAttributes();
            $array['datos']["telefonos"] = $this->modelToArray($u->telefonos);
            $salida = Yii::app()->db->createCommand('SELECT apartamento.idEdificio, apartamento.Piso,apartamento_usuario.idapartamento, apartamento.Nombre as NombreApartamento, edificio.Nombre as NombreEdificio FROM usuario LEFT JOIN apartamento_usuario ON usuario.ID = apartamento_usuario.idusuario LEFT JOIN apartamento ON apartamento.idApartamento = apartamento_usuario.idapartamento LEFT JOIN edificio ON edificio.idEdificio = apartamento.idEdificio WHERE usuario.ID = ' . $idUsuario . '')->queryAll();
            //var_dump($this->modelToArray($u->telefonos));
            $array['datos']["apartamento"] = $salida;
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

    public function actionEliminarTelefono() {
        if (isset($_POST['datos'])) {
            $idTelefono = (array) $_POST['datos'];
            $criteria = new CDbCriteria;
            $criteria->addInCondition('IDTelefono', array($idTelefono['IDTelefono']));
            Telefono::model()->deleteAll($criteria);
            echo $this->salida(true, "aviso", "Telefono eliminado");
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
            foreach ($telefonos as $telefono) {
                $modelTelefono = new telefono;
                $telefono['IDUsuario'] = $model->ID;
                $modelTelefono->setAttributes($telefono);
                $modelTelefono->insert();
            }
        }
        if (isset($_POST['datos']) && $model->TipoUsuario != 2 && isset($apartamento_usuario['idapartamento'])) {
            $apartamento_usuario = $_POST['datos'];
            $apartamento_usuario['idusuario'] = $model->ID;
            $apartamento_usuario['idapartamento'] = $apartamento_usuario['idApartamento'];

            $modelApartamentoUsuario = new ApartamentoUsuario;
            $modelApartamentoUsuario->setAttributes($apartamento_usuario);
            $modelApartamentoUsuario->insert();
        }
    }

    public function actionModificar() {
        if (isset($_POST['datos'])) {
            $usuario = (array) $_POST['datos'];
            $model = Usuario::model()->findByPk($usuario['ID']);
            $model->setAttributes($usuario);
            if (($bandera = $model->update())){}
                //echo $this->salida();
            else{
                echo $this->salida(false, "aviso", "Error al actualizar usuario");
                return;
            }

            $AU = ApartamentoUsuario::model()->findByAttributes(["idusuario" => $usuario['ID']]);
            $AU->setAttributes($usuario);
            if (($bandera = $AU->update()))
                echo $this->salida();
            else{
                echo $this->salida(false, "aviso", "Error al actualizar usuario");
                return;
            }



        } else {
            echo $this->salida(false, "aviso", "Error en el servidor");
        }
    }

    public function actionModificarClave() {
        session_start();
        if (isset($_SESSION["ID"]) && isset($_POST['datos'])) {
            $clavemodificado = $_POST['datos'];
            $identificador = $_SESSION["ID"];
            $u = Usuario::model()->findByAttributes(["ID" => $identificador, "Contrasena" => $clavemodificado["Contrasena"]]);
            if ($u == null) {
                echo $this->salida(false, "aviso", "Contraseña invalida");
                return;
            }
            $u->setAttributes(["Contrasena" => $clavemodificado["Nueva"]]);
            if (($bandera = $u->update()))
                echo $this->salida(true, "aviso", "Contraseña Modificada Exitosamente");
            else
                echo $this->salida(false, "aviso", "Error al cambiar contraseña");
        } else
            echo $this->salida(false, "aviso", "Error en el servidor");
    }

    public function actionModificarPerfil() {
        session_start();
        if (isset($_SESSION["ID"]) && isset($_POST['datos'])) {
            $datosmodificados = $_POST['datos'];
            $identificador = $_SESSION["ID"];
            $uCorreo = Usuario::model()->findByAttributes(["Correo" => $datosmodificados["Correo"]]);
            if ($uCorreo != null && $uCorreo->ID != $identificador) {
                echo $this->salida(false, "aviso", "El correo ya existe");
                return;
            }
            $u = Usuario::model()->findByPk($identificador);
            if ($u == null) {
                echo $this->salida(false, "aviso", "El usuario no existe");
                return;
            }
            //$u->setAttributes($datosmodificados);
            $u->setAttributes(["Correo" => $datosmodificados["Correo"]]);
            foreach ($datosmodificados["telefonos"] as $value) {
                $tel = null;
                if (isset($value["IDTelefono"]))
                    $tel = Telefono::model()->findByPk($value["IDTelefono"]);
                if ($tel != null) {
                    $tel->setAttributes($value);
                    if (!($bandera2 = $tel->update()))
                        echo $this->salida(true, "aviso", "Error al guardar el telefono");
                }else {
                    $modelTelefono = new telefono;
                    $value['IDUsuario'] = $u->ID;
                    $modelTelefono->setAttributes($value);
                    $modelTelefono->insert();
                }
            }
            if ($bandera = $u->update())
                echo $this->salida(true, "aviso", "Perfil modificado exitosamente");
            else
                echo $this->salida(false, "aviso", "Error actualizando perfil");
        } else
            echo $this->salida(false, "aviso", "Error en el servidor");
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
            $_SESSION["Nombre"] = $u->Nombre;
            $_SESSION["Apellido"] = $u->Apellido;
            $_SESSION["TipoUsuario"] = $u->TipoUsuario;
            echo $this->salida(true);
        } else {
            echo $this->salida(false, "aviso", "Error en el servidor");
        }
    }

    public function actionTipoUsuario() {
        session_start();
        if (isset($_SESSION["ID"])) {
            $model = $this->loadModel($_SESSION["ID"], 'Usuario');
            echo $model->TipoUsuario;
            //$this->salida(true, 'TipoUsuario', $model->TipoUsuario);
            return;
        } else
            echo null;
    }

    public function actionUsuarioLogueado() {
        session_start();
        if (isset($_SESSION["ID"])) {
            echo $_SESSION["ID"];
        } else
            echo null;
    }

    public function actionCerrarSesion() {
        session_start();
        unset($_SESSION);
//        $_SESSION = [];
        session_destroy();
//        return json_encode(array("respuesta" => true));
    }

}
