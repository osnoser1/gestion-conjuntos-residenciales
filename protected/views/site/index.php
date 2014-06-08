<?php
/* @var $this SiteController */

$this->pageTitle = Yii::app()->name;
?>
<h1 class="col-xs-12">Bienvenido a la <i><?php echo CHtml::encode(Yii::app()->name); ?></i></h1>

<form name="userForm" class="form-horizontal">
    <div class="col-xs-12"><div class="alert alert-danger fade">Cédula no existente o usted ya realizó la encuesta.</div></div>
    <p class="col-sm-7 text-justify"> Por favor, ingrese su cédula de identidad.</p>
    <div class="col-sm-12"> <!--ng-show="datos.idTipoPregunta == 3"-->
        <div class="col-sm-7">
            <div class="form-group">
                <label for="inputCedula" class="col-sm-2 control-label">Cédula</label>
                <div class="col-sm-10">
                    <input ng-show="!show" ng-pattern="/^\d+$/" name="cedula" ng-maxlength="8" ng-model="Cedula" type="text" class="form-control" id="inputCedula" placeholder="Ingrese aquí" required>
                    <p ng-show="userForm.cedula.$error.maxlength && !show" class="help-block">Cédula es muy larga.</p>
                    <p ng-show="userForm.cedula.$invalid && !show" class="help-block">Ingrese una cédula válida.</p>
                    <p ng-show="show" class="form-control-static">{{datos.cliente.Cedula}}</p>
                </div>
            </div>
            <div ng-show="!show" class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                    <a ng-click="procesarCedula(Cedula)" class="btn btn-primary" ng-disabled="userForm.cedula.$invalid || disabled || cargando">Entrar</a>
                </div>
            </div>
            <div ng-show="show">
                <div class="form-group">
                    <label for="inputNombre" class="col-sm-2 control-label">Nombre completo</label>
                    <div class="col-sm-10">
                        <p class="form-control-static">{{datos.cliente.Nombre}}</p>
                    </div>
                </div>
                <div class="form-group">
                    <label for="inputNombre" class="col-sm-2 control-label">Correo</label>
                    <div class="col-sm-10">
                        <input name="correo" ng-model="datos.cliente.Correo" type="email" class="form-control" id="inputNombre" placeholder="Ingrese aquí su correo electrónico">
                        <p ng-show="userForm.correo.$invalid" class="help-block">Ingrese un correo válido. Ejm: ejemplo@correo.com</p>
                    </div>
                </div>
                <strong class="inline-block">Por favor, seleccione su opción de preferencia</strong>
                <div class="col-sm-12">
                    <label class="radio-inline" >
                        <input ng-model="datos.opcionSeleccionada" type="radio" value="2"> Peluquería
                    </label>
                </div>
                <div class="col-sm-12">
                    <label class="radio-inline" >
                        <input ng-model="datos.opcionSeleccionada" type="radio" value="3"> Spa
                        <div ng-show="datos.opcionSeleccionada === '3'">
                            <div class="col-sm-12">
                                <label class="radio-inline" >
                                    <input ng-model="datos.opcionSeleccionada2" type="radio" value="4"> Masaje
                                </label>
                            </div>
                            <div class="col-sm-12">
                                <label class="radio-inline" >
                                    <input ng-model="datos.opcionSeleccionada2" type="radio" value="5"> Exfoliación
                                </label>
                            </div>
                            <div class="col-sm-12">
                                <label class="radio-inline" >
                                    <input ng-model="datos.opcionSeleccionada2" type="radio" value="6"> Baño chocolatado
                                </label>
                            </div>
                        </div>
                    </label>
                    <div class="col-sm-12">
                        <a ng-disabled="cargando || userForm.correo.$invalid" ng-click="enviarFormulario(datos)" class="btn btn-primary tm10">Aceptar</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="pull-right col-sm-3">
            <div class="list-group col-sm-12 scroll-list" ng-show="datos.opcionSeleccionada == '2' && horario.idSeleccion == '2' || datos.opcionSeleccionada == '3' && datos.opcionSeleccionada2 == horario.idSeleccion" ng-repeat="horario in datos.lista">
                <a ng-class="{
                            active: isSelected($index, horario)
                        }" ng-click="setSelected($index, horario)" ng-repeat="element in horario[0]" href="" class="list-group-item">{{element.Fecha}} - {{element.Hora}}</a>
            </div>
        </div>
    </div>

</form>

<script>
    var url = "<?php echo Yii::app()->createUrl('site'); ?>";
</script>