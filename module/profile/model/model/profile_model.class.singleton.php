<?php
//echo json_encode("products model class");
//exit;
// $path = $_SERVER['DOCUMENT_ROOT'] . '/Proyectos/GiovannyProy4/';
// define('SITE_ROOT', $path);
// require($_SERVER['DOCUMENT_ROOT'] . "/Proyectos/GiovannyProy4/module/profile/model/BLL/profile_bll.class.singleton.php");

class profile_model {
    private $bll;
    static $_instance;

    private function __construct() {
        $this->bll = profile_bll::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)){
            self::$_instance = new self();
            // echo "xxxxxxxxxx";
        }
        return self::$_instance;
    }

    public function create_user($arrArgument) {
        return $this->bll->create_user_BLL($arrArgument);
    }

    public function checkUser($arrArgument) {
        return $this->bll->checkUser_BLL($arrArgument);
    }
    
    public function checkUserEmail($arrArgument) {
        return $this->bll->checkUserEmail_BLL($arrArgument);
    }

    public function obtain_countries($url){
        return $this->bll->obtain_countries_BLL($url);
    }

    public function obtain_provinces(){
        return $this->bll->obtain_provinces_BLL();
    }

    public Function obtain_cities($arrArgument){
        return $this->bll->obtain_cities_BLL($arrArgument);
    }

    public Function registrarUser($arrArgument){           
        return $this->bll->registrarUser_BLL($arrArgument);
    }

}
