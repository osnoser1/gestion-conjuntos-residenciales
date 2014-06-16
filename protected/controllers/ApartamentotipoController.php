<?php

class ApartamentotipoController extends GxController {


	public function actionView($id) {
		$this->render('view', array(
			'model' => $this->loadModel($id, 'Apartamentotipo'),
		));
	}

	public function actionCreate() {
		$model = new Apartamentotipo;


		if (isset($_POST['Apartamentotipo'])) {
			$model->setAttributes($_POST['Apartamentotipo']);

			if ($model->save()) {
				if (Yii::app()->getRequest()->getIsAjaxRequest())
					Yii::app()->end();
				else
					$this->redirect(array('view', 'id' => $model->idApartamentoTipo));
			}
		}

		$this->render('create', array( 'model' => $model));
	}

	public function actionUpdate($id) {
		$model = $this->loadModel($id, 'Apartamentotipo');


		if (isset($_POST['Apartamentotipo'])) {
			$model->setAttributes($_POST['Apartamentotipo']);

			if ($model->save()) {
				$this->redirect(array('view', 'id' => $model->idApartamentoTipo));
			}
		}

		$this->render('update', array(
				'model' => $model,
				));
	}

	public function actionDelete($id) {
		if (Yii::app()->getRequest()->getIsPostRequest()) {
			$this->loadModel($id, 'Apartamentotipo')->delete();

			if (!Yii::app()->getRequest()->getIsAjaxRequest())
				$this->redirect(array('admin'));
		} else
			throw new CHttpException(400, Yii::t('app', 'Your request is invalid.'));
	}

	public function actionIndex() {
		$dataProvider = new CActiveDataProvider('Apartamentotipo');
		$this->render('index', array(
			'dataProvider' => $dataProvider,
		));
	}

	public function actionAdmin() {
		$model = new Apartamentotipo('search');
		$model->unsetAttributes();

		if (isset($_GET['Apartamentotipo']))
			$model->setAttributes($_GET['Apartamentotipo']);

		$this->render('admin', array(
			'model' => $model,
		));
	}

}