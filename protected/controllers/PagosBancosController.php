<?php

class PagosBancosController extends GxController {


	public function actionView($id) {
		$this->render('view', array(
			'model' => $this->loadModel($id, 'PagosBancos'),
		));
	}

	public function actionCreate() {
		$model = new PagosBancos;


		if (isset($_POST['PagosBancos'])) {
			$model->setAttributes($_POST['PagosBancos']);

			if ($model->save()) {
				if (Yii::app()->getRequest()->getIsAjaxRequest())
					Yii::app()->end();
				else
					$this->redirect(array('view', 'id' => $model->id));
			}
		}

		$this->render('create', array( 'model' => $model));
	}

	public function actionUpdate($id) {
		$model = $this->loadModel($id, 'PagosBancos');


		if (isset($_POST['PagosBancos'])) {
			$model->setAttributes($_POST['PagosBancos']);

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
			$this->loadModel($id, 'PagosBancos')->delete();

			if (!Yii::app()->getRequest()->getIsAjaxRequest())
				$this->redirect(array('admin'));
		} else
			throw new CHttpException(400, Yii::t('app', 'Your request is invalid.'));
	}

	public function actionIndex() {
		$dataProvider = new CActiveDataProvider('PagosBancos');
		$this->render('index', array(
			'dataProvider' => $dataProvider,
		));
	}

	public function actionAdmin() {
		$model = new PagosBancos('search');
		$model->unsetAttributes();

		if (isset($_GET['PagosBancos']))
			$model->setAttributes($_GET['PagosBancos']);

		$this->render('admin', array(
			'model' => $model,
		));
	}

}