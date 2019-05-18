<?php
include 'conn.php';
$sid = isset($_POST['sid']) ? $_POST['sid'] : '';
$uname = isset($_POST['uname']) ? $_POST['uname'] : '';
$content = isset($_POST['content']) ? $_POST['content'] : '';
$star = isset($_POST['star']) ? $_POST['star'] : '';
$zan = isset($_POST['zan'])?$_POST['zan']:'';
$id=isset($_POST['id'])?$_POST['id']:'';
if ($sid&&$uname&&$content&&$star){
    $sql = "INSERT INTO pinglun (uname,sid,content,star) VALUES('$uname','$sid','$content','$star')";
    $res = $conn->query($sql);
//    echo $sql;
    if ($res) {
        echo '评论成功';
    }else{
        echo '评论失败';
    }
}else if ($sid&&$uname){
    $sql="SELECT * FROM pinglun WHERE sid='$sid'ORDER BY dateline desc";
    $res = $conn->query($sql);
    $ret = $res->fetch_all(MYSQLI_ASSOC);
    echo json_encode($ret,JSON_UNESCAPED_UNICODE);
}else if($zan&&$id){
    $sql="UPDATE pinglun SET zan='$zan' WHERE id='$id'";
    $res=$conn->query($sql);
    if ($res){
        echo '我顶';
    }else{
        echo '没用';
    }
}


