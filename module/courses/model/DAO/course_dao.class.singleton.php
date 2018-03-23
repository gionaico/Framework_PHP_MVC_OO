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
        $subject= $arrArgument['subject'];
        $subSubject= $arrArgument['subSubject'];

        $category = $arrArgument['category'];        
        $All_category="";
        foreach ($category as $indice) {
                $All_category=$All_category.$indice.":";
            }

        $sql = "INSERT INTO courses (title, lenguage, ulr, duration, levelCour, price, courseDescr, personalDescr, register_date, avatar, category, subject, sub_subject) VALUES ('$title', '$courseLenguge', '$ulr', '$courseDuration', '$level', $price, '$courseDescr', '$personalDescr', '$register_date', '$avatar', '$All_category', '$subject', '$subSubject' )";
        
      // echo($sql);
      // exit;  
      
      return $db->ejecutar($sql);
    }

   public function obtain_category_DAO(){
        $json = array();
        $tmp = array();

        $category = file_get_contents($_SERVER['DOCUMENT_ROOT'].'/Proyectos/GiovannyProy4/resources/ListOfSubcategoryCourse.json');
        // $json = json_decode($category);

          
              return $category;

    }

    public function courseDetails_DAO($db, $id) {
        $sql = "SELECT * FROM courses WHERE id='".$id."'";
        return $db->listar($db->ejecutar($sql));
        
    }

    public function obtain_subCategory_DAO(){
        $json = array();
        $tmp = array();

        $subCategory = file_get_contents($_SERVER['DOCUMENT_ROOT'].'/Proyectos/GiovannyProy4/resources/ListOfSubcategoryCourse.json');
        // $json = json_decode($category);

          
              return $subCategory;

    }


        // echo ($sql);
        // exit;
}//End productDAO
