<?php
@session_start();


class controller_profile {
    
    function __construct() {        
        include(UTILS_PROFILE . "validaProfile.php");         
        $_SESSION['module'] = "profile";
    }

    /*-------------------------------------------*/
    function form() {
        loadView( "module/profile/view/", "profile.html"); 
    }


    function changePass(){         
         loadView( "module/profile/view/", "changePass.html");        
    }

    function upDatePass(){         
         $datos_user["pass"]=  $_POST['password'];
         $datos_user["token"]=  $_POST['token'];

         $updatePass = loadModel(MODEL_PROFILE, "profile_model", "updatePass", $datos_user);
         if ($updatePass) {          
            $json_data["success"]= true;
            $json_data["mensaje"] = "Passwor cambiado exitosamente. Inicia sesion con tu nuevo password";
        }else{
            $json_data["success"]= false;
            $json_data["mensaje"] = "Fallo en cambio de password. Intentalo mas tarde.";
        }

        echo json_encode($json_data);

    }
    /*-------------------------------------------*/
    function recovPass(){
        $datos_user["email"] = $_POST['email'];
        $checkUserEmail = loadModel(MODEL_PROFILE, "profile_model", "checkUserEmail", $datos_user);
        $datos_user["user"] = $checkUserEmail[0]["user_name"];

        

        if (count($checkUserEmail)==1) {   
            $datos_user["token"] = md5(uniqid(rand(), true));
            $updateToken = loadModel(MODEL_PROFILE, "profile_model", "updateToken", $datos_user);

            sendtoken($datos_user, "recoverPass");

            $json_data["success"]= true;
            $json_data["mensaje"] = "Revisa tu email para recuperar password";
        }else{
            $json_data["success"]= false;
            $json_data["mensaje"] = "Este email no existe en DB";
        }

        echo json_encode($json_data);
        exit;
    }

    function upDateDatosPer(){
        $dat=$this->getArrayDatos($_POST['user']);
        $user=json_decode($dat["datos"], true);        

        if ($dat["success"]) {
            $datos_user["user"]=$user[0]["user_name"];
            $usuario = loadModel(MODEL_PROFILE, "profile_model", "checkUser", $datos_user);  
            $datos["success"]=true; 
            $datos["datos"]=$usuario;
            echo json_encode($datos);
        }else{
            echo json_encode($dat);
        }
    }

    /*-------------------------------------------*/
    function register(){         
        $datos_user=array(
            "user"=>$_POST['user_register'],
            "email"=>$_POST['email_register'],
            "password"=>$_POST['password_register']
        );  
        $datos_user["token"] = md5(uniqid(rand(), true));
        $datos_user["avatar"] = "https://robohash.org/".$_POST['user_register'];

        $resultado=valida_usuario($datos_user);
        
        if ($resultado["resultado"]) {
            $insertDatos = loadModel(MODEL_PROFILE, "profile_model", "registrarUser", $datos_user);

            if ($insertDatos) {
                $json_data["success"]= true;
                $json_data["mensaje"] = "Felicidades ".$_POST['user_register']." te has registrado correctamente. Recibiras un email para activar tu cuenta.";
                sendtoken($datos_user, "alta");
                echo json_encode($json_data);
                exit;
            }else{
                $json_data["success"] = false;
                $resultado['error']['insersionDatos']="ERROR. Insersion de datos fallida";
                $json_data["error"] = $resultado['error']['insersionDatos'];

                header('HTTP/1.0 400 Bad error');
                echo json_encode($json_data);
            }
        }else{      
            $json_data["success"] = false;
            $json_data["error"] = $resultado['error'];

            header('HTTP/1.0 400 Bad error');
            echo json_encode($json_data);
        }
    }

    /*-------------------------------------------*/
    function activar(){
         $datos_user = array(
                'token' => $_GET['param'],
                'activado' => "y"
            );
        $activarUser = loadModel(MODEL_PROFILE, "profile_model", "activarUser", $datos_user);

        if ($activarUser) {
            header("Location: http://localhost/Proyectos/GiovannyProy4/homepage/homepage/");     
        }
    }


    /*-------------------------------------------*/
   function loginManual(){
        $datos_user=array(
                "user"=>$_POST['user_log'],
                "password"=>$_POST['password_log']
            );  
        $resultado=valida_usuarioLog($datos_user);
        if ($resultado["resultado"]) {
            $json_data["success"]= true;
            $json_data["mensaje"] = "Bienvenido ".$_POST['user_log']." , has iniciado sesion exitosamente";

            $json_data["token"] = $this->ActualizarToken($datos_user);

            echo json_encode($json_data);
        }else{      
            $json_data["success"] = false;
            $json_data["error"] = $resultado['error'];

            header('HTTP/1.0 400 Bad error');
            echo json_encode($json_data);
        }
    }

    /*-------------------------------------------*/

    public function ActualizarToken($datos_user){
        $DatosBasicosUser=loadModel(MODEL_PROFILE, "profile_model", "DatosBasicosUser", $datos_user);
            
        $datosEditar["user"]=$datos_user["user"];
        $datosEditar["token"]=$this->creaToken($DatosBasicosUser);
        $updateToken = loadModel(MODEL_PROFILE, "profile_model", "updateToken", $datosEditar);
            
        return $datosEditar["token"];
    }

    /*-------------------------------------------*/

