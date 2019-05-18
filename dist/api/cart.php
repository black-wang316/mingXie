<?php
include 'conn.php';

class  Res
{
    public $totalNum;
    public $msg;
}

$sid = isset($_POST['sid']) ? $_POST['sid'] : '';
$size = isset($_POST['size']) ? $_POST['size'] : '';
$color = isset($_POST['color']) ? $_POST['color'] : '';
$num = isset($_POST['num']) ? $_POST['num'] : '';
$uname = isset($_POST['uname'])?$_POST['uname']:'';
$uname2 = isset($_POST['uname2'])?$_POST['uname2']:'';
$type=isset($_POST['type'])?$_POST['type']:'';
$id = isset($_POST['id'])?$_POST['id']:'';
$price = isset($_POST['price'])?$_POST['price']:'';
$numInp = isset($_POST['numInp'])?$_POST['numInp']:'';
$ret = new Res();
if ($sid && $size && $color && $num) {
    $ifNull = $conn->query("SELECT num FROM cart WHERE sid = '$sid' AND color='$color' AND size='$size' AND uname='$uname'");
    $priceSql = $conn->query("SELECT price FROM list WHERE id = '$sid' ");
    $priceArr = $priceSql->fetch_all(MYSQLI_ASSOC);
    $price = (int)$priceArr[0]['price'];
    if ($ifNull->num_rows) {
        //不为空修改
        $numArr = $ifNull->fetch_all(MYSQLI_ASSOC);
        $numCart = (int)$numArr[0]['num'];
        $numRes = $num + $numCart;
        $total = $price * $numRes;
        $sql = "UPDATE cart SET num='$numRes',total='$total' WHERE sid='$sid' AND color='$color' AND size='$size' AND uname='$uname'";
        $insert = $conn->query($sql);
    } else {
        //为空添加
        $total = $price * $num;
        $sql = "INSERT INTO cart(sid,size,color,num,total,uname)VALUES('$sid','$size','$color','$num','$total','$uname')";
        $insert = $conn->query($sql);
    }
    if ($insert) {
        $totalNumSql = $conn->query("SELECT num FROM cart WHERE uname='$uname'");
        $sum = 0;
        $totalNumArr = $totalNumSql->fetch_all(MYSQLI_ASSOC);
        for ($i = 0; $i < count($totalNumArr); $i++) {
            $sum += $totalNumArr[$i]['num'];
        }
        $ret->totalNum = $sum;
        $ret->msg = '成功添加购物车';
//    echo '成功添加购物车';
        echo json_encode($ret, JSON_UNESCAPED_UNICODE);
    }
} else if ($uname){
    $totalNumSql = $conn->query("SELECT num FROM cart WHERE uname='$uname'");
    $sum = 0;
    $totalNumArr = $totalNumSql->fetch_all(MYSQLI_ASSOC);
    for ($i = 0; $i < count($totalNumArr); $i++) {
        $sum += $totalNumArr[$i]['num'];
    }
    echo $sum;
}else if($uname2){
    $sqlAll=$conn->query("SELECT cart.id,cart.color,cart.size,cart.num,cart.total,list.title,list.price FROM cart ,list WHERE cart.sid = list.id AND cart.uname = '$uname2'");
    $res=$sqlAll->fetch_all(MYSQLI_ASSOC);
    echo json_encode($res,JSON_UNESCAPED_UNICODE);
}else if ($id&&$type){
    $numSql = $conn->query("SELECT num FROM cart WHERE id = '$id'");
    $numArr = $numSql->fetch_all(MYSQLI_ASSOC);
    $num = (int)$numArr[0]['num'];
    if ($type=='up'){
        $num++;
        $totalPrice = $price * $num;
        $sql3 = "UPDATE cart SET num='$num',total='$totalPrice' WHERE id='$id'";
        $insert = $conn->query($sql3);
    }else if($type=='down'){
        $num--;
        if ($num<=1){
            $num=1;
        }
        $totalPrice = $price * $num;
        $sql3 = "UPDATE cart SET num='$num',total='$totalPrice' WHERE id='$id'";
        $insert = $conn->query($sql3);
    }else if ($type=='del'){
        $del = $conn->query(" DELETE FROM cart WHERE id='$id'");
    }else if($type=='blur'){
        $totalPrice = $price * $numInp;
        $sql3 = "UPDATE cart SET num='$numInp',total='$totalPrice' WHERE id='$id'";
        $insert = $conn->query($sql3);
    }
}
