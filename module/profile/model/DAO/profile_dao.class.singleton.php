<?php

class profile_dao {
    static $_instance;

    private function __construct() {

    }

    public static function getInstance() {
        if(!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function create_user_DAO($db, $arrArgument) {
        $un= $arrArgument['un'];   
        $name= $arrArgument['name'];        
        $birth_date = $arrArgument['birth_date'];
        $genere = $arrArgument['genere'];
        $country = $arrArgument['country'];        
        $province = $arrArgument['province'];
        $city = $arrArgument['city'];
        $phone = $arrArgument['phone'];
        $email = $arrArgument['email'];
        $password= $arrArgument['password'];
        $interests = $arrArgument['interests'];
        $register_date= $arrArgument['register_date'];

        $password_cifrado=password_hash($password, PASSWORD_DEFAULT);
        $All_interests="";
        foreach ($interests as $indice) {
                $All_interests=$All_interests.$indice.":";
            }

        if ($country=="ES") {
          $sql = "INSERT INTO users (user_name, name, birth_date, genere, country, province, city, phone, email, password, interests, register_date) VALUES ('$un', '$name', '$birth_date', '$genere', '$country', '$province', '$city', $phone, '$email', '$password_cifrado', '$All_interests', '$register_date')";
        }else{
          $sql = "INSERT INTO users (user_name, name, birth_date, genere, country, phone, email, password, interests, register_date) VALUES ('$un', '$name', '$birth_date', '$genere', '$country', $phone, '$email', '$password_cifrado', '$All_interests', '$register_date' )";
        }
        
      
      return $db->ejecutar($sql);
    }

    function update_usuario_DAO($db, $arrArgument){
        $user_name= $arrArgument['user_name'];   
        $name= $arrArgument['name'];        
        
        $genere = $arrArgument['genere'];
        $country = $arrArgument['country'];        
        
        
        $email = $arrArgument['email'];
        $password= $arrArgument['password'];
        $intereses = $arrArgument['intereses'];
        $birth_date= $arrArgument['birth_date'];
        $phone=$arrArgument['phone'];
        
        $All_interests="";
        foreach ($intereses as $indice) {
                $All_interests=$All_interests.$indice.":";
            }
        
        if ($birth_date!="") {
          $cad=', birth_date="'.$birth_date.'"';
        }

        if ($phone!="") {
          $cad=$cad.', '.'phone='.$phone.'';
        }

        if ($password!="") {          
          $password_cifrado=password_hash($password, PASSWORD_DEFAULT);
          $cad=$cad.', '.'password="'.$password_cifrado.'"';
        }
        if ($All_interests!="") {
          $cad=', interests="'.$All_interests.'"';
        }

        if ($country=="ES") {
          $province = $arrArgument['province'];
          $city = $arrArgument['city'];

          $sql = "UPDATE users SET name='$name', genere='$genere', country='$country', email='$email', province='$province', city='$city'  $cad WHERE user_name= '$user_name'";
        }else{
          $sql = "UPDATE users SET name='$name', genere='$genere', country='$country', email='$email'   $cad WHERE user_name= '$user_name'";
        }
        // echo $sql;
        return $db->ejecutar($sql);


    }

    /*public function update_user_DAO($db, $arrArgument) {
      echo "llega";exit;
        $user_name= $arrArgument['user_name'];   
        $name= $arrArgument['name'];        
        
        $genere = $arrArgument['genere'];
        $country = $arrArgument['country'];        
        
        
        $email = $arrArgument['email'];
        $password= $arrArgument['password'];
        $interests = $arrArgument['interests'];
        $register_date= $arrArgument['register_date'];

        $password_cifrado=password_hash($password, PASSWORD_DEFAULT);
        $All_interests="";
        foreach ($interests as $indice) {
                $All_interests=$All_interests.$indice.":";
            }


        $birth_date = $arrArgument['birth_date'];
        $phone = $arrArgument['phone'];
        $cad=""
        if ($birth_date!="") {
          $cad=', birth_date='.$birth_date.'';
        }
        if ($phone=="") {
          $cad=$cad.', '.'phone='.$phone.'';
        }


        $sql = "UPDATE users SET token='$token' WHERE user_name='$user'";


        if ($country=="ES") {
          $province = $arrArgument['province'];
          $city = $arrArgument['city'];

          $sql = "UPDATE users SET name='$name', genere='$genere', country='$country', email='$email', province='$province', city='$city'  WHERE user_name= '$user_name'";
        }else{
          $sql = "UPDATE users SET name='$name', genere='$genere', country='$country', email='$email'   WHERE user_name= '$user_name'";
        }
        
      
      // return $db->ejecutar($sql);
    }*/


    public function checkUserEmail2_DAO($db, $arrArgument) {
      $email= $arrArgument["email"];
      $user= $arrArgument["user_name"];

      $sql=("SELECT * FROM users WHERE email ='$email' and user_name!='$user'"); /*and tipo_registro='m'*/
      // echo $sql;
      return $db->listar($db->ejecutar($sql));
    }

    public function obtain_countries_DAO($url){
          $ch = curl_init();
          curl_setopt ($ch, CURLOPT_URL, $url);
          curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
          curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, 5);
          $file_contents = curl_exec($ch);

          $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
          curl_close($ch);
          $accepted_response = array(200, 301, 302);
          if(!in_array($httpcode, $accepted_response)){
            return FALSE;
          }else{
            return ($file_contents) ? $file_contents : FALSE;
          }
    }

    public function obtain_provinces_DAO(){
          $json = array();
          $tmp = array();

          $provincias = simplexml_load_file($_SERVER['DOCUMENT_ROOT'].'/Proyectos/GiovannyProy4/resources/provinciasypoblaciones.xml');
          $result = $provincias->xpath("/lista/provincia/nombre | /lista/provincia/@id");
          for ($i=0; $i<count($result); $i+=2) {
            $e=$i+1;
            $provincia=$result[$e];

            $tmp = array(
              'id' => (string) $result[$i], 'nombre' => (string) $provincia
            );
            array_push($json, $tmp);
          }
              return $json;

    }

    public function obtain_cities_DAO($arrArgument){
          $json = array();
          $tmp = array();

          $filter = (string)$arrArgument;
          $xml = simplexml_load_file($_SERVER['DOCUMENT_ROOT'].'/Proyectos/GiovannyProy4/resources/provinciasypoblaciones.xml');
          $result = $xml->xpath("/lista/provincia[@id='$filter']/localidades");

          for ($i=0; $i<count($result[0]); $i++) {
              $tmp = array(
                'poblacion' => (string) $result[0]->localidad[$i]
              );
              array_push($json, $tmp);
          }
          return $json;
    }

    public function registrarUser_DAO($db, $arrArgument) {
        $user= $arrArgument['user'];
        $email = $arrArgument['email'];
        $password= $arrArgument['password'];
        $password_cifrado=password_hash($password, PASSWORD_DEFAULT);
        $token= $arrArgument['token'];
        $avatar= $arrArgument['avatar'];
        $register_date=date("Y-m-d");


        $sql = "INSERT INTO users (user_name, email, password, register_date, token, avatar) VALUES('$user', '$email', '$password_cifrado', '$register_date', '$token', '$avatar')";
        // echo $sql;
        // exit;
        return $db->ejecutar($sql);      
    }

    public function registrarUserSocial_DAO($db, $arrArgument) {
        $user= $arrArgument['user'];
        $name= $arrArgument['name'];
        $email = $arrArgument['email'];
        $avatar = $arrArgument['avatar'];
        $tipo_registro = $arrArgument['tipo_registro'];
        $register_date=date("Y-m-d");


        $sql = "INSERT INTO users (user_name, name, email,  register_date, avatar, tipo_registro) VALUES('$user', '$name', '$email', '$register_date', '$avatar', '$tipo_registro')";
        // echo $sql;
        // exit;
        return $db->ejecutar($sql);      
    }


    public function checkUser_DAO($db, $arrArgument) {
      $user= $arrArgument["user"];      
      $sql=("SELECT * FROM users WHERE user_name ='$user'");
      // echo $sql;
        // exit;
      return $db->listar($db->ejecutar($sql));
    }
    

    public function checkUserEmail_DAO($db, $arrArgument) {
      $email= $arrArgument["email"];      
      $sql=("SELECT * FROM users WHERE email ='$email'"); /*and tipo_registro='m'*/
      return $db->listar($db->ejecutar($sql));
    }

    public function DatosBasicosUser_DAO($db, $arrArgument) {
      $user= $arrArgument["user"]; 
      $sql=("SELECT user_name, name, type, avatar, activado, primera_visita FROM users WHERE user_name ='$user'"); /*and tipo_registro='m'*/
      return $db->listar($db->ejecutar($sql));
    }

    public function updateToken_DAO($db, $arrArgument) {
        $token = $arrArgument["token"];
        $user = $arrArgument["user"];
        $sql = "UPDATE users SET token='$token' WHERE user_name='$user'";
        return $db->ejecutar($sql);      
    }

    public function activarUser_DAO($db, $arrArgument) {
        $token = $arrArgument["token"];
        $activado = $arrArgument["activado"];


        $sql = "UPDATE users SET activado='$activado' WHERE token='$token'";
        // echo $sql;exit;
        return $db->ejecutar($sql);      
    }

    public function updatePass_DAO($db, $arrArgument) {
        $token = $arrArgument["token"];
        $pass = password_hash($arrArgument["pass"], PASSWORD_DEFAULT);
        $sql = "UPDATE users SET password='$pass' WHERE token='$token'";

        return $db->ejecutar($sql);      
    }


   /* public function checkUser_DAO($db, $arrArgument) {  
      $valor= $arrArgument[0];
      $valor1= $arrArgument[1];
      $sql=("SELECT * FROM users WHERE ".$valor." ='$valor1'");
      // echo ($sql);
      $res=$db->listar($db->ejecutar($sql));
      if (count($res)>0) {
        return false;
      }
      return true;
    }*/
}//End productDAO


/*
cambiaMenu(logueado=false);
        logTwitter(authService);
        logGoogle(authService);  
        logFacebook(authService);
        logManual();

    }else{
      logOut(authService);
        cambiaMenu(logueado=true);
    }
 */