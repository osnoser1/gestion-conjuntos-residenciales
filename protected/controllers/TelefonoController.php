<?php

class TelefonoController extends GxController {


	public function actionView($id) {
		$this->render('view', array(
			'model' => $this->loadModel($id, 'telefono'),
		));
	}

	public function actionCreate() {
		$model = new telefono;

		$this->performAjaxValidation($model, 'telefono-form');

		if (isset($_POST['telefono'])) {
			$model->setAttributes($_POST['telefono']);

			if ($model->save()) {
				if (Yii::app()->getRequest()->getIsAjaxRequest())
					Yii::app()->end();
				else
					$this->redirect(array('view', 'id' => $model->IDTelefono));
			}
		}

		$this->render('create', array( 'model' => $model));
	}

	public function actionUpdate($id) {
		$model = $this->loadModel($id, 'telefono');

		$this->performAjaxValidation($model, 'telefono-form');

		if (isset($_POST['telefono'])) {
			$model->setAttributes($_POST['telefono']);

			if ($model->save()) {
				$this->redirect(array('view', 'id' => $model->IDTelefono));
			}
		}

		$this->render('update', array(
				'model' => $model,
				));
	}

	public function actionDelete($id) {
		if (Yii::app()->getRequest()->getIsPostRequest()) {
			$this->loadModel($id, 'telefono')->delete();

			if (!Yii::app()->getRequest()->getIsAjaxRequest())
				$this->redirect(array('admin'));
		} else
			throw new CHttpException(400, Yii::t('app', 'Your request is invalid.'));
	}

	public function actionIndex() {
		$dataProvider = new CActiveDataProvider('telefono');
		$this->render('index', array(
			'dataProvider' => $dataProvider,
		));
	}

	public function actionAdmin() {
		$model = new telefono('search');
		$model->unsetAttributes();

		if (isset($_GET['telefono']))
			$model->setAttributes($_GET['telefono']);

		$this->render('admin', array(
			'model' => $model,
		));
	}

}