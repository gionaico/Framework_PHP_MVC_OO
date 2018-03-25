<?php
@session_start();
include ($_SERVER['DOCUMENT_ROOT'] . "/Proyectos/GiovannyProy4/utils/common.inc.php");

	if (isset($_GET["getCourses"]) && $_GET["getCourses"] == true) {
		$path_model=$_SERVER['DOCUMENT_ROOT'] . '/Proyectos/GiovannyProy4/module/homepage/model/model/';        
        $evio_loadModel = loadModel($path_model, "homepage_model", "mejoresCursos");
	    echo json_encode($evio_loadModel);
	    exit;
	}

	if (isset($_GET["idCourse"]) && $_GET["idCourse"] == true) {
		$id=$_GET["idCourse2"];
		$_SESSION["idCourse"]=$id;
		$res="index.php?page=courses&view=courseDetails";
		echo($res);
	    exit;
	}

	if (isset($_GET["filtros"]) && $_GET["filtros"] == true) {
		$category=$_GET["category"];
		$filtros=array(
			"category"=>$category,
			"lenguage"=>"",
			"level"=>"");
		$_SESSION["filtros"]=$filtros;
		$res="index.php?page=courses&view=courses";
		echo($res);
	    exit;
	}

	if ((isset($_GET["getCategorias"])) && ($_GET["getCategorias"] == true)) {  
		$json = array();

        $path_model=$_SERVER['DOCUMENT_ROOT'] . '/Proyectos/GiovannyProy4/module/homepage/model/model/';
        
        $json = loadModel($path_model, "homepage_model", "obtain_category");  
    	echo ($json);
    	exit;
	}
?>