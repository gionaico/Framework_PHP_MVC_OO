<?php

class profile_bll{
    private $dao;
    private $db;
    static $_instance;

    private function __construct() {
        $this->dao = profile_dao::getInstance();
        $this->db = db::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function create_user_BLL($arrArgument){
      return $this->dao->create_user_DAO($this->db, $arrArgument);
    }


    public function checkUser_BLL($arrArgument){        
      return $this->dao->checkUser_DAO($this->db, $arrArgument);
    }
    
    public function checkUserEmail_BLL($arrArgument){        
      return $this->dao->checkUserEmail_DAO($this->db, $arrArgument);
    }


    public function obtain_countries_BLL($url){
      return $this->dao->obtain_countries_DAO($url);
    }


    public function obtain_provinces_BLL(){
      return $this->dao->obtain_provinces_DAO();
    }


    public function obtain_cities_BLL($arrArgument){
      return $this->dao->obtain_cities_DAO($arrArgument);
    }

    
    public function registrarUser_BLL($arrArgument){    
        return $this->dao->registrarUser_DAO($this->db,$arrArgument);
    }


    public function registrarUserSocial_BLL($arrArgument){    
        return $this->dao->registrarUserSocial_DAO($this->db,$arrArgument);
    }

    public function updateToken_BLL($arrArgument){    
        return $this->dao->updateToken_DAO($this->db,$arrArgument);
    }

    public function DatosBasicosUser_BLL($arrArgument){    
        return $this->dao->DatosBasicosUser_DAO($this->db,$arrArgument);
    }
    public function activarUser_BLL($arrArgument){    
        return $this->dao->activarUser_DAO($this->db,$arrArgument);
    }
}
