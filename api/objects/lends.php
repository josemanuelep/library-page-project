<?php
header( 'Cache-Control: no-cache, must-revalidate' );
// HTTP/1.1
header( 'Expires: Sat, 1 Jul 2000 05:00:00 GMT' );
// Fecha en el pasado

class Lend {

    // database connection and table name
    private $conn;
    private $table_name = 'book';

    // object properties
    public $id;
    public $id_user;
    public $id_book;
    public $init_date;
    public $end_date;

    // constructor with $db as database connection

    public function __construct( $db ) {
        $this->conn = $db;
    }

    public function readAll() {
        return  $this->conn->query( 'SELECT book.name as book_name, book.type AS book_type, users.name AS user_name, users.last_name, lends.init_date, lends.end_date FROM `lends` INNER JOIN book ON lends.id_book = book.id INNER JOIN users ON users.id = lends.id_user' );
    }

    public function create() {
        $AffectedRows = $this->conn->query( 'INSERT INTO `lends` (`id`, `id_user`, `id_book`, `init_date`, `end_date`)  VALUES(:id,:id_user,:id_book,:init_date,:end_date)',
        array( 'id_user'=>$this->id_user, 'id_book'=>$this->id_book, 'id'=>null, 'init_date'=>$this->init_date,'end_date'=>$this->end_date));
        if ( $AffectedRows>0 ) {
            return true;
        } else {
            return false;
        }
    }

    public function update() {
        $AffectedRows = $this->conn->query( 'UPDATE `lends` SET id_user = :id_user,id_book=:id_book,init_date=:init_date,end_date=:end_date  WHERE id = :id',
        array( 'id_user'=>$this->id_user, 'id_book'=>$this->isbn, 'id'=>null, 'init_date'=>$this->init_date,'end_date'=>$this->end_date) );
        if ( $AffectedRows>0 ) {
            return true;
        } else {
            return false;
        }
    }

    public function readOne() {
        return  $this->conn->query( 'SELECT book.name as book_name, book.type AS book_type, users.name AS user_name, users.last_name, lends.init_date, lends.end_date FROM `lends` INNER JOIN book ON lends.id_book = book.id INNER JOIN users ON users.id = lends.id_user WHERE lends.id= 7', array( 3 ) );
    }

    public function delete() {
        return  $this->conn->query( 'DELETE FROM lends WHERE id = ?', array( $this->id ) );
    }

}
?>