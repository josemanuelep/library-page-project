<?php

$mTime     = explode(' ', microtime());
$startTime = $mTime[1] + $mTime[0];

define('DBHost', '127.0.0.1');
define('DBPort', 3306);
define('DBName', 'library');
define('DBUser', 'dev');
define('DBPassword', '');
require( __DIR__ . "/src_pdo/PDO.class.php");
$DB = new Db(DBHost, DBPort, DBName, DBUser, DBPassword);

$AffectedRows = $DB->query("INSERT INTO `book` (`id`, `name`, `type`, `isbn`) VALUES(:id,:name,:type,:isbn)",
 array("name"=>"	The Hunger Games (The Hunger Games, #1)","type"=>"Historia","isbn"=>1314545415,"id"=>null));

var_dump($AffectedRows);
