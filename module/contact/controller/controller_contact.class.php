
<?php   
    class controller_contact { 
        
        public function __construct() {
            $_SESSION['module'] = "contact";
        }

        public function view_contact() {            
            loadView( "module/contact/view/", "contact.html"); 
        }
        
        public function process_contact() {
            if($_POST['token'] === "contact_form"){
                //////////////// Envio del correo al usuario
                $arrArgument = array(
									'type' => 'contact',
									'token' => '',
									'user' => $_POST['inputName'],
									'email' => $_POST['inputEmail'],
									'inputSubject' => $_POST['inputSubject'],
									'inputMessage' => $_POST['inputMessage']
								);
                
				set_error_handler('ErrorHandler');
				try{
                //////////////// Envio del correo al admin de la web
					$this->copiaAdnin();
					sleep(3);
                    // enviar_email($arrArgument);
                    echo "<div class='alert alert-success'>".enviar_email($arrArgument)." </div>";
				} catch (Exception $e) {
					echo "<div class='alert alert-error'>Server error. Try later...</div>";
				}
				restore_error_handler();
                
                
                
				
            }else{
                echo "<div class='alert alert-error'>Server error. Try later...</div>";
            }
        }
    
        function copiaAdnin(){
        	$arrArgument = array(
								'type' => 'admin',
								'token' => '',
								'user' => $_POST['inputName'],
								'email' => $_POST['inputEmail'],
								'inputSubject' => $_POST['inputSubject'],
								'inputMessage' => $_POST['inputMessage']
							);
	        set_error_handler('ErrorHandler');
			try{	            
	            enviar_email($arrArgument);
			} catch (Exception $e) {
				echo "<div class='alert alert-error'>Server error. Try later...</div>";
			}
			restore_error_handler();
        }
    }