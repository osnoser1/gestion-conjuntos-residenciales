<?php

/**
 * This is the model base class for the table "usuario".
 * DO NOT MODIFY THIS FILE! It is automatically generated by giix.
 * If any changes are necessary, you must set or override the required
 * property or method in class "Usuario".
 *
 * Columns in table "usuario" available as properties of the model,
 * followed by relations of table "usuario" available as properties of the model.
 *
 * @property integer $ID
 * @property integer $TipoUsuario
 * @property string $Nombre
 * @property string $Apellido
 * @property string $Cedula
 * @property string $Correo
 * @property string $Contrasena
 * @property double $Abono
 *
 * @property ApartamentoUsuario[] $apartamentoUsuarios
 * @property Pagos[] $pagoses
 * @property PagosUsuario[] $pagosUsuarios
 * @property Telefono[] $telefonos
 */
abstract class BaseUsuario extends GxActiveRecord {

	public static function model($className=__CLASS__) {
		return parent::model($className);
	}

	public function tableName() {
		return 'usuario';
	}

	public static function label($n = 1) {
		return Yii::t('app', 'Usuario|Usuarios', $n);
	}

	public static function representingColumn() {
		return 'Nombre';
	}

	public function rules() {
		return array(
			array('TipoUsuario, Nombre, Apellido, Cedula, Correo, Contrasena', 'required'),
			array('TipoUsuario', 'numerical', 'integerOnly'=>true),
			array('Abono', 'numerical'),
			array('Nombre, Apellido', 'length', 'max'=>30),
			array('Cedula', 'length', 'max'=>8),
			array('Correo', 'length', 'max'=>40),
			array('Contrasena', 'length', 'max'=>60),
			array('Abono', 'default', 'setOnEmpty' => true, 'value' => null),
			array('ID, TipoUsuario, Nombre, Apellido, Cedula, Correo, Contrasena, Abono', 'safe', 'on'=>'search'),
		);
	}

	public function relations() {
		return array(
			'apartamentoUsuarios' => array(self::HAS_MANY, 'ApartamentoUsuario', 'idusuario'),
			'pagoses' => array(self::HAS_MANY, 'Pagos', 'idusuario'),
			'pagosUsuarios' => array(self::HAS_MANY, 'PagosUsuario', 'idUsuario'),
			'telefonos' => array(self::HAS_MANY, 'Telefono', 'IDUsuario'),
		);
	}

	public function pivotModels() {
		return array(
		);
	}

	public function attributeLabels() {
		return array(
			'ID' => Yii::t('app', 'ID'),
			'TipoUsuario' => Yii::t('app', 'Tipo Usuario'),
			'Nombre' => Yii::t('app', 'Nombre'),
			'Apellido' => Yii::t('app', 'Apellido'),
			'Cedula' => Yii::t('app', 'Cedula'),
			'Correo' => Yii::t('app', 'Correo'),
			'Contrasena' => Yii::t('app', 'Contrasena'),
			'Abono' => Yii::t('app', 'Abono'),
			'apartamentoUsuarios' => null,
			'pagoses' => null,
			'pagosUsuarios' => null,
			'telefonos' => null,
		);
	}

	public function search() {
		$criteria = new CDbCriteria;

		$criteria->compare('ID', $this->ID);
		$criteria->compare('TipoUsuario', $this->TipoUsuario);
		$criteria->compare('Nombre', $this->Nombre, true);
		$criteria->compare('Apellido', $this->Apellido, true);
		$criteria->compare('Cedula', $this->Cedula, true);
		$criteria->compare('Correo', $this->Correo, true);
		$criteria->compare('Contrasena', $this->Contrasena, true);
		$criteria->compare('Abono', $this->Abono);

		return new CActiveDataProvider($this, array(
			'criteria' => $criteria,
		));
	}
}