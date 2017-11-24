<?php
/** protect access to direct request */
if(!defined('HIGHT')) die('access denied');

require_once("Model.php");

class User extends Model{
    
    /** name of table */
    private $table_name = 'users';
    
    /** fields */
    private $fields = [
        'fields' => ['email','password','name','role','token','last_login','ip','reg_date','status'],
        'protected' => ['password','ip','status','last_login']
    ];
    
    /** POST */
    private $data = array();
    
    /** main function */
    public function __construct($data = null){
        parent::__construct();
        
        $this->data = $data;
    }
    
    
    
    
    public function login($params = null){
        
        if(!$this->data){
            return array("Error"=>"Missing login data");
        }else{
            $user = $this->data;
            
            $fields = '';
            
            if($params){
                $fields = explode(",",explode("=",$params)[1]);
            }
            
            if(!empty($user['email']) and !empty($user['password'])){
                
                if(filter_var($user['email'], FILTER_VALIDATE_EMAIL)){
                    $query = "where email = '" . $user['email'] . "' AND password = '".$user['password']."' LIMIT 1";
                    
                    $response = $this->Select(array('t_name'=>$this->table_name,'fields'=>implode(",", $this->fields['fields']),'query'=>$query));
                    
                    if(!is_string($response)){
                        
                        if($response->num_rows > 0) {
                            
                            $result = array();
                            while($row = $response->fetch_assoc()){
                                $result[] = $row;
                            }
                            $current_user = $result[0];
                            
                            /** check protected fields */
                            if(is_array($fields) && count($fields)>0){
                                foreach($current_user as $key =>  $field){
                                    if(!in_array($key, $fields)){
                                        unset($current_user[$key]);
                                    }
                                }
                            }

                            foreach($current_user as $key =>  $field){
                                if(in_array($key, $this->fields['protected'])){
                                    unset($current_user[$key]);
                                }
                            }
                            
                            
                            return array("Data"=>$current_user);
                        }
                        return array("Error"=>"Email or password is not walid");
                    }
                    return array("Error"=>$response);
                }
                return array("Error"=>"Email is not walid");
            }
            return array("Error"=>"Missing user name or password");
        }
        
        
        
        
        
        /*if($this->get_request_method() != "POST"){
            $this->response('',406);
        }
        $user = $this->data;
        
        $email = $user['email'];
        $password = $user['password'];

        if(!empty($email) and !empty($password)){
            if(filter_var($email, FILTER_VALIDATE_EMAIL)){
                $query="SELECT name, email, role FROM users WHERE email = '$email' AND password = '".md5($password)."' LIMIT 1";
                $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);

                if($r->num_rows > 0) {
                    $result = $r->fetch_assoc();
                    //TODO: set authorisation token and time 
                    $result['token'] = md5($result['name'].$result['email']);
                    // If success everythig is good send header as "OK" and user details
                    $success = array('status' => "Success", "data" => $result);
                    $this->response($this->json($success), 200);
                }
                $error = array('status' => "Failed", "msg" => "Email or password incorrect");
                $this->response($this->json($error), 200);
            }
        }

        $error = array('status' => "Failed", "msg" => "Invalid Email address or Password");
        $this->response($this->json($error), 200);*/
    }

    /*public function signup(){
        if($this->get_request_method() != "PUT"){
            $this->response('',406);
        }
        $data = json_decode(file_get_contents("php://input"),true);

        $name = $data['name'];
        $email = $data['email'];
        $password = md5($data['password']);
        $role = "user";

        if(!empty($email) and !empty($password) and !empty($name)){

            if(filter_var($email, FILTER_VALIDATE_EMAIL)){
                $query="SELECT email FROM users WHERE email = '$email' LIMIT 1";
                $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);

                if($r->num_rows > 0) {
                    $error = array('status' => "Failed", "msg" => "User with this email already exist");
                    $this->response($this->json($error), 200);
                }else{
                    $query = "INSERT INTO users (email, password, name, role) VALUES ( '$email', '$password', '$name', '$role')";
                    $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
                    $success = array('status' => "Success", "msg" => "User Created Successfully.");
                    $this->response($this->json($success),200);
                }
            }else{
                $error = array('status' => "Failed", "msg" => "Invalid Email address value");
                $this->response($this->json($error), 200);
            }
        }

        $error = array('status' => "Failed", "msg" => "Invalid sending data");
        $this->response($this->json($error), 200);
    }

    public function checktoken(){
        if($this->get_request_method() != "POST"){
            $this->response('',406);
        }
        $result = json_decode(file_get_contents("php://input"),true);

        if($result['token'] == md5($result['name'].$result['email'])){
            $success = array('status' => "Success", "msg" => "Token valid.");
            $this->response($this->json($success),200);
        }

        $error = array('status' => "Failed", "msg" => "Invalid token");
        $this->response($this->json($error), 200);
    }*/
}