<?php
// required headers
header( 'Access-Control-Allow-Origin: *' );
header( 'Access-Control-Allow-Headers: access' );
header( 'Access-Control-Allow-Methods: GET' );
header( 'Access-Control-Allow-Credentials: true' );
header( 'Content-Type: application/json' );
// include database and object files
include_once '../config/database.php';
include_once '../objects/user.php';


// get database connection
$database = new User();
$db = $database->getConnection();

// prepare user object
$user = new user( $db );

// set ID property of record to read
$user->id = isset( $_GET['id'] ) ? $_GET['id'] : die();
$response = $user->readOne();

if ( $response != null ) {

    // set response code - 200 OK
    http_response_code( 200 );

    // make it json format
    echo json_encode( $response[0] );
} else {
    // set response code - 404 Not found
    http_response_code( 404 );

    // tell the user product does not exist
    echo json_encode( array( 'message' => 'user does not exist.' ) );
}
?>