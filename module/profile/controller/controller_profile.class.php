<?php
@session_start();
// include ($_SERVER['DOCUMENT_ROOT'] . "/Proyectos/GiovannyProy4/utils/common.inc.php");
// include ($_SERVER['DOCUMENT_ROOT'] . "/Proyectos/GiovannyProy4/module/profile/utils/validaProfile.php");


class controller_profile {
    
    function __construct() {        
        include(UTILS_PROFILE . "validaProfile.php");         
        $_SESSION['module'] = "profile";
    }

    function register(){         
        $datos_user=array(
            "user"=>$_POST['user_register'],
            "email"=>$_POST['email_register'],
            "password"=>$_POST['password_register']
        );  

        $resultado=valida_usuario($datos_user);
        
        if ($resultado["resultado"]) {
            $insertDatos = loadModel(MODEL_PROFILE, "profile_model", "registrarUser", $datos_user);

            if ($insertDatos) {
                $json_data["success"]= true;
                $json_data["mensaje"] = "Felicidades ".$_POST['user_register']." te has registrado correctamente";
                
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

   /*     $resultado=darRespestas();

        $compruebaUsuario = loadModel(MODEL_PROFILE, "profile_model", "checkUser", $datos_user);
        
        if ($compruebaUsuario) {            
            $insertDatos = loadModel(MODEL_PROFILE, "profile_model", "registrarUser", $datos_user);
            if ($insertDatos) {
                $resultado["mensaje"]="ERROR. Intentelo de nuevo mas tarde";
                $resultado["exito"]=true;
            }else{
                $resultado["mensaje"]="ERROR. Intentelo de nuevo mas tarde";
            }
        }else{
            $resultado["mensaje"]="Este nombre de usuario ya existe.";
        }
    }

        echo (json_encode($resultado));
        
        exit;*/

    }
}


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


/////////////////////////////////////////////////// load_country
	if(  (isset($_GET["load_country"])) && ($_GET["load_country"] == true)  ){
        $json = array();

        $url = 'http://www.oorsprong.org/websamples.countryinfo/CountryInfoService.wso/ListOfCountryNamesByName/JSON';
        $path_model=$_SERVER['DOCUMENT_ROOT'] . '/Proyectos/GiovannyProy4/module/profile/model/model/';
        
        $json = loadModel($path_model, "profile_model", "obtain_countries", $url);
        echo $json;
            exit;
        if($json){
            echo $json;
            exit;
        }else{
            $json = "error";
            echo $json;
            exit;
        }
    }

/////////////////////////////////////////////////// load_provinces
if(  (isset($_GET["load_provinces"])) && ($_GET["load_provinces"] == true)  ){
        $jsondata = array();
        $json = array();

        $path_model=$_SERVER['DOCUMENT_ROOT'] . '/Proyectos/GiovannyProy4/module/profile/model/model/';
        $json = loadModel($path_model, "profile_model", "obtain_provinces");

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

/////////////////////////////////////////////////// load_cities
if(  isset($_POST['idPoblac']) ){
        $jsondata = array();
        $json = array();

        $path_model=$_SERVER['DOCUMENT_ROOT'] . '/Proyectos/GiovannyProy4/module/profile/model/model/';
        $json = loadModel($path_model, "profile_model", "obtain_cities", $_POST['idPoblac']);

        if($json){
            $jsondata["cities"] = $json;
            echo json_encode($jsondata);
            exit;
        }else{
            $jsondata["cities"] = "error";
            echo json_encode($jsondata);
            exit;
        }
    }*/