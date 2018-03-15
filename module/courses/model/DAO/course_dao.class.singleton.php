<?php
//echo json_encode("products_dao.class.singleton.php");
//exit;

class courseDAO {
    static $_instance;

    private function __construct() {

    }

    public static function getInstance() {
        if(!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function create_course_DAO($db, $arrArgument) {

        $title= $arrArgument['title'];   
        $courseLenguge= $arrArgument['courseLenguge'];        
        $ulr = $arrArgument['ulr'];
        $courseDuration = $arrArgument['courseDuration'];
        $level = $arrArgument['level'];        
        $price = $arrArgument['price'];
        $courseDescr = $arrArgument['courseDescr'];
        $personalDescr = $arrArgument['personalDescr'];
        $register_date = $arrArgument['register_date'];
        $avatar= $arrArgument['avatar'];

        $category = $arrArgument['category'];        
        $All_category="";
        foreach ($category as $indice) {
                $All_category=$All_category.$indice.":";
            }

        $sql = "INSERT INTO courses (title, lenguage, ulr, duration, levelCour, price, courseDescr, personalDescr, register_date, avatar, category) VALUES ('$title', '$courseLenguge', '$ulr', '$courseDuration', '$level', $price, '$courseDescr', '$personalDescr', '$register_date', '$avatar', '$All_category' )";
        
      // echo($sql);
      // exit;  
      
      return $db->ejecutar($sql);
    }

   
}//End productDAO
