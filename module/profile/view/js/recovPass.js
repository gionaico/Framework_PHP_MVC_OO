$(document).ready(function () {

	$("#btn-recovPass").click(function(event) {
		
		$("#modal_login").modal("hide");
		$("#modalrecovPass").modal("show");
	});


	$("#doneRecovPass").click(function(event) {
		$(".error_js").remove();
		var email_recovPass = document.getElementById('email_recovPass').value;
		var email = {"email": email_recovPass};
		
		if (validadorRecovPass(email_recovPass)) {
			$.ajax({
                type: "POST",
                url: "../../profile/recovPass",
                data: email,
                success: function(datos) {
                	console.log(datos);
                	var json=JSON.parse(datos);
                	$("#modalrecovPass").modal("hide");
                	var toasts = new Toast('Recover password', 'success', 'toast-top-full-width', json.mensaje, 20000);
	    			delayToasts(toasts,20000);
                	                                                
                }
            }).fail(function(xhr, jqXHR, textStatus, errorThrown) {
                console.log(jqXHR); 
                console.log(textStatus); 
                console.log(errorThrown);  
                console.log(xhr);
                
                if (xhr.responseJSON == undefined || xhr.responseJSON === null ){
	                  xhr.responseJSON = JSON.parse(xhr.responseText);                
	            }

            });/*end fail*/
		}
	});

	$("#email_recovPass2").on('paste', function(e){
	    e.preventDefault();
	    alert('Esta acción no esta permitida');
	});

});/*end document ready*/

function validadorRecovPass(email_recovPass){
	// var email_recovPass = document.getElementById('email_recovPass').value;
	var email_recovPass2 = document.getElementById('email_recovPass2').value;
	console.log(email_recovPass);
	console.log(email_recovPass2);

	if (email_recovPass=="") {
		controlForm("email_recovPass");
		$("#email_recovPass").after("<span class='error_js' style='color:#BA1C2E;'>Este campo esta vacio.</span>");
		return false;
	}

	if (email_recovPass2=="") {
		controlForm("email_recovPass");
		$("#email_recovPass2").after("<span class='error_js' style='color:#BA1C2E;'>Este campo esta vacio.</span>");
		return false;
	}

	if (email_recovPass != email_recovPass2) {
		controlForm("email_recovPass");
		controlForm("email_recovPass2");
		$("#email_recovPass").after("<span class='error_js' style='color:#BA1C2E;'>Los emails no son iguales.</span>");
		$("#email_recovPass2").after("<span class='error_js' style='color:#BA1C2E;'>Los emails no son iguales.</span>");
		return false;
	}

	return true;
}



				