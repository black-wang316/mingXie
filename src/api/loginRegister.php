<?php
/*用户登录验证
 * type：post
 * data：username，password,type->login（登录验证）||regeist（注册验证）：当注册验证只传username时为验证username是否与数据库重复
 * echo：ret{status:状态码 0：失败 1：成功
 *           msg：提示信息}*/
include 'conn.php';

class  Res
{
    public $status;
    public $msg;
}

$username = isset($_POST['username']) ? $_POST['username'] : '';
$password = isset($_POST['password']) ? $_POST['password'] : '';
$type = isset($_POST['type'])?$_POST['type']:'';
$ret = new Res();
if ($type=='login'){
    if ($username && $password) {
        $sql="SELECT * FROM `user` WHERE username='$username' AND password='$password'";
        $res = $conn->query($sql);
        if ($res->num_rows){
            $ret->status=1;
            $ret->msg='登录成功';
            echo json_encode($ret,JSON_UNESCAPED_UNICODE);
        }else{
            $ret->status=0;
            $ret->msg='用户名or密码出现错误';
            echo json_encode($ret,JSON_UNESCAPED_UNICODE);
        }
    }
}else if ($type=='register'){
    if ($username&&$password){
        $sql="INSERT INTO `user` (username,password)VALUES('$username','$password')";
        $res = $conn->query($sql);
        $ret->status=1;
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
}
