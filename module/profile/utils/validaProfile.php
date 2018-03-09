<?php

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
        // 'birth_date' => array(
        //     'filter' => FILTER_VALIDATE_REGEXP,
        //     'options' => array('regexp' => '/\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])*/')
        // ),
        
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


        if (!$resultado['un']) {
            $error['un'] = '<strong>*php</strong> Please write min 4 caracters';
            $valido = false;
        }       

        if (!$resultado['phone']) {
            $error['phone'] = '<strong>*php</strong> Format must be min 9 numeric characters';
            $valido = false;
        }

        if (!$resultado['email']) {
            $error['email'] = '<strong>*php</strong> Invalid Email';
            $valido = false;
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





