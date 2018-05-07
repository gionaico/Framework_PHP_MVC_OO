<?php

class profile_model {
    private $bll;
    static $_instance;

    private function __construct() {
        $this->bll = profile_bll::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)){
            self::$_instance = new self();
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

    public Function registrarUserSocial($arrArgument){           
        return $this->bll->registrarUserSocial_BLL($arrArgument);
    }

    public Function updateToken($arrArgument){           
        return $this->bll->updateToken_BLL($arrArgument);
    }
    public Function DatosBasicosUser($arrArgument){           
        return $this->bll->DatosBasicosUser_BLL($arrArgument);
    }
    public Function activarUser($arrArgument){           
        return $this->bll->activarUser_BLL($arrArgument);
    }
    public Function updatePass($arrArgument){           
        return $this->bll->updatePass_BLL($arrArgument);
    }
    public function checkUserEmail2($arrArgument) {
        return $this->bll->checkUserEmail2_BLL($arrArgument);
    }
    public function update_usuario($arrArgument) {
        return $this->bll->update_usuario_BLL($arrArgument);
    }


}
