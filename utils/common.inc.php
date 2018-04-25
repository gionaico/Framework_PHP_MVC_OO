<?php

    function loadModel($model_path, $model_name, $function, $arrArgument = '') {
        $model = $model_path . $model_name . '.class.singleton.php';

        if (file_exists($model)) {
            include_once($model);

            $modelClass = $model_name;
            if (!method_exists($modelClass, $function)) {
                throw new Exception();
            }

            $obj = $modelClass::getInstance();
            if (isset($arrArgument)) {
                return call_user_func(array($obj, $function),$arrArgument);//cambiar a array como en router
            }
        } else {
            throw new Exception();
        }
    }    

    function validateDate($date, $format = 'Y-m-d H:i:s'){
        $d = DateTime::createFromFormat($format, $date);
        return $d && $d->format($format) == $date;
    }


    function validateAge($birthday) {
        // $birthday can be UNIX_TMESTAMP or just a string-date.
        $age = (18 * 31536000);
        $year_today=time();
        $today=getdate();
      
        
        if (is_string($birthday)) {
            // $time = strtotime($birthday);
            $birthday = strtotime($birthday);
            // $newformat = date('Y-m-d',$time);
            // return $newformat;

            // check
            // 31536000 is the number of seconds in a 365 days year.
            if ((time() - $birthday) < $age) {
                return false; //
           }
        }
        return true;
    }

    function loadView($rutaVista = '', $templateName = '', $arrPassValue = '') {
        $view_path = $rutaVista . $templateName;
        $arrData = '';

        if (file_exists($view_path)) {
        // debugPHP($view_path);
            if (isset($arrPassValue))
                $arrData = $arrPassValue;
                
            require_once(VIEW_PATH_INC . "header.html");
            require_once(VIEW_PATH_INC . "menu.html");
            include_once($view_path);
            require_once(VIEW_PATH_INC . "footer.html");
        } else {
            $result = filter_num_int($rutaVista);
            if ($result['resultado']) {
                $rutaVista = $result['datos'];
            } else {
                $rutaVista = http_response_code();
            }

            $log = log::getInstance();
            $log->add_log_general("error loadView general", $_GET['module'], "response " . $rutaVista); //$text, $controller, $function
            $log->add_log_user("error loadView general", "", $_GET['module'], "response " . $rutaVista); //$msg, $username = "", $controller, $function

            $result = response_code($rutaVista);
            $arrData = $result;
            require_once(VIEW_PATH_INC . "header.html");
            require_once(VIEW_PATH_INC . "menu.html");         
            require_once (VIEW_PATH_INC . '404.html');
            require_once(VIEW_PATH_INC . "footer.html");
            
        }
    }