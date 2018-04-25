<?php
@session_start();
class controller_homepage {
	
    function __construct() {

        $_SESSION['module'] = "homepage";
    }

    function homepage() {
        loadView( "module/homepage/view/", "homepage.html"); 
    }

    function getCourses() {

        if (isset($_POST["getCourses"]) && $_POST["getCourses"] == true) {
			        
	        $evio_loadModel = loadModel(MODEL_HOMEPAGE, "homepage_model", "mejoresCursos");
		    echo json_encode($evio_loadModel);
		    exit;
		}
    }

    function idCourse(){
    	if (isset($_POST["idCourse"]) && $_POST["idCourse"] == true) {
			$id=$_POST["idCourse2"];
			$_SESSION["idCourse"]=$id;
			$res="http://localhost/Proyectos/GiovannyProy4/courses/details/";
			echo($res);
		    exit;
		}
    }

    function filtros(){
    	if (isset($_POST["filtros"]) && $_POST["filtros"] == true) {
			$category=$_POST["category"];
			$_SESSION["filtros"]=array(
                "category"=>$category,
                "lenguage"=>"",
                "level"=>"",
                "title"=>"",
                "price"=>"",
                "subject"=>"",
                "sub_subject"=>"");
			
			$res="http://localhost/Proyectos/GiovannyProy4/courses/list_courses/";
			echo($res);
		    exit;
		}
    }

    function getCategorias(){
    	if ((isset($_POST["getCategorias"])) && ($_POST["getCategorias"] == true)) {  
			$json = array();	        
	        
	        $json = loadModel(MODEL_HOMEPAGE, "homepage_model", "obtain_category");  
	    	echo ($json);
	    	exit;
		}
    }

}

?>