    public function creaToken($datos_user){
        $token = md5(uniqid(rand(), true));
        $datos =base64_encode (json_encode($datos_user));
        $clave =base64_encode ($token);
        
        $token_datos=$token.".".$datos.".".$clave;
        
        return $token_datos;
    }

    /*-------------------------------------------*/
    function getdatos(){
        // echo ($_POST['user']);
        $array = explode(".", $_POST['user']);
        $datos["success"]=false;

        $tokenComparar=$array[0];
        $tokenComparar2=$array[2];
        if ($tokenComparar==base64_decode($tokenComparar2)) {
            $datos["success"]=true;
            $datos["datos"] =base64_decode($array[1]);
        }elseif(count($array)!=3){
            $datos["mensaje"]="Problema de seguridad. Logueate nuevamente";

        }else{            
            $datos["mensaje"]="ERROR. Autentificacion de datos";
        }

        echo json_encode($datos);
    }

    public function getArrayDatos($informacionToken){
        
        $array = explode(".", $informacionToken);
        $datos["success"]=false;

        $tokenComparar=$array[0];
        $tokenComparar2=$array[2];
        if ($tokenComparar==base64_decode($tokenComparar2)) {
            $datos["success"]=true;
            $datos["datos"] =base64_decode($array[1]);
        }elseif(count($array)!=3){
            $datos["mensaje"]="Problema de seguridad. Logueate nuevamente";

        }else{            
            $datos["mensaje"]="ERROR. Autentificacion de datos";
        }

        return $datos;
    }

    /*-------------------------------------------*/
    function logSocial(){
        $datos_user=array(
            "user"=>$_POST['user'],
            "email"=>$_POST['email'],
            "name"=>$_POST['name'],
            "avatar"=>$_POST['avatar'],
            "tipo_registro"=>$_POST['tipo_registro']
        ); 

        $usuario = loadModel(MODEL_PROFILE, "profile_model", "checkUser", $datos_user);
            // echo ($usuario);exit;
        if (count($usuario)<1) {
            $insertDatos = loadModel(MODEL_PROFILE, "profile_model", "registrarUserSocial", $datos_user);
            if ($insertDatos) {
                $json_data["success"]= true;
                $json_data["mensaje"] = "Bienvenido ".$_POST['name']." , has iniciado sesion exitosamente";

                $json_data["token"] = $this->ActualizarToken($datos_user);
                
                echo json_encode($json_data);
            }else{      
                $json_data["success"] = false;
                $json_data["error"] = 'error';

                header('HTTP/1.0 400 Bad error');
                echo json_encode($json_data);
            }
        }else{
            $json_data["token"] = $this->ActualizarToken($datos_user);
            $json_data["success"]= true;
            $json_data["mensaje"] = "Bienvenido ".$_POST['name']." , has iniciado sesion exitosamente";
            
            echo json_encode($json_data);
        }
        
    }

    /*-------------------------------------------*/
    function load_country(){
            $json = array();

            $url = 'http://www.oorsprong.org/websamples.countryinfo/CountryInfoService.wso/ListOfCountryNamesByName/JSON';

                        
            $json =  loadModel(MODEL_PROFILE, "profile_model", "obtain_countries", $url);
            // echo $json;
            //     exit;
            if($json){
                echo $json;
                exit;
            }else{
                $json = "error";
                echo $json;
                exit;
            }
    }

    /*-------------------------------------------*/
    function load_provinces(){        
        $jsondata = array();
        $json = array();
        
        $json =  loadModel(MODEL_PROFILE, "profile_model", "obtain_provinces");

        if($json){
            $jsondata["provinces"] = $json;
            echo json_encode($jsondata);
            exit;
        }else{
            $jsondata["provinces"] = "error";
            echo json_encode($jsondata);
            exit;
        }
    }

    /*-------------------------------------------*/
    function load_cities(){
        if(  isset($_POST['idPoblac']) ){
            $jsondata = array();
            $json = array();

            $json =  loadModel(MODEL_PROFILE, "profile_model", "obtain_cities", $_POST['idPoblac']);

            if($json){
                $jsondata["cities"] = $json;
                echo json_encode($jsondata);
                exit;
            }else{
                $jsondata["cities"] = "error";
                echo json_encode($jsondata);
                exit;
            }   
        }
    }


   
}/*end clase profile*/






































/*
if (isset($_POST['user_JSON'])) {	
    alta_users();
}

/////////////////////////////////////////////////// 
function alta_users() {
	$jsondata = array();
    $usersJSON = json_decode($_POST["user_JSON"], true);
    $result = validate($usersJSON);

    if ($result['resultado']) {    	
    	$path_model=$_SERVER['DOCUMENT_ROOT'] . '/Proyectos/GiovannyProy4/module/profile/model/model/';        
        $evio_loadModel = loadModel($path_model, "profile_model", "create_user", $result['datos']);
        // echo ($evio_loadModel);
        // 	exit;
        	
        if ($evio_loadModel){
            $mensaje = "User has been successfull registered";
        	$jsondata["success"] = true;
        }else{
        	$jsondata["success"] = false;
            $mensaje = "Problem ocurred registering user";
        }

        $callback = "index.php";
        $jsondata["mensaje"] = $mensaje;
        $jsondata["redirect"] = $callback;
	    echo json_encode($jsondata);
	    exit;
    }else{    	
    	$jsondata["success"] = false;
        $jsondata["error"] = $result['error'];
        header('HTTP/1.0 400 Bad error');
        echo json_encode($jsondata);
    }
}



    }*/