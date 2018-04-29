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
		

		creaModal();

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
	});
	
	function logFacebook(authService){
        // opcionalmente modifico el scope
        //provider.addScope('user_friends');    
        // accedo al servicio de autenticación        
    
        document.getElementById('loginfacebook').addEventListener('click', function() {
		var provider = new firebase.auth.FacebookAuthProvider();
            // autentico con Facebook
            authService.signInWithPopup(provider)
                .then(function(result) {
                    console.log(result);
                    console.log('autenticado usuario ', result.user);
                    console.log(result.user.displayName);
                    console.log(result.user.email);
                    console.log(result.user.photoURL);
                })
                .catch(function(error) {
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

	function logGoogle(authService){

    
        // var authService = firebase.auth();
        // manejador de eventos para loguearse
        document.getElementById('loginGoogle').addEventListener('click', function() {
		 var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('email');
          authService.signInWithPopup(provider)
                .then(function(result) {
                    console.log('Hemos autenticado al usuario ', result.user);
                    console.log(result.user.displayName);
                    console.log(result.user.email);
                    console.log(result.user.photoURL);
                    console.log(result.user.uid);
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

/*CREA TODA LA ESTRUCTURA DEL MODAL*/
	function creaModal(){
		var modal='<div class="modal fade"  id="modal_login" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2" hidden>'+
					    '<div class="modal-dialog" id="mdialTamanio" role="document">'+
					        '<div class="modal-content">'+

					            '<div class="modal-header">'+
					                
					                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
					                        '<span aria-hidden="true">&times;</span>'+
					                    '</button>'+
					                
					                '<br>'+

					                '<div class=" row modal-title" id="myModalLabel2">'+
					                  '<div class="col-md-6" >'+
					                  		'<a class="opcionesLog" href="#" id="titleLogin">'+
					                    		'<center><h4 style="border-bottom: 1px solid #000000;padding-bottom: 3px;">Log in</h4></center>'+
					                  		'</a>'+
					                  '</div>'+

					                  '<div class=" col-md-6" >'+
					                  		'<a class="opcionesLog" href="#" id="titleReg">'+
					                    		'<center><h4>Sing up</h4></center>'+
					                    	'</a>'+
					                  '</div>'+
					                '</div>'+
					            '</div>'+


					            '<div class="modal-body" id="container">'+
					                '<div class="form-group infoInLogin" id="info_logPro" style="display: none;">'+
					                    '<p class="text-center">Before to intro your product, please you have to make login. If you are not registered, please register bofore to make login.</p>'+
					                '</div>'+

					                '<div class="form-group infoInLogin" id="info_pay" style="display: none;">'+
					                    '<p class="text-center">Before to pay your product, please you have to make login. If you are not registered, please register bofore to make login.</p>'+
					                '</div>'+
					                

					                '<div class="row">'+
					                    '<div class="col-md-6">'+
					                        '<div id="hacerLogin">'+

					                        	'<form id="loginForm">'+	
							                            '<div class="form-group">'+
							                                '<input id="user_log" name="user_log" type="text" placeholder="your user name" value="" class="form-control input-md color_input inputKeyup" required="required" value="">'+
							                                '<span id="sp_user_log" ></span>'+
							                            '</div>'+

							                            '<div class="form-group ">'+
							                                '<input id="password_log" name="password_log" type="password" class="form-control input-md color_input inputKeyup" placeholder="your password" required=""  value="">'+
							                                '<span id="sp_password_log" ></span>'+
							                            '</div>'+
							                            
							                            '<div class="form-group ">'+
							                                '<a type="button" class="col-md-12 btn btn-success 378" id="btn-login">LOGIN</a>'+
							                                '<br><br><br>'+
							                                '<a href="#" title="">Dont remember your password?</a>'+
							                            '</div>'+
							                    '</form>'+

					                        '</div>'+

					                        '<div id="hacerRegistro" style="display: none;">'+
					                        	'<form id="registerForm">'+
							                          '<div class="form-group">'+
							                                '<input id="user_register" name="user_register" type="text" placeholder="your user name" value="" class="form-control input-md color_input inputKeyup" required="required" value="">'+
							                                '<span id="sp_user_register" ></span>'+
							                            '</div>'+

							                            '<div class="form-group">'+
							                                '<input id="email_register" name="email_register" type="email" placeholder="your_email@example.com" value="" class="form-control input-md color_input inputKeyup" required="required" value="">'+
							                                '<span id="sp_email_register" ></span>'+
							                            '</div>'+

							                            '<div class="form-group ">'+
							                                '<input id="password_register" name="password_register" type="password" class="form-control input-md color_input inputKeyup" placeholder="your password" required=""  value="">'+
							                            	'<span id="sp_password_register" ></span>'+
							                            '</div>'+
							                            
							                            '<div class="form-group ">       '+
							                                '<a href="#" type="button" class="col-md-12 btn btn-warning" id="btn-singUp" title="">SING UP</a>'+
							                            '</div>'+
							                    '</form>'+

					                        '</div>'+

					                      
					                    
					                    '</div>'+
					                    '<div class="col-md-6">'+
					                        
					                        '<a class="btn btn-block btn-social btn-twitter" id="logintwitter">'+
					                          '<span class="fa fa-twitter"></span> Sign in with Twitter'+
					                        '</a>'+

					                        '<a class="btn btn-block btn-social btn-facebook" id="loginfacebook">'+
					                          '<span class="fa fa-facebook"></span> Sign in with facebook'+
					                        '</a>'+

					                        '<a class="btn btn-block btn-social btn-google" id="loginGoogle">'+
					                          '<span class="fa fa-google"></span> Sign in with google'+
					                        '</a>'+
					                    '</div>'+

					                '</div>'+

					               
					            '</div>'+

					             '<div class="modal-footer">'+
					                '<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>'+
					                
					            '</div>'+
					        '</div>'+
					    '</div>'+
					'</div>';

	    $("#LoginModal").append(modal);
	    form_LogRegi();
	}

	