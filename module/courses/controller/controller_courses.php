<?php
@session_start();
include ($_SERVER['DOCUMENT_ROOT'] . "/Proyectos/GiovannyProy4/utils/common.inc.php");
include ($_SERVER['DOCUMENT_ROOT'] . "/Proyectos/GiovannyProy4/module/courses/utils/validaCourses.php");
include ($_SERVER['DOCUMENT_ROOT'] . "/Proyectos/GiovannyProy4/utils/upload.php");


if ((isset($_GET["upload"])) && ($_GET["upload"] == true)) {
    $result_avatar = upload_files();
    $_SESSION['result_avatar'] = $result_avatar;
    //echo debug($_SESSION['result_avatar']); //se mostraría en alert(response); de dropzone.js
}

if (isset($_POST['course_JSON'])) {	
    alta_courses();    
}

if (isset($_GET["delete"]) && $_GET["delete"] == true) {
    $_SESSION['result_avatar'] = array();
    $result = remove_file();
    if ($result === true) {
        //echo("true");
        //exit;
        echo json_encode(array("res" => true));
        exit;
    } else {
        //echo("false");
        //exit;
        echo json_encode(array("res" => false));
        exit;
    }
}
//////////////////////////////////////////////////

function alta_courses() {
	$jsondata = array();
    $coursesJSON = json_decode($_POST["course_JSON"], true);        
    $result = validate($coursesJSON);
    $_SESSION['curso'] = $coursesJSON;
    if (empty($_SESSION['result_avatar'])) {
        $_SESSION['result_avatar'] = array('resultado' => true, 'error' => "", 'datos' => 'media/products/default-potho.jpg');
    }

    $result_avatar = $_SESSION['result_avatar'];
    $_SESSION['result_avatar']=array();

    if (($result['resultado'])&&($result_avatar['resultado'])) {     
        $result['datos']['avatar']=$result_avatar['datos'];
        // $_SESSION['curso'] = $result['datos'];
    	// $path_model=$_SERVER['DOCUMENT_ROOT'] . '/Proyectos/GiovannyProy4/module/courses/model/model/';        
     //    $evio_loadModel = loadModel($path_model, "courses_model", "create_course", $result['datos']);
     //    // echo ($evio_loadModel);
     //    // 	exit;
        	
     //    if ($evio_loadModel){
     //        $mensaje = "User has been successfull registered";
     //    	$jsondata["success"] = true;
     //    }else{
     //    	$jsondata["success"] = false;
     //        $mensaje = "Problem ocurred registering user";
     //    }

        $callback = "index.php";
       // $jsondata["mensaje"] = $mensaje;
        $jsondata["redirect"] = $callback;
        $jsondata["datos"]=$result['datos'];
	    echo json_encode($jsondata);
	    exit;
    }else{    	
    	$jsondata["success"] = false;
        $jsondata["error"] = $result['error'];

        $jsondata['error_dubidaFoto'] = $result_avatar['error'];

        $jsondata['success1'] = false;

        if ($result_avatar['resultado']) {
            $jsondata['success1'] = true;
            $jsondata['prodpic'] = $result_avatar['datos'];
        }
        header('HTTP/1.0 400 Bad error');
        echo json_encode($jsondata);
    }
}
/////////////////////////////////////////////////// load_data
if ((isset($_GET["load_data"])) && ($_GET["load_data"] == true)) {
    $jsondata = array();

    if (isset($_SESSION['curso'])) {
        $jsondata["curso"] = $_SESSION['curso'];
        echo json_encode($jsondata);
        exit;
    } else {
        $jsondata["curso"] = "";
        echo json_encode($jsondata);
        exit;
    }
}
/////////////////////////////////////////////////// 

