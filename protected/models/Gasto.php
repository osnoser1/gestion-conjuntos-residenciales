<?php

Yii::import('application.models._base.BaseGasto');

class Gasto extends BaseGasto
{
	public static function model($className=__CLASS__) {
		return parent::model($className);
	}
}