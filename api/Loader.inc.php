<?php
/** protect access to direct request */
if(!defined('HIGHT')) die('access denied');

/**
 * Core to load all models
 */
$dir = $_SERVER['DOCUMENT_ROOT'].'/api/models';
$dir2 = $_SERVER['DOCUMENT_ROOT'].'/api/services';

$files = array_diff( scandir( $dir), array('..', '.'));
$files2 = array_diff( scandir( $dir2), array('..', '.'));

/*
 * Add all needet services
 */
foreach($files2 as $file){
    /** check if file '.php' */
    $temp = explode(".", $file);
    if($temp[count($temp)-1] == "php"){
        require_once($dir2."/".$file);
    }
}

/*
 * Add all needet models
 */
foreach($files as $file){
    /** check if file '.php' */
    $temp = explode(".", $file);
    if($temp[count($temp)-1] == "php"){
        require_once($dir."/".$file);
    }
}