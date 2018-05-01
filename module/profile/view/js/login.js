	$(document).ready(function () {
		// Initialize Firebase
		var config = {
			apiKey: "AIzaSyCB976KXuqfCaiDjxqAkYVyWvjoxVJ6pm0",
			authDomain: "libra-learneasy.firebaseapp.com",
			databaseURL: "https://libra-learneasy.firebaseio.com",
			projectId: "libra-learneasy",
			storageBucket: "libra-learneasy.appspot.com",
			messagingSenderId: "898327279773"
		};
		firebase.initializeApp(config);
		var authService = firebase.auth();
		


		authService.onAuthStateChanged(function(user) {
			if (user) {
				logOut(authService);
				console.log('AuthStateChanged', user)
				// document.getElementById('datosuser').innerHTML = JSON.stringify(user);
				// document.getElementById('loginGoogle').style.display = 'none';
				// document.getElementById('botonlogout').style.display = 'block';
			} else {
				logTwitter(authService);
				logGoogle(authService);  
				logFacebook(authService);
				// document.getElementById('datosuser').innerHTML = 'Sin usuario logueado...'
				// document.getElementById('loginGoogle').style.display = 'block';
				// document.getElementById('botonlogout').style.display = 'none';
			}
		});


		logManual();

	    


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


	function logManual(){
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
	}

	function logFacebook(authService){
        // opcionalmente modifico el scope
        //provider.addScope('user_friends');    
        // accedo al servicio de autenticación        
    
        document.getElementById('loginfacebook').addEventListener('click', function() {
		var provider = new firebase.auth.FacebookAuthProvider();
            // autentico con Facebook
            authService.signInWithPopup(provider).then(function(result) {
                console.log(result);
                console.log('autenticado usuario ', result.user);
                console.log(result.user.displayName);
                console.log(result.user.email);
                console.log(result.user.photoURL);
                console.log(result.user.uid);

            }).catch(function(error) {
                console.log('Detectado un error:', error);
            });
        });
	}

	function logTwitter(authService){
        
      		// var authService = firebase.auth();
        document.getElementById('logintwitter').addEventListener('click', function() {
		 	var provider = new firebase.auth.TwitterAuthProvider();
		 
        	authService.signInWithPopup(provider).then(function(result) {
              //var token = result.credential.accessToken;
              //var secret = result.credential.secret;
              console.log("funciona");
              console.log(result.user);
              console.log(result.user.displayName);
              console.log(result.user.email);
              console.log(result.user.photoURL);
              console.log(result.user.uid);
          	}).catch(function(error) {
          	console.log('Se ha encontrado un error:', error);
            //var errorCode = error.code;
            //var errorMessage = error.message;
            //var email = error.email;
            //var credential = error.credential;
          	});
      });
	}

	function ArrayRedesSociales(datos){
		var datos={
					"name": datos.user.displayName,
					"email": datos.user.email,
					"user": datos.user.uid,
					"avatar": datos.user.photoURL
					};
		return datos;
	}

	function peticiones(datosAenviar, ruta){
		$.ajax({
            type: "POST",
            url: ""+ruta+"",
            data: datosAenviar,
            success: function(datos) {
                console.log(datos);
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
            

        });/*end fail*/


	}

	function logGoogle(authService){

    
        // var authService = firebase.auth();
        // manejador de eventos para loguearse
        document.getElementById('loginGoogle').addEventListener('click', function() {
		 var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('email');
          authService.signInWithPopup(provider)
                .then(function(result) {
                    console.log('Hemos autenticado al usuario ', result.user);

                    var datos=ArrayRedesSociales(result);
                    datos.tipo_registro="f"
                    console.log(datos.user);
                    console.log(datos.email);
                    peticiones(datos, "../../profile/logSocial");
                    /*console.log(result.user.displayName);
                    console.log(result.user.email);
                    console.log(result.user.photoURL);
                    console.log(result.user.uid);*/
                })
                .catch(function(error) {
                    console.log('Se ha encontrado un error:', error);
                });
        });

        // manejador de eventos para los cambios del estado de autenticación https://prueba-firebase-b4e33.firebaseapp.com/__/auth/handler
       
	}

	function logOut(authService){
		//manejador de eventos para cerrar sesión (logout)
        document.getElementById('botonlogout').addEventListener('click', function() {
          authService.signOut() 
        });
	}

