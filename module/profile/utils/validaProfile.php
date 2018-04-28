<?php

    function valida_usuario($value) {
        $error = array();
        $valido = true;
        $filtro = array(
            'user' => array(
                'filter' => FILTER_VALIDATE_REGEXP,
                'options' => array('regexp' => '/^[_A-Za-z0-9-\\+]{4,}$/')
            ),
            'email' => array(
                'filter' => FILTER_VALIDATE_REGEXP,
                'options' => array('regexp' => '/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/')
            ),
            'password' => array(
                'filter' => FILTER_VALIDATE_REGEXP,
                'options' => array('regexp' => '/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/')
            ),       
            
        );

        $resultado = filter_var_array($value, $filtro);

        if (($resultado!=null) && ($resultado)) {   
            if (!$resultado['user']) {
                $error['user'] = '<strong>*php</strong> Please write min 4 caracters';
                $valido = false;
            }else{                
                $compruebaUsuario = loadModel(MODEL_PROFILE, "profile_model", "checkUser", $value);

                if (count($compruebaUsuario)>0) {
                    $error['user'] = '<strong>*php'.count($compruebaUsuario).'</strong> This user already exist in our DB';
                    $valido = false;  
                }
            }

             if (!$resultado['email']) {
                $error['email'] = '<strong>*php</strong> Please write min 4 caracters';
                $valido = false;
            }else{                
                $compruebaEmail = loadModel(MODEL_PROFILE, "profile_model", "checkUserEmail", $value);
                // $error['email'] = '<strong>*php'.$compruebaEmail.'</strong> This email already exist in our DB';
                if (count($compruebaEmail)>0) {
                    $error['email'] = '<strong>*php'.count($compruebaEmail).'</strong> This email already exist in our DB';
                    $valido = false;  
                }
            }

            if (!$resultado['password']) {
                $error['password'] = '<strong>*php</strong> Invalid format';
                $valido = false;
            }
                  

        } else {
            $valido = false;
        }
        
        return $return = array('resultado' => $valido, 
                                'error' => $error, 
                                'datos' => $resultado);

    }

function validate($value) {
    $error = array();
    $valido = true;
    $filtro = array(
        'un' => array(
            'filter' => FILTER_VALIDATE_REGEXP,
            'options' => array('regexp' => '/^[_A-Za-z0-9-\\+]{4,}$/')
        ),
        'name' => array(
            'filter' => FILTER_VALIDATE_REGEXP,
            'options' => array('regexp' => "/[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,48}/")
        ),
        'phone' => array(
            'filter' => FILTER_VALIDATE_REGEXP,
            'options' => array('regexp' => '/^[0-9]{9}$/')
        ),
        'email' => array(
            'filter' => FILTER_VALIDATE_REGEXP,
            'options' => array('regexp' => '/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/')
        ),
        'password' => array(
            'filter' => FILTER_VALIDATE_REGEXP,
            'options' => array('regexp' => '/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/')
        ),       
        
    );

    $resultado = filter_var_array($value, $filtro);

    
    

    $resultado['country'] = $value['country'];
    $resultado['province'] = $value['province'];
    $resultado['city'] = $value['city'];
    $resultado['genere'] = $value['genere'];
    $resultado['interests'] = $value['interests'];
    $resultado['birth_date'] = $value['birth_date'];
    $resultado['register_date']=date("Y-m-d");

    
    if ($resultado['country'] === '') {
        $error['country'] = "*php You haven't select a country.";
        $valido = false;
    }elseif ($resultado['country'] === 'ES') {
        
        if ($resultado['province']===''){
                $error['province']="You need to choose a province";
                $valido = false;
        }

        if ($resultado['city']===''){
                $error['city']="You need to choose a city";
                $valido = false;
        }
    }
    
    if ($resultado['genere']=="") {
        $error['genere']="You need to choose a genere";
        $valido = false;
     }

     if ($resultado['interests']=="") {
        $error['interests']="You need to choose a interests";
        $valido = false;
     }


    if (($resultado!=null) && ($resultado)) {

        $path_model=$_SERVER['DOCUMENT_ROOT'] . '/Proyectos/GiovannyProy4/module/profile/model/model/';        

        if (!$resultado['un']) {
            $error['un'] = '<strong>*php</strong> Please write min 4 caracters';
            $valido = false;
        }else{
            $arr=["user_name",$resultado['un']];
            $evio_loadModel = loadModel($path_model, "profile_model", "checkUser", $arr);
            if (!$evio_loadModel) {
                $error['un'] = '<strong>*php</strong> This user already exist in our DB';
                $valido = false;  
            }
        }       

        if (!$resultado['phone']) {
            $error['phone'] = '<strong>*php</strong> Format must be min 9 numeric characters';
            $valido = false;
        }else{
            $arr=["phone",$resultado['phone']];
            $evio_loadModel = loadModel($path_model, "profile_model", "checkUser", $arr);
            if (!$evio_loadModel) {
                $error['phone'] = '<strong>*php</strong> This phone already exist in our DB';
                $valido = false;  
            }
        }

        if (!$resultado['email']) {
            $error['email'] = '<strong>*php</strong> Invalid Email';
            $valido = false;
        }else{
            $arr=["email",$resultado['email']];
            $evio_loadModel = loadModel($path_model, "profile_model", "checkUser", $arr);
            if (!$evio_loadModel) {
                $error['email'] = '<strong>*php</strong> This email already exist in our DB';
                $valido = false;  
            }
        }

        if (!validateDate($resultado['birth_date'], 'Y-m-d')) {
            $error['birth_date'] = '<strong>*php</strong> Invalid Date';
            $valido = false;
        }else{
            if (!validateAge($resultado['birth_date'])) {
                $error['birth_date'] = '<strong>*php</strong> Your age must be greater than 18 years';
                $valido = false;
            }
        }

       

    } else {
        $valido = false;
    }
    
    return $return = array('resultado' => $valido, 
                            'error' => $error, 
                            'datos' => $resultado);
}





