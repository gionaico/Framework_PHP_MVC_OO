<?php
@session_start();
include ($_SERVER['DOCUMENT_ROOT'] . "/Proyectos/GiovannyProy4/module/profile/utils/validaProfile.php");

if (isset($_POST['user_JSON'])) {	
    alta_users();
}

/////////////////////////////////////////////////// 
function alta_users() {
	$jsondata = array();
    $usersJSON = json_decode($_POST["user_JSON"], true);
    $date_register=date("m.d.y");
    $result = validate($usersJSON);
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
    }