<?php

class PublicacionController extends GxController {

        public function actionListar(){
            $publicaciones = Publicacion::model()->findAll();
            foreach ($publicaciones as &$value) {
                $salida[] = $value->getAttributes();
            }
            echo $this->salida(true, 'publicaciones', $salida);
        }
        
	public function actionView($id) {
		$this->render('view', array(
			'model' => $this->loadModel($id, 'Publicacion'),
		));
	}

	public function actionCreate() {
		$model = new Publicacion;


		if (isset($_POST['Publicacion'])) {
			$model->setAttributes($_POST['Publicacion']);

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
		$model = $this->loadModel($id, 'Publicacion');


		if (isset($_POST['Publicacion'])) {
			$model->setAttributes($_POST['Publicacion']);

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
			$this->loadModel($id, 'Publicacion')->delete();

			if (!Yii::app()->getRequest()->getIsAjaxRequest())
				$this->redirect(array('admin'));
		} else
			throw new CHttpException(400, Yii::t('app', 'Your request is invalid.'));
	}

	public function actionIndex() {
		$dataProvider = new CActiveDataProvider('Publicacion');
		$this->render('index', array(
			'dataProvider' => $dataProvider,
		));
	}

	public function actionAdmin() {
		$model = new Publicacion('search');
		$model->unsetAttributes();

		if (isset($_GET['Publicacion']))
			$model->setAttributes($_GET['Publicacion']);

		$this->render('admin', array(
			'model' => $model,
		));
	}

}