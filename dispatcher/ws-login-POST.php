<?php
require_once("koneksidb.php");
require("fungsi.php");

// Jika input type tidak ada, diberi nilai NULL
$username_string = isset($_POST['login']) ? mysqli_real_escape_string($con,$_POST['login']) : NULL;
$password_string = isset($_POST['passwd']) ? mysqli_real_escape_string($con,$_POST['passwd']) : NULL;

//$username_string = "tes";
//$password_string = "tes";

$sqlakun = "SELECT id FROM akun WHERE login='" . $username_string ."' and password=MD5('".$password_string."')";
$akun = fetchsql($sqlakun);

/* JSON */
if($akun)
{
    $arr = array("berhasil" => "Mohon tunggu sebentar","userid" => $akun[0]['id']);

}
else
{
    $arr = array("gagal" => "Mohon ulang");
}

//echo  xmlrpc_encode($arr);
echo json_encode($arr);
/* JSON */
?>
