<?php
header('Access-Control-Allow-Origin:*');
header("Content-Type:text/html;charset=utf8");
//链接数据库
$host = 'localhost';
$name = 'root';
$psw = '';
$dbname = 'mingxieku';

//创建链接
$conn = new mysqli($host, $name, $psw, $dbname);
//mysqli_set_charset($conn,'utf-8');
//检测链接
if ($conn->connect_error) {
    die('链接失败' . $conn->connect_error);
}
