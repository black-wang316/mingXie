<?php
header('Access-Control-Allow-Origin:*');
header("Content-Type:text/html;charset=utf8");
include "conn.php";

class  Res
{
    public $status;
    public $msg;
}

$username = isset($_POST['username']) ? $_POST['username'] : '';
$password = isset($_POST['password']) ? $_POST['password'] : '';
$ret = new Res();
if ($username&&$password){
    $sql="INSERT INTO `user` (username,password)VALUES('$username','$password')";
    $res = $conn->query($sql);
    $ret->status=0;
    $ret->msg='注册成功';
    echo json_encode($ret,JSON_UNESCAPED_UNICODE);
}else{
    $sql = "select * from user where username='$username'";
    $res = $conn->query($sql);
    if ($res->num_rows) {
        $ret->status = 0;
        $ret->msg = '该账号已注册';
        echo json_encode($ret,JSON_UNESCAPED_UNICODE);
    } else {
        $ret->status=1;
        $ret->msg='可以使用';
        echo json_encode($ret,JSON_UNESCAPED_UNICODE);
    }
}

