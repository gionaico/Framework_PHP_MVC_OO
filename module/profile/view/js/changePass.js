	$(document).ready(function () {
	


        $("#btn-changePass").click(function(event) {
        	$(".error_js").remove();
        	var password_nuevo = document.getElementById('password_nuevo').value;
	        
	        if (validadorNewPass(password_nuevo)) {
			    var ruta=window.location.href;
				var token=ruta.split("/");
				token=token[7];

				var user = {"password": password_nuevo, "token":token};

				$.ajax({
		            type: "POST",
		            url: "../../../profile/upDatePass",
		            data: user,
		            success: function(datos) {
		                console.log(datos);
		                var json=JSON.parse(datos);
		                if (json.success) {
		                	var toasts = new Toast('Change password', 'success', 'toast-top-full-width', json.mensaje, 20000);
	    					delayToasts(toasts,0);
	    					setTimeout(redireccion, 20000);
		                }
		                                                
		            }
		        })
		        .fail(function(xhr, jqXHR, textStatus, errorThrown) {
		            console.log(jqXHR); 
		            console.log(textStatus); 
		            console.log(errorThrown);  
		            console.log(xhr);            
		        });
	        }  
        });
	
	});

	

	function validadorNewPass(password_nuevo){
			
		var password_nuevo2 = document.getElementById('password_nuevo2').value;

		if (password_nuevo=="") {
			controlForm("password_nuevo");
			$("#password_nuevo").after("<span class='error_js' style='color:#BA1C2E;'>Este campo esta vacio.</span>");
			return false;
		}

		if (password_nuevo2=="") {
			controlForm("password_nuevo");
			$("#password_nuevo2").after("<span class='error_js' style='color:#BA1C2E;'>Este campo esta vacio.</span>");
			return false;
		}

		if (password_nuevo != password_nuevo2) {
			controlForm("password_nuevo");
			controlForm("password_nuevo2");
			$("#password_nuevo").after("<span class='error_js' style='color:#BA1C2E;'>Los password no son iguales.</span>");
			$("#password_nuevo2").after("<span class='error_js' style='color:#BA1C2E;'>Los password no son iguales.</span>");
			return false;
		}

		return true;
	}