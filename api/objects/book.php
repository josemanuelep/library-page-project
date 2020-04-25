<?php
header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
header("Expires: Sat, 1 Jul 2000 05:00:00 GMT"); // Fecha en el pasado
class Book {

    // database connection and table name
    private $conn;
    private $table_name = 'book';

    // object properties
    public $id;
    public $name;
    public $type;
    public $isbn;

    // constructor with $db as database connection

    public function __construct( $db ) {
        $this->conn = $db;
    }

    public function readAll() {
        return  $this->conn->query( 'SELECT * FROM book' );
    }

    public function create() {
        $AffectedRows = $this->conn->query( 'INSERT INTO `book` (`id`, `name`, `type`, `type`) VALUES(:id,:name,:type,:isbn)',
        array( 'name'=>$this->name, 'type'=>$this->type, 'isbn'=>$this->isbn, 'id'=>null ) );
        if ( $AffectedRows>0 ) {
            return true;
        } else {
            return false;
        }
    }

    public function update() {
        $AffectedRows = $this->conn->query( 'UPDATE book SET name = :name,type=:type,isbn=:isbn  WHERE id = :id',
        array( 'name'=>$this->name, 'type'=>$this->type, 'isbn'=>$this->isbn, 'id'=>$this->id ) );
        if ( $AffectedRows>0 ) {
            return true;
        } else {
            return false;
        }
    }

    public function readOne() {
        return  $this->conn->query( 'SELECT book.name AS book_name,book.borrowed AS isBorrwed,book.type AS book_type,book.isbn, users.name AS name_user, lends.init_date FROM book INNER JOIN lends ON book.id = lends.id_book INNER JOIN users ON users.id = lends.id_user WHERE book.id = ?', array( $this->id ) );
    }
    public function delete() {
        return  $this->conn->query( 'DELETE FROM book WHERE id = ?', array( $this->id ) );
    }

}
?>