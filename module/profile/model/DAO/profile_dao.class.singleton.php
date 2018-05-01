<?php
//echo json_encode("products_dao.class.singleton.php");
//exit;

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
        $register_date=date("Y-m-d");


        $sql = "INSERT INTO users (user_name, email, password, register_date, token) VALUES('$user', '$email', '$password_cifrado', '$register_date', '$token')";
        // echo $sql;
        // exit;
        return $db->ejecutar($sql);      
    }


    public function checkUser_DAO($db, $arrArgument) {
      $user= $arrArgument["user"];      
      $sql=("SELECT * FROM users WHERE user_name ='$user'");
      return $db->listar($db->ejecutar($sql));
    }
    

    public function checkUserEmail_DAO($db, $arrArgument) {
      $email= $arrArgument["email"];      
      $sql=("SELECT * FROM users WHERE email ='$email'"); /*and tipo_registro='m'*/
      return $db->listar($db->ejecutar($sql));
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
