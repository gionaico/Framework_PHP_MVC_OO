<?php

function validate($value) {
    $error = array();
    $valido = true;
    $filtro = array(
        'ulr' => array(
            'filter' => FILTER_VALIDATE_REGEXP,
            'options' => array('regexp' => '/^(ftp|http|https):\/\/[^ "]+$/')
        ),
        'price' => array(
            'filter' => FILTER_VALIDATE_REGEXP,
            'options' => array('regexp' => '/^[0-9]{1,3}([.][0-9]{1,2})?$/')
        ),            
        
    );

    $resultado = filter_var_array($value, $filtro);

    
    
    $resultado['title'] = $value['title'];
    $resultado['courseLenguge'] = $value['courseLenguge'];
    $resultado['courseDuration'] = $value['courseDuration'];
    $resultado['level'] = $value['level'];
    $resultado['courseDescr'] = $value['courseDescr'];
    $resultado['category'] = $value['category'];
    $resultado['personalDescr'] = $value['personalDescr'];
    $resultado['register_date']=date("Y-m-d");
    
    
    if (strlen($resultado['title'])<10) {
        $error['title']="You need to write a title with min 10 caracters";
        $valido = false;
     }

    if ($resultado['level']=="") {
        $error['level']="You need to choose a level";
        $valido = false;
     }

     if ($resultado['courseLenguge']=="") {
        $error['courseLenguge']="You need to choose your course lenguge";
        $valido = false;
     }

     if ($resultado['courseDuration']=="") {
        $error['courseDuration']="You need to choose your course duration";
        $valido = false;
     }

     if ($resultado['level']=="") {
        $error['level']="You need to choose your course level";
        $valido = false;
     }

     if (strlen($resultado['courseDescr'])<150) {
        $error['courseDescr']="You need to write the course description";
        $valido = false;
     }
     if (count($resultado['category'])==0) {
        $error['category']="You need to choose your course category";
        $valido = false;
     }
     if (strlen($resultado['personalDescr'])<150) {
        $error['personalDescr']="You need to write your personal description";
        $valido = false;
     }

    if (($resultado!=null) && ($resultado)) {   

        if (!$resultado['ulr']) {
            $error['ulr'] = '<strong>*php</strong> Please write a correct ulr';
            $valido = false;
        }
        if (!$resultado['price']) {
            $error['price'] = '<strong>*php</strong> Please write a correct price';
            $valido = false;
        }       

    } else {
        $valido = false;
    }
    
    return $return = array('resultado' => $valido, 
                            'error' => $error, 
                            'datos' => $resultado);
}





