<?php

/**
 * This is the model base class for the table "pagos_usuario".
 * DO NOT MODIFY THIS FILE! It is automatically generated by giix.
 * If any changes are necessary, you must set or override the required
 * property or method in class "PagosUsuario".
 *
 * Columns in table "pagos_usuario" available as properties of the model,
 * followed by relations of table "pagos_usuario" available as properties of the model.
 *
 * @property integer $idPagosUsuario
 * @property integer $idUsuario
 * @property integer $idGastoFecha
 * @property integer $Estado
 *
 * @property PagosHistorialUsuario[] $pagosHistorialUsuarios
 * @property GastoFecha $idGastoFecha0
 * @property Usuario $idUsuario0
 */
abstract class BasePagosUsuario extends GxActiveRecord {

	public static function model($className=__CLASS__) {
		return parent::model($className);
	}

	public function tableName() {
		return 'pagos_usuario';
	}

	public static function label($n = 1) {
		return Yii::t('app', 'PagosUsuario|PagosUsuarios', $n);
	}

	public static function representingColumn() {
		return 'idPagosUsuario';
	}

	public function rules() {
		return array(
			array('idUsuario, idGastoFecha, Estado', 'required'),
			array('idUsuario, idGastoFecha, Estado', 'numerical', 'integerOnly'=>true),
			array('idPagosUsuario, idUsuario, idGastoFecha, Estado', 'safe', 'on'=>'search'),
		);
	}

	public function relations() {
		return array(
			'pagosHistorialUsuarios' => array(self::HAS_MANY, 'PagosHistorialUsuario', 'idPagosUsuario'),
			'idGastoFecha0' => array(self::BELONGS_TO, 'GastoFecha', 'idGastoFecha'),
			'idUsuario0' => array(self::BELONGS_TO, 'Usuario', 'idUsuario'),
		);
	}

	public function pivotModels() {
		return array(
		);
	}

	public function attributeLabels() {
		return array(
			'idPagosUsuario' => Yii::t('app', 'Id Pagos Usuario'),
			'idUsuario' => null,
			'idGastoFecha' => null,
			'Estado' => Yii::t('app', 'Estado'),
			'pagosHistorialUsuarios' => null,
			'idGastoFecha0' => null,
			'idUsuario0' => null,
		);
	}

	public function search() {
		$criteria = new CDbCriteria;

		$criteria->compare('idPagosUsuario', $this->idPagosUsuario);
		$criteria->compare('idUsuario', $this->idUsuario);
		$criteria->compare('idGastoFecha', $this->idGastoFecha);
		$criteria->compare('Estado', $this->Estado);

		return new CActiveDataProvider($this, array(
			'criteria' => $criteria,
		));
	}
}