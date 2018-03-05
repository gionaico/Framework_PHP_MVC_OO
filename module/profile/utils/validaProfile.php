<?php
include ($_SERVER['DOCUMENT_ROOT'] . "/Proyectos/GiovannyProy4/utils/common.inc.php");

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
    
    if ($value['country'] === '') {
        $error['country'] = "*php You haven't select a country.";
        $valido = false;
    }
    if ($resultado['province']===''){
            $error['province']="You need to choose a province";
            $valido = false;
    }

    if ($resultado['city']===''){
            $error['city']="You need to choose a city";
            $valido = false;
    }


    if (($resultado!=null) && ($resultado)) {


        if (!$resultado['un']) {
            $error['un'] = '<strong>*php</strong> Please write with capital letters';
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
        if (!validateDate($value['birth_date'], 'Y-m-d')) {
            $error['birth_date'] = '<strong>*php</strong> Invalid Date';
            $valido = false;
        }

    } else {
        $valido = false;
    }
    
    return $return = array('resultado' => $valido, 
                            'error' => $error, 
                            'datos' => $resultado);
}





