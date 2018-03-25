<?php
//echo json_encode("products_bll.class.singleton.php");
//exit;


require($_SERVER['DOCUMENT_ROOT']."/Proyectos/GiovannyProy4/model/Db.class.singleton.php");
require($_SERVER['DOCUMENT_ROOT']."/Proyectos/GiovannyProy4/module/courses/model/DAO/course_dao.class.singleton.php");

class course_bll{
   
    private $dao;
    private $db;
    static $_instance;

    private function __construct() {
        $this->dao = courseDAO::getInstance();
        $this->db = Db::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function create_course_BLL($arrArgument){

      return $this->dao->create_course_DAO($this->db, $arrArgument);
    }
    
    public function obtain_category_BLL($arrArgument){
      return $this->dao->obtain_category_DAO($arrArgument);
    }
    public function obtain_subCategory_BLL($arrArgument){
      return $this->dao->obtain_subCategory_DAO($arrArgument);
    }

    public function courseDetails_BLL($id){
        
        return $this->dao->courseDetails_DAO($this->db,$id);
      
    }

    public function cursosFiltrados_BLL($arrArgument){
        
        return $this->dao->cursosFiltrados_DAO($this->db,$arrArgument);
      
    }
}
