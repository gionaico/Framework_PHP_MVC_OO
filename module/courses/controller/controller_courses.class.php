<?php
@session_start();

class controller_courses {

    function __construct() {        
        include(UTILS_COURSES . "validaCourses.php");
         include(UTILS . "upload.php");
        $_SESSION['module'] = "courses";

    }
        
    function list_courses() {
        require_once(VIEW_PATH_INC . "header.html");
        require_once(VIEW_PATH_INC . "menu.html");     
        require_once(COURSES_VIEW_PATH . "courses.html");
        require_once(VIEW_PATH_INC . "footer.html");
    }

    function courseForm() {
        require_once(VIEW_PATH_INC . "header.html");
        require_once(VIEW_PATH_INC . "menu.html");     
        require_once(COURSES_VIEW_PATH . "courseForm.html");
        require_once(VIEW_PATH_INC . "footer.html");
    }

    function details() {
        require_once(VIEW_PATH_INC . "header.html");
        require_once(VIEW_PATH_INC . "menu.html");     
        require_once(COURSES_VIEW_PATH . "courseDetails.html");
        require_once(VIEW_PATH_INC . "footer.html");
    }

    function new_course() {
        require_once(VIEW_PATH_INC . "header.html");
        require_once(VIEW_PATH_INC . "menu.html");     
        require_once(COURSES_VIEW_PATH . "courseCreado.html");
        require_once(VIEW_PATH_INC . "footer.html");
    }

    function getCoursesFiltrados(){
        if (isset($_POST["getCoursesFiltrados"]) && $_POST["getCoursesFiltrados"] == true) {
            if (!isset($_SESSION["filtros"])) {
                $_SESSION["filtros"]=array(
                "category"=>"",
                "lenguage"=>"",
                "level"=>"");   
            }
            $filtros=$_SESSION["filtros"];

            
            $evio_loadModel = loadModel(MODEL_COURSES, "courses_model", "cursosFiltrados", $filtros);
            // echo($evio_loadModel);
            // exit;
            
            $datos=$this->cuentaPaginas($evio_loadModel);

            echo json_encode($datos);
            exit;
        }
    }

    function upload(){
        // if ((isset($_POST["upload"])) && ($_POST["upload"] == true)) {
            $result_avatar = upload_files();
            $_SESSION['result_avatar'] = $result_avatar;
            //echo debug($_SESSION['result_avatar']); //se mostraría en alert(response); de dropzone.js
        // }
    }

    function resFiltros(){
        if ((isset($_POST["resFiltros"])) && ($_POST["resFiltros"] == true)) {
             $_SESSION["filtros"]=array(
                "category"=>"",
                "lenguage"=>"",
                "level"=>"",
                "title"=>"",
                "price"=>""); 
             echo"";
            exit;
        }
    }

    function autocomplete(){
        if ((isset($_POST["autocomplete"])) && ($_POST["autocomplete"] == true)) {

            
            $evio_loadModel = loadModel(MODEL_COURSES, "courses_model", "autocomplete");

            echo json_encode($evio_loadModel);
            exit;
        }
    }

    function keyword(){
        if ((isset($_POST["keyword"])) && ($_POST["keyword"] == true)) {
            // echo ($_POST["key"]);
            // exit;
            $_SESSION["filtros"]["title"]=$_POST["key"];
            
            $evio_loadModel = loadModel(MODEL_COURSES, "courses_model", "keyword", $_POST["key"]);

            $datos=$this->cuentaPaginas($evio_loadModel);        

            echo json_encode($datos);
            exit;
        }
    }

    function coursetDetails(){
        if ((isset($_POST["coursetDetails"])) && ($_POST["coursetDetails"] == true)) {
            $id=$_SESSION["idCourse"];
            
            $evio_loadModel = loadModel(MODEL_COURSES, "courses_model", "courseDetails", $id);

            echo json_encode($evio_loadModel);
            exit;
        }
    }


    function courseVal(){
        // echo "string";exit;
        if (isset($_POST['course_JSON'])) {	
            $this->alta_courses();    
        }else{echo "string";}
    }

    function delete(){
        // if (isset($_POST["delete"]) && $_POST["delete"] == true) {
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
        // }
    }
    //////////////////////////////////////////////////
    public function cuentaPaginas($array){
        $filas=count($array);
        $pages=ceil($filas/3);
        $datos=array(
            "datos"=>$array,
            "pages"=>$pages,
            "filas"=>$filas);
        return $datos; 
    }

    public function alta_courses() {
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
                    
            $evio_loadModel = loadModel(MODEL_COURSES, "courses_model", "create_course", $result['datos']);
            // echo ($result['datos']);
            //  exit;
            if ($evio_loadModel){
                $mensaje = "User has been successfull registered";
                $jsondata["success"] = true;
                $callback = "http://localhost/Proyectos/GiovannyProy4/courses/new_course/";
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
        if ((isset($_POST["load_data"])) && ($_POST["load_data"] == true)) {
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
    // if ((isset($_POST["cursoCreado"])) && ($_POST["cursoCreado"] == true)) {
    //     $curso=$_SESSION['cursoDet'];
    //     $curso['acceso']=true;
    //     echo json_encode($curso);
    //     exit;
    // }
    /////////////////////////////////////////////////// load
    function load(){    
        if (isset($_POST["load"]) && $_POST["load"] == true) {
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
        if(  (isset($_POST["load_category"])) && ($_POST["load_category"] == true)  ){
            // $jsondata = array();
            $json = array();

            
            
            $json = loadModel(MODEL_COURSES, "courses_model", "obtain_category");
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
        if(  (isset($_POST["load_subCategory"])) && ($_POST["load_subCategory"] == true)  ){
            // $jsondata = array();
            
            $json = array();

            
            
            $json = loadModel(MODEL_COURSES, "courses_model", "obtain_subCategory");
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
}/*end class courses*/