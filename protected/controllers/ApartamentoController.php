<?php

class ApartamentoController extends GxController {


	public function actionView($id) {
		$this->render('view', array(
			'model' => $this->loadModel($id, 'Apartamento'),
		));
	}
        
        public function actionListar(){
            $apartamentos = Apartamento::model()->findAll();
            foreach ($apartamentos as &$value) {
                $salida[] = $value->getAttributes();
            }
            echo $this->salida(true, 'apartamentos', $salida);
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

        public function actionInsertar(){
            if (isset($_POST['datos'])) {
			$apartamento = $_POST['datos'];
			$model = new Apartamento;
			$model->setAttributes($apartamento);
                    $model->insert();
		}
        }

	public function actionCreate() {
		$model = new Apartamento;


		if (isset($_POST['Apartamento'])) {
			$model->setAttributes($_POST['Apartamento']);

			if ($model->save()) {
				if (Yii::app()->getRequest()->getIsAjaxRequest())
					Yii::app()->end();
				else
					$this->redirect(array('view', 'id' => $model->idApartamento));
			}
		}

		$this->render('create', array( 'model' => $model));
	}

	public function actionUpdate($id) {
		$model = $this->loadModel($id, 'Apartamento');


		if (isset($_POST['Apartamento'])) {
			$model->setAttributes($_POST['Apartamento']);

			if ($model->save()) {
				$this->redirect(array('view', 'id' => $model->idApartamento));
			}
		}

		$this->render('update', array(
				'model' => $model,
				));
	}

	public function actionDelete($id) {
		if (Yii::app()->getRequest()->getIsPostRequest()) {
			$this->loadModel($id, 'Apartamento')->delete();

			if (!Yii::app()->getRequest()->getIsAjaxRequest())
				$this->redirect(array('admin'));
		} else
			throw new CHttpException(400, Yii::t('app', 'Your request is invalid.'));
	}

	public function actionIndex() {
		$dataProvider = new CActiveDataProvider('Apartamento');
		$this->render('index', array(
			'dataProvider' => $dataProvider,
		));
	}

	public function actionAdmin() {
		$model = new Apartamento('search');
		$model->unsetAttributes();

		if (isset($_GET['Apartamento']))
			$model->setAttributes($_GET['Apartamento']);

		$this->render('admin', array(
			'model' => $model,
		));
	}

}