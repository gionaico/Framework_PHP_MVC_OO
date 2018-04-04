<?php
//echo json_encode("products_dao.class.singleton.php");
//exit;

class homepage_dao {
    static $_instance;

    private function __construct() {

    }

    public static function getInstance() {
        if(!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }
    
    public function mejoresCursos_DAO($db, $arrArgument) {      
      $sql=("SELECT * from courses co INNER JOIN (SELECT l.id_curso, COUNT(l.user_name)as cant_likes FROM likes as l GROUP By l.id_curso ORDER BY cant_likes DESC) as tab WHERE co.id=tab.id_curso ");
      // $sql=("SELECT * from courses co INNER JOIN (SELECT l.id_curso, COUNT(l.user_name)as c FROM likes as l GROUP By l.id_curso ORDER BY c DESC LIMIT 3) as tab WHERE co.id=tab.id_curso ");
      // echo ($sql);
      $res=$db->listar($db->ejecutar($sql));
      return $res;
    }
   
    public function obtain_category_DAO(){
        $json = array();
        $tmp = array();

        $category = file_get_contents($_SERVER['DOCUMENT_ROOT'].'/Proyectos/GiovannyProy4/resources/ListOfCategoryCourse.json');
        // $json = json_decode($category);

          
              return $category;

    }
}//End productDAO
