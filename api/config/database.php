<?php
require( 'PDO.class.php' );

class Database {

    // get the database connection

    public function getConnection() {

        define( 'DBHost', '127.0.0.1' );
        define( 'DBPort', 3306 );
        define( 'DBName', 'library' );
        define( 'DBUser', 'dev' );
        define( 'DBPassword', '' );

        $DB = new Db( DBHost, DBPort, DBName, DBUser, DBPassword );

        return $DB;
    }
}
?>