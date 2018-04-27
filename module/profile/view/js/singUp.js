	$(document).ready(function () {

		$("#btn-singUp").click(function(event) {

			if (validador()) {
				var dataString = $("#registerForm").serialize();

				$.ajax({
                    type: "POST",
                    url: "../../profile/register",
                    data: dataString,
                    success: function(dataString) {
                        console.log(dataString);
                        /*var arrDatos=JSON.parse(datos);
                        if (!arrDatos.exito) {
                        	console.log(entra);
                        }*/
                        
                    }
                })
                .fail(function(jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR); 
                    console.log(textStatus); 
                    console.log(errorThrown);                    
                });
			}

		});

		$(".inputKeyup").keyup(function() {
	        var id = this.getAttribute('id');
	        $("#"+id+"").attr("style", "");
	        $("#"+id+"").siblings(".error_js").remove();
	    });

	});

	function validador(){
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
