	$(document).ready(function () {

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

		verificaUserActivo(authService);


		// var userLocalStorage = {"user": localStorage.getItem("user")};					

		// Initialize Firebase

		/*authService.onAuthStateChanged(function(user) {
			if (user) {
				logOut(authService);
				cambiaMenu(logueado=true);
				// console.log('AuthStateChanged', user);
				// document.getElementById('datosuser').innerHTML = JSON.stringify(user);
				// document.getElementById('loginGoogle').style.display = 'none';
				// document.getElementById('botonlogout').style.display = 'block';
			} else {
				cambiaMenu(logueado=false);
				logTwitter(authService);
				logGoogle(authService);  
				logFacebook(authService);
				logManual();

				// document.getElementById('datosuser').innerHTML = 'Sin usuario logueado...'
				// document.getElementById('loginGoogle').style.display = 'block';
				// document.getElementById('botonlogout').style.display = 'none';
			}
		});*/

	});/*end document ready*/






/*----------FUNCIONES---------------------*/

	function verificaUserActivo(authService){
		if ((localStorage.getItem("user")==null) || (localStorage.getItem("user")=="")|| (localStorage.getItem("user")=="undefined")) {
			console.log("localStorage no encontrado");
			cambiaMenu(logueado=false);
			logTwitter(authService);
			logGoogle(authService);  
			logFacebook(authService);
			logManual();
		}else{
			logOut(authService);
			cambiaMenu(logueado=true);

			var user = {"user": localStorage.getItem("user")};
			cambiaMenu(logueado=true);
			$.ajax({
	            type: "POST",
	            url: "../../profile/getdatos",
	            data: user,
	            success: function(datos) {
	                var a=JSON.parse(datos);
	                /*console.log(a);*/
	                if (a.success) {	                	
		                var b=JSON.parse(a.datos);
		                /*console.log(b);*/
		                $("#avatar_menu").attr("src", ""+b[0].avatar+"");
		                $("#userName").html(""+b[0].user_name+"");

						if (b[0].name=="") {
							$("#userName").html(""+b[0].user_name+"");
						}else{
							$("#userName").html("&nbsp&nbsp&nbsp"+b[0].name+"");
						}
	                }else{
	                	logOutAutom(authService);
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
	}


	function cambiaMenu(logueado){
		var log=logueado;
		if (log) {
			console.log("log");
			var li_logOut= document.getElementById('li-logOut');
				li_logOut.style.display="";
			var li_logIn=document.getElementById('li-logIn');
				li_logIn.style.display="none";
			var li_profile=document.getElementById('li-profile');
				li_profile.style.display="";
		}else{
			console.log("no");
			var li_logOut= document.getElementById('li-logOut');
				li_logOut.style.display="none";
			var li_logIn=document.getElementById('li-logIn');
				li_logIn.style.display="";
			var li_profile=document.getElementById('li-profile');
				li_profile.style.display="none";
		}
	}


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
                    	console.log(datos);
                    	/*console.log(Base64.decode(datos));*/
                    	

                        var arrDatos=JSON.parse(datos);
                        localStorage.setItem("user", arrDatos.datos);
                        console.log(arrDatos);
                        if (arrDatos.success) {
                        	console.log("entra");
                        	var arr=["loginForm", "registerForm"];
                        	limpiaForm(arr);
                        	$("#modal_login").modal("hide");
	                        var toasts = new Toast('LIGIN', 'success', 'toast-top-full-width', arrDatos.mensaje, 10000);
	    					delayToasts(toasts,0);
	    					localStorage.setItem("user", arrDatos.token);
	    					setTimeout(redireccionActual, 10000);
                        }                                                
                    }
                }).fail(function(xhr, jqXHR, textStatus, errorThrown) {
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
		            if (xhr.responseJSON.error.user){
		                $("#sp_user_log").html("<span style='color:red;'>" + xhr.responseJSON.error.user +"</span>");
		            }

                });/*end fail*/

			}/*end if*/
		});/*end evento click*/
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
					localStorage.setItem("user", arrDatos.token);
					cambiaMenu(logueado=true);
					setTimeout(redireccionActual, 10000);
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

	function logFacebook(authService){
    
        document.getElementById('loginfacebook').addEventListener('click', function() {
		var provider = new firebase.auth.FacebookAuthProvider();
            // autentico con Facebook
            authService.signInWithPopup(provider).then(function(result) {
                var datos=ArrayRedesSociales(result);
				datos.tipo_registro="f";
				peticiones(datos, "../../profile/logSocial");

            }).catch(function(error) {
                console.log('Detectado un error:', error);
            });
        });
	}


	function logTwitter(authService){
        
        document.getElementById('logintwitter').addEventListener('click', function() {
		 	var provider = new firebase.auth.TwitterAuthProvider();
		 
        	authService.signInWithPopup(provider).then(function(result) {              
            	var datos=ArrayRedesSociales(result);
				datos.tipo_registro="t";
				peticiones(datos, "../../profile/logSocial");
              
              /*console.log(result.user);
              console.log(result.credential.accessToken);
              console.log(result.credential.secret);
              console.log(result.user.displayName);
              console.log(result.user.email);
              console.log(result.user.photoURL);
              console.log(result.user.uid);*/
          	}).catch(function(error) {
          		console.log('Se ha encontrado un error:', error);
	            /*var errorCode = error.code;
	            var errorMessage = error.message;
	            var email = error.email;
	            var credential = error.credential;*/
          	});
      	});
	}


	function logGoogle(authService){    
        // var authService = firebase.auth();
        // manejador de eventos para loguearse
        document.getElementById('loginGoogle').addEventListener('click', function() {
			var provider = new firebase.auth.GoogleAuthProvider();
        	provider.addScope('email');

        	authService.signInWithPopup(provider).then(function(result) {
        		console.log(result.credential.accessToken);
                var datos=ArrayRedesSociales(result);
                datos.tipo_registro="g";
                peticiones(datos, "../../profile/logSocial");

            }).catch(function(error) {
                console.log('Se ha encontrado un error:', error);
            });
        });
        // manejador de eventos para los cambios del estado de autenticación https://prueba-firebase-b4e33.firebaseapp.com/__/auth/handler       
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


	function logOut(authService){
		//manejador de eventos para cerrar sesión (logout)
		document.getElementById('botonlogout').addEventListener('click', function() {
			authService.signOut();
			localStorage.removeItem("user");
			window.location.href="http://localhost/Proyectos/GiovannyProy4";
		});
	}

	function logOutAutom(authService){
		authService.signOut();
		localStorage.removeItem("user");
		window.location.href="http://localhost/Proyectos/GiovannyProy4";
	}

