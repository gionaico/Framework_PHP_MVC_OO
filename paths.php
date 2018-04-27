<?php

/*SITE_ROOT*/
	$path = $_SERVER['DOCUMENT_ROOT'] . "/Proyectos/GiovannyProy4/";
	define('SITE_ROOT', $path);

/*PROYECTO	*/
	define('PROJECT', '/Proyectos/GiovannyProy4/');

/*SITE_PATH*/
	define('SITE_PATH', 'http://' . $_SERVER['HTTP_HOST'] . "/Proyectos/GiovannyProy4/");

	define('PRODUCTION', true);
/*CSS*/
	define('CSS_PATH', SITE_PATH . 'view/css/');/*la clase log la detecta como error e imprime errores constantes*/

/*JS*/
	define('JS_PATH', SITE_PATH . 'view/js/');

//libs
	define('LIBS', SITE_ROOT . '/libs/');

/*DROPZONE*/
	define('JS_DROPZONE', SITE_PATH . 'view/dropzone/downloads/');
	define('CSS_DROPZONE', SITE_PATH . 'view/dropzone/downloads/css/');

/*IMG*/
	define('IMG_PATH', SITE_PATH . 'view/img/');

/*model*/
	define('MODEL_PATH', SITE_ROOT . 'model/');

/*view*/
	define('VIEW_PATH_INC', SITE_ROOT . 'view/inc/');
/*module*/
	define('MODULES_PATH', SITE_ROOT . 'module/');
/*resources*/
	define('RESOURCES', SITE_ROOT . 'resources/');
/*media*/
	define('MEDIA_PATH', SITE_ROOT . 'media/');
/*utils*/
	define('UTILS', SITE_ROOT . 'utils/');



/*model courses*/
	define('UTILS_COURSES', SITE_ROOT . 'module/courses/utils/');
	define('COURSES_JS_PATH', SITE_PATH . 'module/courses/view/js/');
	define('COURSES_VIEW_PATH', SITE_ROOT . 'module/courses/view/');
	define('MODEL_PATH_COURSES', SITE_ROOT . 'module/courses/model/');
	define('DAO_COURSES', SITE_ROOT . 'module/courses/model/DAO/');
	define('BLL_COURSES', SITE_ROOT . 'module/courses/model/BLL/');
	define('MODEL_COURSES', SITE_ROOT . 'module/courses/model/model/');
	define('IMG_COURSES', SITE_PATH . 'module/courses/view/img/');



/*model homepage*/
	define('UTILS_HOMEPAGE', SITE_ROOT . 'module/homepage/utils/');
	define('HOMEPAGE_JS_PATH', SITE_PATH . 'module/homepage/view/js/');
	define('HOMEPAGE_VIEW_PATH', SITE_ROOT . 'module/homepage/view/');
	define('MODEL_PATH_HOMEPAGE', SITE_ROOT . 'module/homepage/model/');
	define('DAO_HOMEPAGE', SITE_ROOT . 'module/homepage/model/DAO/');
	define('BLL_HOMEPAGE', SITE_ROOT . 'module/homepage/model/BLL/');
	define('MODEL_HOMEPAGE', SITE_ROOT . 'module/homepage/model/model/');



/*module contact*/
    define('CONTACT_JS_PATH', SITE_PATH . 'module/contact/view/js/');	
	define('CONTACT_LIB_PATH', SITE_PATH . 'module/contact/view/lib/');
	define('CONTACT_IMG_PATH', SITE_PATH . 'module/contact/view/img/'); 
    define('CONTACT_VIEW_PATH', 'module/contact/view/');

/*module profile*/
    define('PROFILE_JS_PATH', SITE_PATH . 'module/profile/view/js/');
    define('UTILS_PROFILE', SITE_ROOT . 'module/profile/utils/');
    define('MODEL_PROFILE', SITE_ROOT . 'module/profile/model/model/');


/*IMPORT_MODAL*/
    define('IMPORT_MODAL', SITE_PATH . 'module/profile/view/');

//Activacio URL amigables
	define('URL_AMIGABLES', TRUE);

/*log*/
	define('GENERAL_LOG_DIR',SITE_ROOT.'log/general/Site_General_errors.log');
	define('USER_LOG_DIR',SITE_ROOT.'log/user/Site_User_errors.log');


	define('IMG_LIBRA_LEARNEASY',SITE_ROOT.'view/img/libraLearnEasy.jpg');


