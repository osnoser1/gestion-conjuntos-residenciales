<?php

Yii::import('application.models._base.BaseHorarioseleccion');

class Horarioseleccion extends BaseHorarioseleccion {

    public static function model($className = __CLASS__) {
        return parent::model($className);
    }

    public static function label($n = 1) {
        return Yii::t('app', 'Horario|Horarios', $n);
    }

}
