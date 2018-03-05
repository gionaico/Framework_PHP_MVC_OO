<?php 
	ob_start();
	session_start();
    require_once("view/inc/header.html"); 
	
	// require_once("module/login/view/login.php");
	
	if (!isset($_GET['page'])) {		
	
		require_once("module/homepage/view/homepage.html");
	
	}else  if  ((isset($_GET['page']))&&(!isset($_GET['view'])))   { 

        require_once("module/".$_GET['page']."/controller/controller_".$_GET['page'].".html");        
	
	}else if ((isset($_GET['page']))&&(isset($_GET['view']))) {
		
		require_once("module/".$_GET['page']."/view"."/".$_GET['view'].".html");
	
	}

	require_once("view/inc/footer.html");
	 ob_end_flush();
