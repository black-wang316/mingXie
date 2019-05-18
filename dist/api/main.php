<?php
include 'conn.php';
$sql = $conn->query("SELECT t1.id,t1.title,t1.imgsrc,t1.price,t2.`name`,t3.`name`,t3.`imgsrc` typetitle,t3.`id` typeid  FROM list t1 , brand t2 ,type t3 WHERE t1.brand = t2.id AND t1.type = t3.id GROUP BY t1.id ");
$res =$sql->fetch_all(MYSQLI_ASSOC);
echo json_encode($res,JSON_UNESCAPED_UNICODE);