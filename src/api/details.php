<?php
include 'conn.php';
$id = isset($_POST['id'])?$_POST['id']:'1';
$sql="SELECT t1.id,t1.title,t1.price,t1.imgsrc,t1.sell,t1.stock,t1.size,t2.`name` brand, t3.`name` type FROM list t1 , brand t2,type t3 WHERE t1.id=$id AND t1.brand=t2.id AND t1.type=t3.id";
$res = $conn->query($sql);
$ret = $res->fetch_all(MYSQLI_ASSOC);
echo json_encode($ret,JSON_UNESCAPED_UNICODE);