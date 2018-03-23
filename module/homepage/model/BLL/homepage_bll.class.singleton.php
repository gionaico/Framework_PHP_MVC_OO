<?php
//echo json_encode("products_bll.class.singleton.php");
//exit;


require($_SERVER['DOCUMENT_ROOT']."/Proyectos/GiovannyProy4/model/Db.class.singleton.php");
require($_SERVER['DOCUMENT_ROOT']."/Proyectos/GiovannyProy4/module/homepage/model/DAO/homepage_dao.class.singleton.php");

class homepage_bll{
    private $dao;
    private $db;
    static $_instance;

    private function __construct() {
        $this->dao = homepageDAO::getInstance();
        $this->db = Db::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function create_homepage_BLL($arrArgument){

      return $this->dao->create_homepage_DAO($this->db, $arrArgument);
    }
    public function mejoresCursos_BLL($arrArgument){

      return $this->dao->mejoresCursos_DAO($this->db, $arrArgument);
    }
    public function obtain_category_BLL($arrArgument){
      return $this->dao->obtain_category_DAO($arrArgument);
    }
}
