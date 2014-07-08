<?php

Yii::import('application.models._base.BasePublicacion');

class Publicacion extends BasePublicacion
{
	public static function model($className=__CLASS__) {
		return parent::model($className);
	}
}