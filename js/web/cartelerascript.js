$(function() {
    $('.summernote').summernote({
        height: 200,
        lang: 'es-ES'
    });  
});   
function publicar(){
    console.log($('.summernote').code(""));
}  
eventos();  
$(document).ready(function() {  
    $('#Edificios').multiselect({
	    buttonText: function(options) {
			if (options.length === 0) {
				return 'Seleccionar Edificios <b class="caret"></b>';
			}		
			else if (options.length > 4) {
               	return options.length + ' selected  <b class="caret"></b>';
            }
            else {
                var selected = '';
				options.each(function() {
                    selected += $(this).text() + ', ';
				});
            	return selected.substr(0, selected.length -2) + ' <b class="caret"></b>';
			}
		},	            
    });  
    $('#Edificios').multiselect('rebuild'); 
    $('#Edificios2').multiselect({
	    buttonText: function(options) {
			if (options.length === 0) {
				return 'Seleccionar un Edificio <b class="caret"></b>';
			}		
			else if (options.length > 4) {
               	return options.length + ' selected  <b class="caret"></b>';
            }
            else {
                var selected = '';
				options.each(function() {
                    selected += $(this).text() + ', ';
				});
            	return selected.substr(0, selected.length -2) + ' <b class="caret"></b>';
			}
		},	            
    }); 
    $('#Edificios2').multiselect('rebuild'); 
	$('#Edificios3').multiselect({
	    buttonText: function(options) {
			if (options.length === 0) {
				return 'Seleccionar un Edificio <b class="caret"></b>';
			}		
			else if (options.length > 4) {
               	return options.length + ' selected  <b class="caret"></b>';
            }
            else {
                var selected = '';
				options.each(function() {
                    selected += $(this).text() + ', ';
				});
            	return selected.substr(0, selected.length -2) + ' <b class="caret"></b>';
			}
		},	            
    });  
    $('#Edificios3').multiselect('rebuild'); 
    $('#Edificios4').multiselect({
	    buttonText: function(options) {
			if (options.length === 0) {
				return 'Seleccionar un Edificio <b class="caret"></b>';
			}		
			else if (options.length > 4) {
               	return options.length + ' selected  <b class="caret"></b>';
            }
            else {
                var selected = '';
				options.each(function() {
                    selected += $(this).text() + ', ';
				});
            	return selected.substr(0, selected.length -2) + ' <b class="caret"></b>';
			}
		},	            
    });  
    $('#Edificios4').multiselect('rebuild'); 
	$('#Pisos').multiselect({
	    buttonText: function(options) {
			if (options.length === 0) {
				return 'Seleccionar Pisos <b class="caret"></b>';
			}		
			else if (options.length > 4) {
               	return options.length + ' selected  <b class="caret"></b>';
            }
            else {
                var selected = '';
				options.each(function() {
                    selected += $(this).text() + ', ';
				});
            	return selected.substr(0, selected.length -2) + ' <b class="caret"></b>';
			}
		},	            
    });  
    $('#Pisos').multiselect('rebuild'); 
	$('#Pisos2').multiselect({
	    buttonText: function(options) {
			if (options.length === 0) {
				return 'Seleccione un Piso <b class="caret"></b>';
			}		
			else if (options.length > 4) {
               	return options.length + ' selected  <b class="caret"></b>';
            }
            else {
                var selected = '';
				options.each(function() {
                    selected += $(this).text() + ', ';
				});
            	return selected.substr(0, selected.length -2) + ' <b class="caret"></b>';
			}
		},	            
    });  
	$('#Pisos2').multiselect('rebuild'); 
	$('#Apartamentos').multiselect({
	    buttonText: function(options) {
			if (options.length === 0) {
				return 'Seleccionar Aptos <b class="caret"></b>';
			}		
			else if (options.length > 4) {
               	return options.length + ' selected  <b class="caret"></b>';
            }
            else {
                var selected = '';
				options.each(function() {
                    selected += $(this).text() + ', ';
				});
            	return selected.substr(0, selected.length -2) + ' <b class="caret"></b>';
			}
		},	            
    });  
    $('#Apartamentos').multiselect('rebuild'); 
	$('#Apartamentos2').multiselect({
	    buttonText: function(options) {
			if (options.length === 0) {
				return 'Seleccionar Aptos <b class="caret"></b>';
			}		
			else if (options.length > 4) {
               	return options.length + ' selected  <b class="caret"></b>';
            }
            else {
                var selected = '';
				options.each(function() {
                    selected += $(this).text() + ', ';
				});
            	return selected.substr(0, selected.length -2) + ' <b class="caret"></b>';
			}
		},	            
    });  
    $('#Apartamentos2').multiselect('rebuild'); 
}); 
$('.accordion-toggle').on('click', function(event) {
    event.preventDefault();
});
$('#myTab a').click(function (e) {
  	e.preventDefault()
	$(this).tab('show')
})
$('#myTab2 a').click(function (e) {
	e.preventDefault()
	$(this).tab('show')
})
$(function () {
    $('#myTab a:last').tab('show')
})