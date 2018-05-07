	$(document).ready(function () {
	
		form_LogRegi();		
	
	});



/*DA ESTILOS AL MODAL CON LOS CLICKS*/
	function form_LogRegi(){
		$(".opcionesLog").click(function(event) {
	    	var id=this.getAttribute("id");
	    	var idLogin="hacerLogin";
	    	var idRegistro="hacerRegistro";
			var titleLogin= "titleLogin";    	
			var titleReg= "titleReg";

	    	$('.opcionesLog').find('h4').attr('style', '');
	    	$('.opcionesLog').parents('div.col-md-6').attr('style', '');
	    	$('#'+id+'').find('h4').attr('style', 'border-bottom: 1px solid #000000;padding-bottom: 3px; ');
	    	// $('#'+id+'').parents('div.col-md-6').attr('style', 'padding-top: 10px; background-color: #f6f6f6;');
	    	
	    	if (id===titleLogin) {
	    		$('#'+idRegistro+'').attr('style', 'display: none;');
	    		$('#'+idLogin+'').attr('style', 'display: block;');
	    	}
	    	if (id===titleReg) {
	    		$('#'+idLogin+'').attr('style', 'display: none;');
	    		$('#'+idRegistro+'').attr('style', 'display: block;');
	    	}
	    });
	}

