<?php

Yii::import('application.models._base.BaseUsuario');

class Usuario extends BaseUsuario
{
	public static function model($className=__CLASS__) {
		return parent::model($className);
	}
}