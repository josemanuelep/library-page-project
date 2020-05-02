<?php
// required headers
header( 'Access-Control-Allow-Origin: *' );
header( 'Content-Type: application/json; charset=UTF-8' );
// include database and object files
include_once '../config/database.php';
include_once '../objects/lends.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$lend = new lend( $db );
$stmt = $lend->readAll();
http_response_code(200);
// show products data in json format
echo json_encode($stmt);