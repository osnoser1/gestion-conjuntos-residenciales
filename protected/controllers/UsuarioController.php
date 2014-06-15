<?php

class UsuarioController extends GxController {


	public function actionView($id) {
		$this->render('view', array(
			'model' => $this->loadModel($id, 'Usuario'),
			));
	}


	function salida($respuesta = true, $key = null, $value = null){
		if ($key == null) {
			return json_encode(array('respuesta' => $respuesta));
		} else if ($value == null) {
			$key["respuesta"] = $respuesta;
			return json_encode($key);
		}
		return json_encode(array('respuesta' => $respuesta, $key => $value));
	}

	public function actionListar(){
            $usuarios = Usuario::model()->findAll();
            for($i=0; $i < count($usuarios); $i++){
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

	public function actionEliminar(){
		if (isset($_POST['datos'])) {
			$idUsuario = (array) $_POST['datos'];
			$criteria = new CDbCriteria;
			$criteria->addInCondition('ID', $idUsuario);
			Usuario::model()->deleteAll($criteria);
			echo $this->salida();
		} else {
			echo $this->salida(false, "aviso", "Error en el servidor");
		}
	}

	public function actionInsertar(){
		if (isset($_POST['datos'])) {
			$usuario = $_POST['datos'];
			$model = new Usuario;
			$model->setAttributes($usuario);
            $model->insert();
		}
		
		if (isset($_POST['telefonos'])) {
			$telefonos = $_POST['telefonos'];
			//$telefonos = (array) $_POST['telefonos'];
			//echo var_dump($telefonos);
			/*foreach ($telefonos as $telefono) {
				$modelTelefono = new telefono;
				$telefono['IDUsuario'] = $model->ID;
				$modelTelefono->setAttributes($telefonos[0]);
				$modelTelefono->insert();
			}*/
			
			$modelTelefono = new telefono;
			$telefonos[0]['IDUsuario'] = $model->ID;
			$modelTelefono->setAttributes($telefonos[0]);
			$modelTelefono->insert();

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

		$this->render('create', array( 'model' => $model));
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

}