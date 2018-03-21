<?php
//echo json_encode("products model class");
//exit;
// $path = $_SERVER['DOCUMENT_ROOT'] . '/Proyectos/GiovannyProy4/';
// define('SITE_ROOT', $path);
require($_SERVER['DOCUMENT_ROOT'] . "/Proyectos/GiovannyProy4/module/courses/model/BLL/course_bll.class.singleton.php");

class course_model {
    private $bll;
    static $_instance;

    private function __construct() {
        $this->bll = course_bll::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)){
            self::$_instance = new self();
            // echo "xxxxxxxxxx";
        }
        return self::$_instance;
    }

    public function create_course($arrArgument) {
        return $this->bll->create_course_BLL($arrArgument);
    }

    public Function obtain_category($arrArgument){
        return $this->bll->obtain_category_BLL($arrArgument);
    }
    public Function obtain_subCategory($arrArgument){
        return $this->bll->obtain_subCategory_BLL($arrArgument);
    }

    

}
