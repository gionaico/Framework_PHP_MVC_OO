<?php
//echo json_encode("products model class");
//exit;
// $path = $_SERVER['DOCUMENT_ROOT'] . '/Proyectos/GiovannyProy4/';
// define('SITE_ROOT', $path);
// require($_SERVER['DOCUMENT_ROOT'] . "/Proyectos/GiovannyProy4/module/homepage/model/BLL/homepage_bll.class.singleton.php");

class homepage_model {
    private $bll;
    static $_instance;

    private function __construct() {
        $this->bll = homepage_bll::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)){
            self::$_instance = new self();
            // echo "xxxxxxxxxx";
        }
        return self::$_instance;
    }

    public function create_homepage($arrArgument) {
        return $this->bll->create_homepage_BLL($arrArgument);
    }

    public function mejoresCursos($arrArgument) {
        return $this->bll->mejoresCursos_BLL($arrArgument);
    }


    public Function obtain_category($arrArgument){
        return $this->bll->obtain_category_BLL($arrArgument);
    }
    

}
