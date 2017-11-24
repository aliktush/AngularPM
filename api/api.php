<?php
/** for protection */
define('HIGHT', true);

require_once($_SERVER['DOCUMENT_ROOT']."/api/Rest.inc.php");
require_once($_SERVER['DOCUMENT_ROOT']."/api/Loader.inc.php");    

    
class API extends REST {

    public function __construct(){
        parent::__construct();				// Init parent contructor
    }

    /**
     * Dynmically call the method based on the query string
     */
    public function processApi(){

        $request = explode("/", strtolower(trim($_REQUEST['r'])));

        //$this->response($this->json(array('data'=>$request)),200);
        //$this->response(file_get_contents("php://input"),200);
        //$this->response($_REQUEST['r'],200);

        if(count($request)>1){
            $model = ucfirst($request[0]);
            $function = $request[1];

            if(!class_exists($model)){
                $this->response($this->json(array("Error"=>"Model not found","Data"=>null)),404);
            }else{
                if(!method_exists($model,$function)){
                    $this->response($this->json(array("Error"=>"Function not found","Data"=>null)),404);
                }else{
                    $object = new $model(json_decode(file_get_contents("php://input"),true));
                    $params = null;
                    if(count($request) == 3){
                        $params = $request[2];
                    }
                    $result = $object->$function($params);

                    $this->response($this->json($result),200);
                }
            } 
        }
        $this->response($this->json(array("Error"=>"Bad request","Data"=>null)),500);                                



    }

    /**
     *	Encode array into JSON
    */
    private function json($data){
        if(is_array($data)){
            return json_encode($data);
        }
    }





    /**
    * Customer blok:
    */
    //get all
    private function customers(){	
        if($this->get_request_method() != "GET"){
            $this->response('',406);
        }
        $query="SELECT distinct c.customerNumber, c.customerName, c.email, c.address, c.city, c.state, c.postalCode, c.country FROM customers c ";
        $r = $this->mysqli->query($query) or die($this->mysqli->error.' - row: '.__LINE__);

        if($r->num_rows > 0){
            $result = array();
            while($row = $r->fetch_assoc()){
                $result[] = $row;
            }
            $this->response($this->json($result), 200); // send user details
        }
        $this->response('',204);	// If no records "No Content" status
    }

    //get one
    private function customer(){	
        if($this->get_request_method() != "GET"){
            $this->response('',406);
        }
        $id = (int)$this->_request['id'];
        if($id > 0){	
            $query="SELECT distinct c.customerNumber, c.customerName, c.email, c.address, c.city, c.state, c.postalCode, c.country FROM customers c where c.customerNumber=$id";
            $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
            if($r->num_rows > 0) {
                $result = $r->fetch_assoc();	
                $this->response($this->json($result), 200); // send user details
            }
        }
        $this->response('',204);	// If no records "No Content" status
    }

    //set new
    private function insertCustomer(){
        if($this->get_request_method() != "POST"){
            $this->response('',406);
        }

        $customer = json_decode(file_get_contents("php://input"),true);
        $column_names = array('customerName', 'email', 'city', 'address', 'country');
        $keys = array_keys($customer);
        $columns = '';
        $values = '';
        foreach($column_names as $desired_key){ // Check the customer received. If blank insert blank into the array.
           if(!in_array($desired_key, $keys)) {
                $$desired_key = '';
            }else{
                $$desired_key = $customer[$desired_key];
            }
            $columns = $columns.$desired_key.',';
            $values = $values."'".$$desired_key."',";
        }
        $query = "INSERT INTO customers(".trim($columns,',').") VALUES(".trim($values,',').")";
        if(!empty($customer)){
            $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
            $success = array('status' => "Success", "msg" => "Customer Created Successfully.", "data" => $customer);
            $this->response($this->json($success),200);
        }else
            $this->response('',204);	//"No Content" status
    }

    //update
    private function updateCustomer(){
        if($this->get_request_method() != "POST"){
            $this->response('',406);
        }
        $customer = json_decode(file_get_contents("php://input"),true);
        $id = (int)$customer['id'];
        $column_names = array('customerName', 'email', 'city', 'address', 'country');
        $keys = array_keys($customer['customer']);
        $columns = '';
        $values = '';
        foreach($column_names as $desired_key){ // Check the customer received. If key does not exist, insert blank into the array.
           if(!in_array($desired_key, $keys)) {
                $$desired_key = '';
            }else{
                $$desired_key = $customer['customer'][$desired_key];
            }
            $columns = $columns.$desired_key."='".$$desired_key."',";
        }
        $query = "UPDATE customers SET ".trim($columns,',')." WHERE customerNumber=$id";
        if(!empty($customer)){
            $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
            $success = array('status' => "Success", "msg" => "Customer ".$id." Updated Successfully.", "data" => $customer);
            $this->response($this->json($success),200);
        }else
            $this->response('',204);	// "No Content" status
    }

    //delete
    private function deleteCustomer(){
        if($this->get_request_method() != "DELETE"){
            $this->response('',406);
        }
        $id = (int)$this->_request['id'];
        if($id > 0){				
            $query="DELETE FROM customers WHERE customerNumber = $id";
            $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
            $success = array('status' => "Success", "msg" => "Successfully deleted one record.");
            $this->response($this->json($success),200);
        }else
            $this->response('',204);	// If no records "No Content" status
    }
    //END customer blok


}

// Initiiate Library

$api = new API;
$api->processApi();
?>