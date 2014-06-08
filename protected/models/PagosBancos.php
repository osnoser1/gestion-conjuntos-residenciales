<?php

Yii::import('application.models._base.BasePagosBancos');

class PagosBancos extends BasePagosBancos
{
	public static function model($className=__CLASS__) {
		return parent::model($className);
	}
}