<?php
    function enviar_email($arr) {
        $html = '';
        $subject = '';
        $body = '';
        $ruta = '';
        $return = '';
        // echo($arr['type']);exit;
        switch ($arr['type']) {                
            case 'contact':
                $subject = 'Tu Peticion a Libra LearnEasy ha sido enviada<br>';
                $ruta = '<a href=' . 'http://localhost/Proyectos/GiovannyProy4/contact/view_contact/'. '>aqu&iacute;</a>';
                $body = 'Para visitar nuestra web, pulsa ' . $ruta;
                break;
    
            case 'admin':
                $subject = $arr['inputSubject'];
                $body = 'inputName: ' . $arr['inputName']. '<br>' .
                'inputEmail: ' . $arr['inputEmail']. '<br>' .
                'inputSubject: ' . $arr['inputSubject']. '<br>' .
                'inputMessage: ' . $arr['inputMessage'];
                break;
        }
        
        $html .= "<html>";
        $html .= "<body>";
	       $html .= "<h4>". $subject ."</h4>";
	       $html .= $body;
	       $html .= "<br><br>";
	       $html .= "<p>Sent by Libra LearnEasy</p>";
		$html .= "</body>";
		$html .= "</html>";

        set_error_handler('ErrorHandler');
        try{
            $mail = email::getInstance();
            $mail->name = $arr['inputName'];
            if ($arr['type'] === 'admin'){
                $mail->address = 'gmc.yanez@gmail.com';
            }else{
                $mail->address = $arr['inputEmail'];
            }
            $mail->subject = $subject;
            $mail->body = $html;
            
        } catch (Exception $e) {
			$return = 0;
		}
		restore_error_handler();

        /*
        if ($mail->enviar()) {
            $return = 1;
        } else {
            $return = 0;
        }
        */
        $return = $mail->enviar();
        echo ($return);exit;
        return $return;
    }
