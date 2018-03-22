<?php
@session_start();
include ($_SERVER['DOCUMENT_ROOT'] . "/Proyectos/GiovannyProy4/utils/common.inc.php");

	if (isset($_GET["getCourses"]) && $_GET["getCourses"] == true) {
		$path_model=$_SERVER['DOCUMENT_ROOT'] . '/Proyectos/GiovannyProy4/module/homepage/model/model/';        
        $evio_loadModel = loadModel($path_model, "homepage_model", "mejoresCursos");
        
                   
       
	    echo json_encode($evio_loadModel);
	    exit;
	}
?>