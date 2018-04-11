<?php
function debugPHP($array) {
    echo "<pre>";
    print_r($array);
    echo "</pre>";
}

function redirect($url) {
    die('<script>window.location.href="' . $url . '";</script>');
}
function col($url) {
    die('<script>console.log("' . $url . '");</script>');
}

function close_session() {
    $_SESSION = array(); // Destruye todas las variables de la sesión
    session_destroy(); // Destruye la sesión
}


function amigable($url,   $return = false) {
    $amigableson = URL_AMIGABLES;
    $link = "";
    if ($amigableson) {
        $url = explode("&", str_replace("?", "", $url));
        foreach ($url as $key => $value) {
            $aux = explode("=", $value);
            $link .=  $aux[1]."/";
        }
    } else {
        $link = "index.php" . $url;
    }
    
    if ($return) {
        return SITE_PATH . $link;
    }
    echo SITE_PATH . $link;
}

function saberModule($moduleName){

    if($_GET['module'] === $moduleName)      
        echo 'active';        
    else   
        echo 'deactivate';
                
}

