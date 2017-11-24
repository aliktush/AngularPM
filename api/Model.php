<?php
/** protect access to direct request */
if(!defined('HIGHT')) die('access denied');

/** app config **/
require_once($_SERVER['DOCUMENT_ROOT']."/config.php");

Class Model{
    const DB_SERVER = host;
    const DB_USER = user;
    const DB_PASSWORD = password;
    const DB = base;

    private $db = NULL;
    private $mysqli = NULL;
    
    public function __construct(){
        //TODO: create User, DB and tables
        /*CREATE USER 'lessonslist'@'localhost' IDENTIFIED BY '***';GRANT USAGE ON *.* TO 'lessonslist'@'localhost' IDENTIFIED BY '***' REQUIRE NONE WITH MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0;CREATE DATABASE IF NOT EXISTS `lessonslist`;GRANT ALL PRIVILEGES ON `lessonslist`.* TO 'lessonslist'@'localhost';GRANT ALL PRIVILEGES ON `lessonslist\_%`.* TO 'lessonslist'@'localhost';
        /*CREATE TABLE `lessonslist`.`users` ( `ID` INT(11) NOT NULL AUTO_INCREMENT , `email` VARCHAR(100) NOT NULL , `password` TEXT NOT NULL , `name` TEXT NOT NULL , `role` VARCHAR(20) NOT NULL , PRIMARY KEY (`ID`)) ENGINE = InnoDB CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT = 'user data table';*/
        /*CREATE TABLE `lessonslist`.`settings` ( `ID` INT(11) NOT NULL AUTO_INCREMENT , `name` VARCHAR(20) NOT NULL , `value` TEXT NOT NULL , PRIMARY KEY (`ID`)) ENGINE = InnoDB CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT = 'settings data table';*/
        /*CREATE TABLE `lessonslist`.`rooms` ( `ID` VARCHAR(15) NOT NULL , `description` TEXT NOT NULL , PRIMARY KEY (`ID`)) ENGINE = InnoDB CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT = 'rooms data table';*/
        /*CREATE TABLE `lessonslist`.`groups` ( `ID` VARCHAR(15) NOT NULL , `description` TEXT NOT NULL , PRIMARY KEY (`ID`)) ENGINE = InnoDB CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT = 'group data table';*/
        /*CREATE TABLE `lessonslist`.`lectures` ( `ID` INT(11) NOT NULL AUTO_INCREMENT , `name` TEXT NOT NULL , `second` TEXT NOT NULL , `last` TEXT NOT NULL , `description` TEXT NULL , PRIMARY KEY (`ID`)) ENGINE = InnoDB CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT = 'lecture data table';*/
        /*CREATE TABLE `lessonslist`.`lessons` ( `ID` INT(11) NOT NULL AUTO_INCREMENT , `name` TEXT NOT NULL , `lecture_ID` INT(11) NOT NULL , `description` TEXT NOT NULL , PRIMARY KEY (`ID`)) ENGINE = InnoDB CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT = 'lesson data table';*/
        /*CREATE TABLE `lessonslist`.`lessonslist` ( `ID` INT(11) NOT NULL AUTO_INCREMENT , `number` INT(11) NOT NULL , `day` INT(1) NOT NULL , `lesson_ID` INT(11) NOT NULL , `room_ID` VARCHAR(15) NOT NULL , `group_ID` VARCHAR(15) NOT NULL , PRIMARY KEY (`ID`)) ENGINE = InnoDB CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT = 'lessonslist data table';*/
        $this->dbConnect();					// Initiate Database connection
    }
    
    /**
     *  Connect to Database
     */
    private function dbConnect(){
        $this->mysqli = new mysqli(self::DB_SERVER, self::DB_USER, self::DB_PASSWORD, self::DB);
    }
    
    /**
     * Put all request to DB here like
     * public function Select(){ ... }
     */
    
    public function Select($data = array()){
        
        
        if($data['t_name']){
            $table = $data['t_name'];
            
            $fields = "*";
            if($data['fields']){
                $fields = $data['fields'];
            }
            
            $query = "";
            if($data['query']){
                $query = $data['query'];
            }
            
            $query = "SELECT $fields FROM $table " . $query;
            
            
            $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
            return $r;
            
        }else{
            return "Table name not set";
        }
    }
}