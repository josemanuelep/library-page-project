<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
// include database and object files
include_once '../config/database.php';
include_once '../objects/lends.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// get posted data
$data = json_decode(file_get_contents("php://input"));

// initialize object
$lend = new lend( $db );
$lend->id_user = $data->id_user;
$lend->id_book = $data->id_book;
$lend->init_date = $data->init_date;
$lend->end_date = $data->end_date;
  // create the product
  if($lend->create()){
  
    // set response code - 201 created
    http_response_code(201);

    // tell the user
    echo json_encode(array("message" => "Lend was created."));
}

// if unable to create the product, tell the user
else{

    // set response code - 503 service unavailable
    http_response_code(503);

    // tell the user
    echo json_encode(array("message" => "Lend to create Book."));
}
