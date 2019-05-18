<?php
include 'conn.php';
$page = isset($_GET['page']) ? $_GET['page'] : '';
$num = isset($_GET['num']) ? $_GET['num'] : '';
$type = isset($_GET['type']) ? $_GET['type'] : '';
$order = isset($_GET['order']) ? $_GET['order'] : '';
$value = isset($_GET['value']) ? $_GET['value'] : '';
$index = ($page - 1) * $num;

if ($type && $value) {
    //排序又查询
    $list = $conn->query("SELECT t1.id,t1.title,t1.imgsrc,t1.price,t1.size,t1.sell,t2.`name`,t3.`name`,t3.`imgsrc` typetitle,t3.`id` typeid  FROM list t1 , brand t2 ,type t3 WHERE t1.brand = t2.id AND t1.type = t3.id AND title LIKE '%$value%' ORDER BY $type $order LIMIT $index,$num");
    $listAll = $conn->query("SELECT t1.id,t1.title,t1.imgsrc,t1.price,t1.size,t1.sell,t2.`name`,t3.`name`,t3.`imgsrc` typetitle,t3.`id` typeid  FROM list t1 , brand t2 ,type t3 WHERE t1.brand = t2.id AND t1.type = t3.id AND title LIKE '%$value%' ORDER BY $type $order");
}  else if ($type) {
    //排序
    $list = $conn->query("SELECT t1.id,t1.title,t1.imgsrc,t1.price,t1.size,t1.sell,t2.`name`,t3.`name`,t3.`imgsrc` typetitle,t3.`id` typeid  FROM list t1 , brand t2 ,type t3 WHERE t1.brand = t2.id AND t1.type = t3.id  ORDER BY $type $order LIMIT $index,$num");
    $listAll = $conn->query("SELECT t1.id,t1.title,t1.imgsrc,t1.price,t1.size,t1.sell,t2.`name`,t3.`name`,t3.`imgsrc` typetitle,t3.`id` typeid  FROM list t1 , brand t2 ,type t3 WHERE t1.brand = t2.id AND t1.type = t3.id ");
} else if ($value) {
    //查询
    $list = $conn->query("SELECT t1.id,t1.title,t1.imgsrc,t1.price,t1.size,t1.sell,t2.`name`,t3.`name`,t3.`imgsrc` typetitle,t3.`id` typeid  FROM list t1 , brand t2 ,type t3 WHERE t1.brand = t2.id AND t1.type = t3.id AND title LIKE '%$value%' LIMIT $index,$num");
    $listAll = $conn->query("SELECT t1.id,t1.title,t1.imgsrc,t1.price,t1.size,t1.sell,t2.`name`,t3.`name`,t3.`imgsrc` typetitle,t3.`id` typeid  FROM list t1 , brand t2 ,type t3 WHERE t1.brand = t2.id AND t1.type = t3.id AND title LIKE '%$value%'");
} else {
    //都没有，默认
    $list = $conn->query("SELECT t1.id,t1.title,t1.imgsrc,t1.price,t1.size,t1.sell,t2.`name`,t3.`name`,t3.`imgsrc` typetitle,t3.`id` typeid  FROM list t1 , brand t2 ,type t3 WHERE t1.brand = t2.id AND t1.type = t3.id LIMIT $index,$num");
    $listAll = $conn->query("SELECT t1.id,t1.title,t1.imgsrc,t1.price,t1.size,t1.sell,t2.`name`,t3.`name`,t3.`imgsrc` typetitle,t3.`id` typeid  FROM list t1 , brand t2 ,type t3 WHERE t1.brand = t2.id AND t1.type = t3.id ");
}


$listRes = $list->fetch_all(MYSQLI_ASSOC);
//var_dump($listRes);
//echo json_encode($listRes,JSON_UNESCAPED_UNICODE);


$ret = array(
    'total' => $listAll->num_rows,
    'content' => $listRes
);
echo json_encode($ret, JSON_UNESCAPED_UNICODE);
