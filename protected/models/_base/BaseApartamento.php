<?php

/**
 * This is the model base class for the table "apartamento".
 * DO NOT MODIFY THIS FILE! It is automatically generated by giix.
 * If any changes are necessary, you must set or override the required
 * property or method in class "Apartamento".
 *
 * Columns in table "apartamento" available as properties of the model,
 * followed by relations of table "apartamento" available as properties of the model.
 *
 * @property integer $idApartamento
 * @property string $Nombre
 * @property integer $Piso
 * @property integer $idEdificio
 * @property integer $idTipo
 *
 * @property Apartamentotipo $idTipo0
 * @property Edificio $idEdificio0
 * @property ApartamentoUsuario[] $apartamentoUsuarios
 * @property GastoEntidadHistorial[] $gastoEntidadHistorials
 */
abstract class BaseApartamento extends GxActiveRecord {

	public static function model($className=__CLASS__) {
		return parent::model($className);
	}

	public function tableName() {
		return 'apartamento';
	}

	public static function label($n = 1) {
		return Yii::t('app', 'Apartamento|Apartamentos', $n);
	}

	public static function representingColumn() {
		return 'Nombre';
	}

	public function rules() {
		return array(
			array('Nombre, Piso, idEdificio, idTipo', 'required'),
			array('Piso, idEdificio, idTipo', 'numerical', 'integerOnly'=>true),
			array('Nombre', 'length', 'max'=>20),
			array('idApartamento, Nombre, Piso, idEdificio, idTipo', 'safe', 'on'=>'search'),
		);
	}

	public function relations() {
		return array(
			'idTipo0' => array(self::BELONGS_TO, 'Apartamentotipo', 'idTipo'),
			'idEdificio0' => array(self::BELONGS_TO, 'Edificio', 'idEdificio'),
			'apartamentoUsuarios' => array(self::HAS_MANY, 'ApartamentoUsuario', 'idapartamento'),
			'gastoEntidadHistorials' => array(self::HAS_MANY, 'GastoEntidadHistorial', 'idApartamento'),
		);
	}

	public function pivotModels() {
		return array(
		);
	}

	public function attributeLabels() {
		return array(
			'idApartamento' => Yii::t('app', 'Id Apartamento'),
			'Nombre' => Yii::t('app', 'Nombre'),
			'Piso' => Yii::t('app', 'Piso'),
			'idEdificio' => null,
			'idTipo' => null,
			'idTipo0' => null,
			'idEdificio0' => null,
			'apartamentoUsuarios' => null,
			'gastoEntidadHistorials' => null,
		);
	}

	public function search() {
		$criteria = new CDbCriteria;

		$criteria->compare('idApartamento', $this->idApartamento);
		$criteria->compare('Nombre', $this->Nombre, true);
		$criteria->compare('Piso', $this->Piso);
		$criteria->compare('idEdificio', $this->idEdificio);
		$criteria->compare('idTipo', $this->idTipo);

		return new CActiveDataProvider($this, array(
			'criteria' => $criteria,
		));
	}
}