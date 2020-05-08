<?php

// required headers
header( 'Access-Control-Allow-Origin: *' );
header( 'Content-Type: application/json; charset=UTF-8' );
header( 'Access-Control-Allow-Methods: POST' );
header( 'Access-Control-Max-Age: 3600' );
header( 'Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With' );
// include database and object files
include_once '../config/database.php';
include_once '../objects/user.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// get posted data
$data = json_decode( file_get_contents( 'php://input' ) );

// initialize object
$user = new User( $db );
$user->id = $data->id;
$user->name = $data->name;
$user->last_name = $data->last_name;
$user->doc = $data->doc;

// update the product
if ( $user->update() ) {

    // set response code - 201 created
    http_response_code( 201 );

    // tell the user
    echo json_encode( array( 'message' => 'user was updated.' ) );
}

// if unable to create the product, tell the user
else {

    // set response code - 503 service unavailable
    http_response_code( 503 );

    // tell the user
    echo json_encode( array( 'message' => 'Unable to update user.' ) );
}
