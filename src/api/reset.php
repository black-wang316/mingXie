<?php
include 'conn.php';
$password = isset($_POST['password'])?$_POST['password']:'admin';
$username = isset($_POST['username'])?$_POST['username']:'123456';
$res = $conn->query("UPDATE user SET `password` = '$password' WHERE username = '$username' ");
if ($res){
    echo 1;
}
