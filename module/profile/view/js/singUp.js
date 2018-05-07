	$(document).ready(function () {

		$("#btn-singUp").click(function(event) {
			$("#sp_user_register").html("<span></span>");
			$("#sp_email_register").html("<span></span>");
			$("#sp_password_register").html("<span></span>");


			if (validador_reg()) {
				var dataString = $("#registerForm").serialize();

				$.ajax({
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

                    if (xhr.responseJSON == undefined || xhr.responseJSON === null ){
		                  xhr.responseJSON = JSON.parse(xhr.responseText);                
		            }
		            
		            if (xhr.responseJSON.error.user){
		                $("#sp_user_register").html("<span style='color:red;'>" + xhr.responseJSON.error.user +"</span>");
		            }
		            
		            if (xhr.responseJSON.error.email){
		                $("#sp_email_register").html("<span style='color:red;'>" + xhr.responseJSON.error.email +"</span>");
		            }

		            if (xhr.responseJSON.error.password){
		                $("#sp_password_register").html("<span style='color:red;'>" + xhr.responseJSON.error.password +"</span>");
		            }

                });
			}

		});

		$(".inputKeyup").keyup(function() {
	        var id = this.getAttribute('id');
	        $("#"+id+"").attr("style", "");
	        $("#"+id+"").siblings(".error_js").remove();
	    });


	});

	function validador_reg(){
		var user_register = document.getElementById("user_register").value;
		var email_register = document.getElementById("email_register").value;
		var password_register = document.getElementById("password_register").value;

		/*if (user_register == null || user_register.length == 0|| !user_namePattern.test(user_register)) {
	        controlForm("user_register");
	        return false;
	    }
		if (email_register == null || email_register.length == 0 || !emailPattern.test(email_register)) {
	        controlForm("email_register");
	        return false;
	    }    
        if (password_register == null || password_register.length == 0|| !passwordPattern.test(password_register)) {
        	controlForm("password_register");            
            $("#password_register").after("<span class='error_js' style='color:#BA1C2E;'>Incorrect format</span>");

            return false;
        } */   

		return true;
	}
