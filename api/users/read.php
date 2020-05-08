<?php
// required headers
header( 'Access-Control-Allow-Origin: *' );
header( 'Content-Type: application/json; charset=UTF-8' );
// include database and object files
include_once '../config/database.php';
include_once '../objects/user.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$user = new User( $db );
$stmt = $user->readAll();
http_response_code( 200 );
// show products data in json format
echo json_encode( $stmt );