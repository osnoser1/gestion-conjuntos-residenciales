<?php

class PagosEstadosController extends GxController {


	public function actionView($id) {
		$this->render('view', array(
			'model' => $this->loadModel($id, 'PagosEstados'),
		));
	}

	public function actionCreate() {
		$model = new PagosEstados;


		if (isset($_POST['PagosEstados'])) {
			$model->setAttributes($_POST['PagosEstados']);

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
		$model = $this->loadModel($id, 'PagosEstados');


		if (isset($_POST['PagosEstados'])) {
			$model->setAttributes($_POST['PagosEstados']);

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
			$this->loadModel($id, 'PagosEstados')->delete();

			if (!Yii::app()->getRequest()->getIsAjaxRequest())
				$this->redirect(array('admin'));
		} else
			throw new CHttpException(400, Yii::t('app', 'Your request is invalid.'));
	}

	public function actionIndex() {
		$dataProvider = new CActiveDataProvider('PagosEstados');
		$this->render('index', array(
			'dataProvider' => $dataProvider,
		));
	}

	public function actionAdmin() {
		$model = new PagosEstados('search');
		$model->unsetAttributes();

		if (isset($_GET['PagosEstados']))
			$model->setAttributes($_GET['PagosEstados']);

		$this->render('admin', array(
			'model' => $model,
		));
	}

}