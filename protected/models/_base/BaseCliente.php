<?php

/**
 * This is the model base class for the table "cliente".
 * DO NOT MODIFY THIS FILE! It is automatically generated by giix.
 * If any changes are necessary, you must set or override the required
 * property or method in class "Cliente".
 *
 * Columns in table "cliente" available as properties of the model,
 * followed by relations of table "cliente" available as properties of the model.
 *
 * @property integer $idCliente
 * @property string $Nombre
 * @property string $Correo
 * @property string $Cedula
 * @property integer $Estado
 *
 * @property Clienteopcionhorario[] $clienteopcionhorarios
 */
abstract class BaseCliente extends GxActiveRecord {

	public static function model($className=__CLASS__) {
		return parent::model($className);
	}

	public function tableName() {
		return 'cliente';
	}

	public static function label($n = 1) {
		return Yii::t('app', 'Cliente|Clientes', $n);
	}

	public static function representingColumn() {
		return 'Cedula';
	}

	public function rules() {
		return array(
			array('Cedula, Estado', 'required'),
			array('Estado', 'numerical', 'integerOnly'=>true),
			array('Nombre', 'length', 'max'=>40),
			array('Correo', 'length', 'max'=>25),
			array('Cedula', 'length', 'max'=>8),
			array('Nombre, Correo', 'default', 'setOnEmpty' => true, 'value' => null),
			array('idCliente, Nombre, Correo, Cedula, Estado', 'safe', 'on'=>'search'),
		);
	}

	public function relations() {
		return array(
			'clienteopcionhorarios' => array(self::HAS_MANY, 'Clienteopcionhorario', 'idCliente'),
		);
	}

	public function pivotModels() {
		return array(
		);
	}

	public function attributeLabels() {
		return array(
			'idCliente' => Yii::t('app', 'Id Cliente'),
			'Nombre' => Yii::t('app', 'Nombre'),
			'Correo' => Yii::t('app', 'Correo'),
			'Cedula' => Yii::t('app', 'Cedula'),
			'Estado' => Yii::t('app', 'Estado'),
			'clienteopcionhorarios' => null,
		);
	}

	public function search() {
		$criteria = new CDbCriteria;

		$criteria->compare('idCliente', $this->idCliente);
		$criteria->compare('Nombre', $this->Nombre, true);
		$criteria->compare('Correo', $this->Correo, true);
		$criteria->compare('Cedula', $this->Cedula, true);
		$criteria->compare('Estado', $this->Estado);

		return new CActiveDataProvider($this, array(
			'criteria' => $criteria,
		));
	}
}