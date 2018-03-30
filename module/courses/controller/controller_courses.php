<?php
// @session_start();
// include ($_SERVER['DOCUMENT_ROOT'] . "/Proyectos/GiovannyProy4/utils/common.inc.php");
// include ($_SERVER['DOCUMENT_ROOT'] . "/Proyectos/GiovannyProy4/module/courses/utils/validaCourses.php");
// include ($_SERVER['DOCUMENT_ROOT'] . "/Proyectos/GiovannyProy4/utils/upload.php");
class controller_courses {

    function __construct() {
        // include(UTILS_PRODUCTS . "utils.inc.php");
        $_SESSION['module'] = "courses";

    }
    
    

    function getCoursesFiltrados(){
        if (isset($_GET["getCoursesFiltrados"]) && $_GET["getCoursesFiltrados"] == true) {
            if (!isset($_SESSION["filtros"])) {
                $_SESSION["filtros"]=array(
                "category"=>"",
                "lenguage"=>"",
                "level"=>"");   
            }
            $filtros=$_SESSION["filtros"];

            $path_model=$_SERVER['DOCUMENT_ROOT'] . '/Proyectos/GiovannyProy4/module/courses/model/model/';
            $evio_loadModel = loadModel($path_model, "course_model", "cursosFiltrados", $filtros);
            // echo($evio_loadModel);
            // exit;
            
            $datos=cuentaPaginas($evio_loadModel);

            

            echo json_encode($datos);
            exit;
        }
    }

    function upload(){
        if ((isset($_GET["upload"])) && ($_GET["upload"] == true)) {
            $result_avatar = upload_files();
            $_SESSION['result_avatar'] = $result_avatar;
            //echo debug($_SESSION['result_avatar']); //se mostraría en alert(response); de dropzone.js
        }
    }

    function resFiltros()()(){
        if ((isset($_GET["resFiltros"])) && ($_GET["resFiltros"] == true)) {
             $_SESSION["filtros"]=array(
                "category"=>"",
                "lenguage"=>"",
                "level"=>""); 
            exit;
        }
    }

    function autocomplete(){
        if ((isset($_GET["autocomplete"])) && ($_GET["autocomplete"] == true)) {

            $path_model=$_SERVER['DOCUMENT_ROOT'] . '/Proyectos/GiovannyProy4/module/courses/model/model/';
            $evio_loadModel = loadModel($path_model, "course_model", "autocomplete");

            echo json_encode($evio_loadModel);
            exit;
        }
    }

    function keyword(){
        if ((isset($_GET["keyword"])) && ($_GET["keyword"] == true)) {
            // echo ($_GET["key"]);
            // exit;
            $path_model=$_SERVER['DOCUMENT_ROOT'] . '/Proyectos/GiovannyProy4/module/courses/model/model/';
            $evio_loadModel = loadModel($path_model, "course_model", "keyword", $_GET["key"]);

            $datos=cuentaPaginas($evio_loadModel);        

            echo json_encode($datos);
            exit;
        }
    }

    function coursetDetails(){
        if ((isset($_GET["coursetDetails"])) && ($_GET["coursetDetails"] == true)) {
            $id=$_SESSION["idCourse"];
            $path_model=$_SERVER['DOCUMENT_ROOT'] . '/Proyectos/GiovannyProy4/module/courses/model/model/';
            $evio_loadModel = loadModel($path_model, "course_model", "courseDetails", $id);

            echo json_encode($evio_loadModel);
            exit;
        }
    }


    function courseJson(){
        if (isset($_POST['course_JSON'])) {	
            alta_courses();    
        }
    }

    function delete(){
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
    }
    //////////////////////////////////////////////////
    function cuentaPaginas($array){
        $filas=count($array);
        $pages=ceil($filas/3);
        $datos=array(
            "datos"=>$array,
            "pages"=>$pages,
            "filas"=>$filas);
        return $datos; 
    }

    function alta_courses() {
    	$jsondata = array();
        $coursesJSON = json_decode($_POST["course_JSON"], true);        
        $result = validate($coursesJSON);
        $_SESSION['curso'] = $coursesJSON;
        if (empty($_SESSION['result_avatar'])) {
            $_SESSION['result_avatar'] = array('resultado' => true, 'error' => "", 'datos' => 'media/courses/default-potho.jpg');
        }

        $result_avatar = $_SESSION['result_avatar'];
        $_SESSION['result_avatar']=array();

            // echo ("string ".$result['resultado'].$result_avatar['resultado']);	
        if (($result['resultado'])&&($result_avatar['resultado'])) {     
            $result['datos']['avatar']=$result_avatar['datos'];
            $path_model=$_SERVER['DOCUMENT_ROOT'] . '/Proyectos/GiovannyProy4/module/courses/model/model/';        
            $evio_loadModel = loadModel($path_model, "course_model", "create_course", $result['datos']);
            // echo ($result['datos']);
            //  exit;
            if ($evio_loadModel){
                $mensaje = "User has been successfull registered";
                $jsondata["success"] = true;
                $callback = "index.php?page=courses&view=courseCreado";
                $jsondata["redirect"] = $callback;
                $_SESSION['cursoDet'] = $result['datos'];
            }else{
                $jsondata["success"] = false;
                $mensaje = "Problem ocurred registering user";
            }

           // $jsondata["mensaje"] = $mensaje;
            $jsondata["datos"]=$result['datos'];
            $jsondata["mensaje"]=$mensaje;
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
    function loadData(){
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
    }
    /////////////////////////////////////////////////// 
    // if ((isset($_GET["cursoCreado"])) && ($_GET["cursoCreado"] == true)) {
    //     $curso=$_SESSION['cursoDet'];
    //     $curso['acceso']=true;
    //     echo json_encode($curso);
    //     exit;
    // }
    /////////////////////////////////////////////////// load
    function load(){    
        if (isset($_GET["load"]) && $_GET["load"] == true) {
            $curso = array();
            if (isset($_SESSION['cursoDet'])) {
                $curso=$_SESSION['cursoDet'];
                $curso['acceso']=true;
            }
            close_session();
            echo json_encode($curso);
            exit;
        }
    }

    function close_session() {
        unset($_SESSION['cursoDet']);
        $_SESSION = array(); // Destruye todas las variables de la sesión
        session_destroy(); // Destruye la sesión
    }


    /////////////////////////////////////////////////// load_category
    function obtain_category() {
        if(  (isset($_GET["load_category"])) && ($_GET["load_category"] == true)  ){
            // $jsondata = array();
            $json = array();

            $path_model=$_SERVER['DOCUMENT_ROOT'] . '/Proyectos/GiovannyProy4/module/courses/model/model/';
            
            $json = loadModel($path_model, "course_model", "obtain_category");
            // echo($json);
            // exit;
            if($json){
                $jsondata = $json;
                echo ($jsondata);
                exit;
            }else{
                $jsondata = "error";
                echo ($jsondata);
                exit;
            }
        }
    }

    /////////////////////////////////////////////////// load_subCategory
    function obtain_subCategory() {
        if(  (isset($_GET["load_subCategory"])) && ($_GET["load_subCategory"] == true)  ){
            // $jsondata = array();
            
            $json = array();

            $path_model=$_SERVER['DOCUMENT_ROOT'] . '/Proyectos/GiovannyProy4/module/courses/model/model/';
            
            $json = loadModel($path_model, "course_model", "obtain_subCategory");
            // echo($json);
            // exit;
            if($json){
                $jsondata = $json;
                echo ($jsondata);
                exit;
            }else{
                $jsondata = "error";
                echo ($jsondata);
                exit;
            }
        }
    }
}