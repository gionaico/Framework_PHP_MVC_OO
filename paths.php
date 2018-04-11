<?php

//SITE_ROOT
$path = $_SERVER['DOCUMENT_ROOT'] . "/Proyectos/GiovannyProy4/";
define('SITE_ROOT', $path);

//SITE_PATH
// define('SITE_PATH', 'https://' . $_SERVER['HTTP_HOST'] . "/Proyectos/GiovannyProy4/");
define('SITE_PATH', '//' . $_SERVER['HTTP_HOST'] . "/Proyectos/GiovannyProy4/");

define('PRODUCTION', true);
//CSS
define('CSS_PATH', SITE_PATH . 'view/css/');

//JS
define('JS_PATH', SITE_PATH . 'view/js/');

/*DROPZONE*/
define('JS_DROPZONE', SITE_PATH . 'view/dropzone/downloads/');
define('CSS_DROPZONE', SITE_PATH . 'view/dropzone/downloads/css/');

//IMG
define('IMG_PATH', SITE_PATH . 'view/img/');

//model
define('MODEL_PATH', SITE_ROOT . 'model/');

//view
define('VIEW_PATH_INC', SITE_ROOT . 'view/inc/');
//module
define('MODULES_PATH', SITE_ROOT . 'module/');
//resources
define('RESOURCES', SITE_ROOT . 'resources/');
//media
define('MEDIA_PATH', SITE_ROOT . 'media/');
//utils
define('UTILS', SITE_ROOT . 'utils/');



//model courses
define('UTILS_COURSES', SITE_ROOT . 'module/courses/utils/');
define('COURSES_JS_PATH', SITE_PATH . 'module/courses/view/js/');
define('COURSES_VIEW_PATH', SITE_ROOT . 'module/courses/view/');
define('MODEL_PATH_COURSES', SITE_ROOT . 'module/courses/model/');
define('DAO_COURSES', SITE_ROOT . 'module/courses/model/DAO/');
define('BLL_COURSES', SITE_ROOT . 'module/courses/model/BLL/');
define('MODEL_COURSES', SITE_ROOT . 'module/courses/model/model/');



//model homepage
define('UTILS_HOMEPAGE', SITE_ROOT . 'module/homepage/utils/');
define('HOMEPAGE_JS_PATH', SITE_PATH . 'module/homepage/view/js/');
define('HOMEPAGE_VIEW_PATH', SITE_ROOT . 'module/homepage/view/');
define('MODEL_PATH_HOMEPAGE', SITE_ROOT . 'module/homepage/model/');
define('DAO_HOMEPAGE', SITE_ROOT . 'module/homepage/model/DAO/');
define('BLL_HOMEPAGE', SITE_ROOT . 'module/homepage/model/BLL/');
define('MODEL_HOMEPAGE', SITE_ROOT . 'module/homepage/model/model/');

// echo "<script>console.log( 'estoy en path " . MODULES_PATH . "' );</script>";