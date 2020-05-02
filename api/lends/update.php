<?php

// required headers
header( 'Access-Control-Allow-Origin: *' );
header( 'Content-Type: application/json; charset=UTF-8' );
header( 'Access-Control-Allow-Methods: POST' );
header( 'Access-Control-Max-Age: 3600' );
header( 'Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With' );
// include database and object files
include_once '../config/database.php';
include_once '../objects/lends.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// get posted data
$data = json_decode( file_get_contents( 'php://input' ) );

// initialize object
$lend = new lend( $db );
$lend->id = $data->id;
$lend->name = $id_user->id_user;
$lend->type = $id_book->id_book;
$lend->isbn = $init_date->init_date;
$lend->isbn = $end_date->end_date;

// update the product
if ( $lend->update() ) {

    // set response code - 201 created
    http_response_code( 201 );

    // tell the user
    echo json_encode( array( 'message' => 'lend was updated.' ) );
}

// if unable to create the product, tell the user
else {

    // set response code - 503 service unavailable
    http_response_code( 503 );

    // tell the user
    echo json_encode( array( 'message' => 'Unable to update lend.' ) );
}
