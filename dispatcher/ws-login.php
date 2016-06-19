<?php
require("fungsi.php");

// Jika input type tidak ada, diberi nilai NULL
$username_string = isset($_POST['login']) ? mysql_real_escape_string($_POST['login']) : NULL;
$password_string = isset($_POST['passwd']) ? mysql_real_escape_string($_POST['passwd']) : NULL;

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

echo json_encode($arr);
/* JSON */
?>
