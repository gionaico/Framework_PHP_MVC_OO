	$(document).ready(function () {

		$("#btn-login").click(function(event) {
			$("#sp_password_log").html("<span></span>");

			if (validador_Login()) {
				var dataString = $("#loginForm").serialize();
				// console.log(dataString);

				$.ajax({
                    type: "POST",
                    url: "../../profile/loginManual",
                    data: dataString,
                    success: function(datos) {
                        var arrDatos=JSON.parse(datos);
                        console.log(arrDatos);
                        if (arrDatos.success) {
                        	console.log("entra");
                        	var arr=["loginForm", "registerForm"];
                        	limpiaForm(arr);
                        	$("#modal_login").modal("hide");
	                        var toasts = new Toast('LIGIN', 'success', 'toast-top-full-width', arrDatos.mensaje, 10000);
	    					delayToasts(toasts,0);
                        }
                        
                        
                    }
                })
                .fail(function(xhr, jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR); 
                    console.log(textStatus); 
                    console.log(errorThrown);  
                    console.log(xhr);
                    if (xhr.responseJSON == undefined || xhr.responseJSON === null ){
		                  xhr.responseJSON = JSON.parse(xhr.responseText);                
		            }

		            if (xhr.responseJSON.error.password){
		                $("#sp_password_log").html("<span style='color:red;'>" + xhr.responseJSON.error.password +"</span>");
		            }

                });/*end fail*/

			}/*end if*/

		});/*end evento click*/
	    


	});/*end document ready*/


/*----------FUNCIONES---------------------*/

	function validador_Login(){
		var user_log = document.getElementById("user_log").value;
		var password_log = document.getElementById("password_log").value;

		if (user_log == null || user_log.length == 0) {
	        controlForm("user_log");
	        $("#user_log").after("<span class='error_js' style='color:#BA1C2E;'>Este campo esta vacio.</span>");
	        return false;
	    }   
	    if (password_log == null || password_log.length == 0) {
	    	controlForm("password_log");            
	        $("#password_log").after("<span class='error_js' style='color:#BA1C2E;'>Este campo esta vacio.</span>");

	        return false;
	    }    

		return true;
	}



				/*$.ajax({
                    type: "POST",
                    url: "../../profile/register",
                    data: dataString,
                    success: function(datos) {
                        var arrDatos=JSON.parse(datos);
                        console.log(arrDatos);
                        if (arrDatos.success) {
                        	console.log("entra");
                        	$("#modal_login").modal("hide");
	                        var toasts = new Toast('REGISTER', 'success', 'toast-top-full-width', arrDatos.mensaje, 50000);
	    					delayToasts(toasts,0);
                        }
                        
                    }
                })
                .fail(function(xhr, jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR); 
                    console.log(textStatus); 
                    console.log(errorThrown);  
                    console.log(xhr);  


                });*/