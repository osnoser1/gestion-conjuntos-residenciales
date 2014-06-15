<?php

/**
 * This is the model base class for the table "edificio".
 * DO NOT MODIFY THIS FILE! It is automatically generated by giix.
 * If any changes are necessary, you must set or override the required
 * property or method in class "Edificio".
 *
 * Columns in table "edificio" available as properties of the model,
 * and there are no model relations.
 *
 * @property integer $idEdificio
 * @property string $Nombre
 * @property integer $NroDePisos
 *
 */
abstract class BaseEdificio extends GxActiveRecord {

	public static function model($className=__CLASS__) {
		return parent::model($className);
	}

	public function tableName() {
		return 'edificio';
	}

	public static function label($n = 1) {
		return Yii::t('app', 'Edificio|Edificios', $n);
	}

	public static function representingColumn() {
		return 'Nombre';
	}

	public function rules() {
		return array(
			array('Nombre, NroDePisos', 'required'),
			array('NroDePisos', 'numerical', 'integerOnly'=>true),
			array('Nombre', 'length', 'max'=>30),
			array('idEdificio, Nombre, NroDePisos', 'safe', 'on'=>'search'),
		);
	}

	public function relations() {
		return array(
		);
	}

	public function pivotModels() {
		return array(
		);
	}

	public function attributeLabels() {
		return array(
			'idEdificio' => Yii::t('app', 'Id Edificio'),
			'Nombre' => Yii::t('app', 'Nombre'),
			'NroDePisos' => Yii::t('app', 'Nro De Pisos'),
		);
	}

	public function search() {
		$criteria = new CDbCriteria;

		$criteria->compare('idEdificio', $this->idEdificio);
		$criteria->compare('Nombre', $this->Nombre, true);
		$criteria->compare('NroDePisos', $this->NroDePisos);

		return new CActiveDataProvider($this, array(
			'criteria' => $criteria,
		));
	}
}