<?php
@session_start();
// include ($_SERVER['DOCUMENT_ROOT'] . "/Proyectos/GiovannyProy4/utils/common.inc.php");
// include ($_SERVER['DOCUMENT_ROOT'] . "/Proyectos/GiovannyProy4/module/profile/utils/validaProfile.php");


class controller_profile {
    
    function __construct() {        
        include(UTILS_PROFILE . "validaProfile.php");         
        $_SESSION['module'] = "profile";
    }

    function form() {
        loadView( "module/profile/view/", "profile.html"); 
    }

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
                $json_data["mensaje"] = "Felicidades ".$_POST['user_register']." te has registrado correctamente";
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
   function loginManual(){
        $datos_user=array(
                "user"=>$_POST['user_log'],
                "password"=>$_POST['password_log']
            );  
        $resultado=valida_usuarioLog($datos_user);
        if ($resultado["resultado"]) {
            $json_data["success"]= true;
            $json_data["mensaje"] = "Bienvenido ".$_POST['user_log']." , has iniciado sesion exitosamente";
            // setcookie("cookie2",json_encode($datos_user),time()+60);
            // echo ($_COOKIE['cookie1']);
            
            $datosEditar["user"]=$_POST['user_log'];
            $datosEditar["token"]=$this->creaToken($datos_user);
            $updateToken = loadModel(MODEL_PROFILE, "profile_model", "updateToken", $datosEditar);

            $json_data["token"]=$datosEditar["token"];

            echo json_encode($json_data);
        }else{      
            $json_data["success"] = false;
            $json_data["error"] = $resultado['error'];

            header('HTTP/1.0 400 Bad error');
            echo json_encode($json_data);
        }
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
                
                echo json_encode($json_data);
            }else{      
                $json_data["success"] = false;
                $json_data["error"] = 'error';

                header('HTTP/1.0 400 Bad error');
                echo json_encode($json_data);
            }
        }else{
            $json_data["success"]= true;
            $json_data["mensaje"] = "Bienvenido ".$_POST['name']." , has iniciado sesion exitosamente";
            
            echo json_encode($json_data);
        }
        
    }


    function load_country(){
        /////////////////////////////////////////////////// load_country
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

    function load_cities(){
        if(  isset($_POST['idPoblac']) ){
            $jsondata = array();
            $json = array();

            $json =  loadModel(MODEL_PROFILE, "profile_model", "obtain_cities", $_POST['idPoblac']);

/*            $path_model=$_SERVER['DOCUMENT_ROOT'] . '/Proyectos/GiovannyProy4/module/profile/model/model/';
            $json = loadModel($path_model, "profile_model", "obtain_cities", $_POST['idPoblac']);*/

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