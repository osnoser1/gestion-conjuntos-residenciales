/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';
/* Controllers */

var myApp = angular.module('myApp');

myApp.controllerProvider.register('GestionarServiciosCtrl', function($scope, $http, $q, $filter, $timeout, $rootScope) {
    console.log('GestionarServiciosCtrl');
    $scope.prueba = "mesaje";
    $scope.datos = {
        servicios: [
            {id: 1, nombre: 'Limpieza'},
            {id: 2, nombre: 'Ascensores'}
        ],
    };
    console.log($scope.datos);

});

$(document).ready(function() {

    // page is now ready, initialize the calendar...
    var c = localStorage.getItem("cont");
    var cont = c === null ? 1 : JSON.parse(c);
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    var datosDate = new Object;
    var a = localStorage.getItem("datosDate");
    var array = a === null ? [] : JSON.parse(a);
    var calendar = $('#calendario').fullCalendar({
        header: {
            left: 'prev, today',
            center: 'title',
            right: 'next'
        },
        selectable: true,
        selectHelper: true,
        select: function(start, end, allDay) {
            $('#modalPersonas').modal('show');
            datosDate.start = start;
            datosDate.end = start;
            datosDate.allDay = allDay;
//            var title = prompt('Event Title:');
//            if (title) {
//                calendar.fullCalendar('renderEvent',
//                        {
//                            title: title,
//                            start: start,
//                            end: end,
//                            allDay: allDay
//                        },
//                true // make the event "stick"
//                        );
//            }
            calendar.fullCalendar('unselect');
        },
        editable: true

    });
    $.each(array, function() {
        addCumpleCalendario(this);
        addCumpleTabla(this);
    });

    $('#bAgregar').click(function() {
        var nombre = $('#tbNombre').val();
        var apellido = $('#tbApellido').val();
        if (nombre.trim() !== "" && apellido.trim() !== "") {
            datosDate.nombre = nombre;
            datosDate.apellido = apellido;
            datosDate.id = cont++;
            localStorage.setItem("cont", cont);
            addCumpleCalendario(datosDate);
            addCumpleTabla(datosDate);
            array.push(JSON.parse(JSON.stringify(datosDate)));
//            console.log(array);
            limpiarModal();
            localStorage.setItem("datosDate", JSON.stringify(array));
        }

        $('#modalPersonas').modal('hide');


    });

    function limpiarModal() {
        $('#tbNombre').val("");
        $('#tbApellido').val("");


    }

    function addCumpleCalendario(datosDate) {
        var title = "Cumpeaños de " + datosDate.nombre + " " + datosDate.apellido;
        calendar.fullCalendar('renderEvent',
                {id: datosDate.id,
                    title: title,
                    start: datosDate.start,
                    end: datosDate.end,
                    allDay: datosDate.allDay
                },
        true // make the event "stick"
                );
    }

    function addCumpleTabla(datos) {
        $('table .tbody-personas').append("<tr class='tr-persona' id='tr-" + datos.id + "'><td class='td-id'>" + datos.id + "</td><td class='td-nombre'>" + datos.nombre + "</td><td class='td-apellido'>" + datos.apellido + "</td></tr>");

    }

    $('table').on('click', ".tr-persona", function() {
        $('.tr-persona').removeClass('active');
        $(this).addClass('active');


    });

    $('#bEliminar').click(function() {
        var id = $('table .active').find('.td-id').text();
        calendar.fullCalendar('removeEvents', [id]);
        $('#tr-' + id).remove();
        var indice;
        $.each(array, function(index) {
            if (this.id == id) {
                indice = index;
            }
        });
        array.splice(indice, 1);
        localStorage.setItem("datosDate", JSON.stringify(array));
    });



    $('#calendar').fullCalendar({
        dayClick: function(date, allDay, jsEvent, view) {

            if (allDay) {
                alert('Clicked on the entire day: ' + date);
            } else {
                alert('Clicked on the slot: ' + date);
            }

            alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);

            //alert('Current view: ' + view.name);

            // change the day's background color just for fun
            $(this).css('background-color', 'red');

        }
    });


});