<?php
header( 'Cache-Control: no-cache, must-revalidate' );
// HTTP/1.1
header( 'Expires: Sat, 1 Jul 2000 05:00:00 GMT' );
// Fecha en el pasado

class User {

    // database connection and table name
    private $conn;
    private $table_name = 'users';

    // object properties
    public $id;
    public $name;
    public $last_name;
    public $doc;

    // constructor with $db as database connection

    public function __construct( $db ) {
        $this->conn = $db;
    }

    public function readAll() {
        return  $this->conn->query( "SELECT * FROM users WHERE 1" );
    }

    public function create() {
        $AffectedRows = $this->conn->query( 'INSERT INTO `users`(`id`, `name`, `last_name`, `doc`)  VALUES(:id,:name,:last_name,:doc)',
        array( 'name'=>$this->name, 'last_name'=>$this->last_name, 'id'=>null, 'doc'=>$this->doc));
        if ( $AffectedRows>0 ) {
            return true;
        } else {
            return false;
        }
    }

    public function update() {
        $AffectedRows = $this->conn->query( 'UPDATE `users` SET name = :name , last_name = :last_name , doc =:doc WHERE id = :id',
        array( 'name'=>$this->name, 'last_name'=>$this->last_name, 'id'=>$this->id, 'doc'=>$this->doc) );
        if ( $AffectedRows>0 ) {
            return true;
        } else {
            return false;
        }
    }

    public function readOne() {
        return  $this->conn->query( 'SELECT * FROM `users` WHERE id = ?', array( $this->id ) );
    }

    public function delete() {
        return  $this->conn->query( 'DELETE FROM `users` WHERE id = ?', array( $this->id ) );
    }

}
?>